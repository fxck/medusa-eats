import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import { UpdateDeliveryDTO } from "src/types/delivery/mutations";

type UpdateDeliveryStepInput = {
  data: UpdateDeliveryDTO;
};

export const updateDeliveryStepId = "update-delivery-step";
export const updateDeliveryStep = createStep(
  updateDeliveryStepId,
  async function (input: UpdateDeliveryStepInput, { container }) {
    const deliveryService = container.resolve("deliveryModuleService");

    const delivery = await deliveryService
      .updateDeliveries([input.data])
      .then((res) => res[0]);

    return new StepResponse(delivery, delivery.id);
  }
);
