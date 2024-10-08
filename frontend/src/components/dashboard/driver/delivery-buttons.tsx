"use client";

import { passDelivery, proceedDelivery } from "@frontend/lib/actions";
import { DeliveryDTO, DeliveryStatus, DriverDTO } from "@frontend/lib/types";
import { Button } from "@medusajs/ui";
import { useState } from "react";

export default function DriverDeliveryButtons({
  delivery,
  driver,
}: {
  delivery: DeliveryDTO;
  driver: DriverDTO;
}) {
  const [proceedIsLoading, setProceedIsLoading] = useState(false);
  const [declineIsLoading, setDeclineIsLoading] = useState(false);

  const handleProceedDelivery = async () => {
    setProceedIsLoading(true);
    await proceedDelivery(delivery, driver.id);
  };

  const handleDeclineDelivery = async () => {
    setDeclineIsLoading(true);
    await passDelivery(delivery.id, driver.id);
  };

  return (
    <>
      {delivery.delivery_status === DeliveryStatus.RESTAURANT_ACCEPTED && (
        <Button
          variant="transparent"
          onClick={handleDeclineDelivery}
          isLoading={declineIsLoading}
        >
          Pass
        </Button>
      )}
      {[
        DeliveryStatus.RESTAURANT_ACCEPTED,
        DeliveryStatus.READY_FOR_PICKUP,
        DeliveryStatus.IN_TRANSIT,
      ].includes(delivery.delivery_status) && (
        <Button
          variant="primary"
          onClick={handleProceedDelivery}
          isLoading={proceedIsLoading}
        >
          {delivery.delivery_status === DeliveryStatus.RESTAURANT_ACCEPTED &&
            "Claim delivery"}
          {delivery.delivery_status === DeliveryStatus.READY_FOR_PICKUP &&
            "Set order picked up"}
          {delivery.delivery_status === DeliveryStatus.IN_TRANSIT &&
            "Set order delivered"}
        </Button>
      )}
    </>
  );
}
