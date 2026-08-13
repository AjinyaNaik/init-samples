import {
  createSellerRequest,
  findPendingSellerRequest,
} from "../repository/seller_Request.repository";

export async function requestToBecomeSeller(userId: number) {
  const existingRequest = await findPendingSellerRequest(userId);

  if (existingRequest) {
    throw new Error("You already have a pending seller request.");
  }

  return createSellerRequest(userId);
}