import { setAuthAppMetadataStep } from "@medusajs/core-flows";
import {
  createWorkflow,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/workflows-sdk";
import { createUserStep } from "../../user/steps";

export type CreateRestaurantAdminInput = {
  restaurant_id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type CreateDriverInput = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  avatar_url?: string;
};

type WorkflowInput = {
  user: (CreateRestaurantAdminInput | CreateDriverInput) & {
    actor_type: "restaurant" | "driver";
  };
  auth_identity_id: string;
};

export const createUserWorkflow = createWorkflow(
  "create-user-workflow",
  function (input: WorkflowData<WorkflowInput>) {
    let user = createUserStep(input.user);

    const authUserInput = transform({ input, user }, ({ input, user }) => {
      const data = {
        authIdentityId: input.auth_identity_id,
        actorType: input.user.actor_type,
        key:
          input.user.actor_type === "restaurant"
            ? "restaurant_id"
            : "driver_id",
        value: user.id,
      };

      return data;
    });

    setAuthAppMetadataStep(authUserInput);

    return new WorkflowResponse(user);
  }
);
