"use server";

import { endpoints } from "@/utils/endpoints";
import { getData, postData } from "@/utils/crud-fetch-api";

import { CancelReason } from "@/types/order";

export const fetchCancelReasons = async (): Promise<
  { data: CancelReason[] } | { error: string }
> => {
  const reasons = await getData<CancelReason[]>(
    endpoints.getReasons("CANCEL_ORDER")
  );

  return reasons;
};

export const cancelShipment = async ({
  shipmentId,
  reasonId,
}: {
  shipmentId: string;
  reasonId: string;
}): Promise<{ data: string } | { error: string }> => {
  const res = await postData<string, { reason_id: string }>(
    endpoints.cancelShipment(shipmentId),
    { reason_id: reasonId }
  );

  return res;
};

interface Feedback {
  shipment_id: string;
  driver_id: string;
  delivery_time: number;
  packaging: number;
  communication: number;
}
export const addShipmentFeedback = async (
  body: Feedback
): Promise<{ data: string } | { error: string }> => {
  const res = await postData<string, Feedback>(
    endpoints.addShipmentFeedback,
    body
  );

  return res;
};
