import {
  createSellerRequest,
  findPendingSellerRequest,
  findSellerRequestsByUserId,
  findSellerRequestById,
  deleteSellerRequest,
  findAllSellerRequests,
  updateUserSellerStatus,
  updateSellerRequest
} from "../repository/seller_request.repository";

export async function requestToBecomeSeller(userId: number) {
  const existingRequest = await findPendingSellerRequest(userId);

  if (existingRequest) {
    throw new Error("You already have a pending seller request.");
  }

  return createSellerRequest(userId);
}

export async function getMySellerRequests(userId: number) {
  return await findSellerRequestsByUserId(userId);
}

export async function cancelMySellerRequest(
  requestId: number,
  userId: number
) {
  const request = await findSellerRequestById(requestId);

  if (!request) {
    throw new Error("Seller request not found.");
  }

  // Make sure users can only cancel their own requests
  if (request.user_id !== userId) {
    throw new Error("You are not authorized to cancel this request.");
  }

  // Only pending requests can be cancelled
  if (request.status !== "PENDING") {
    throw new Error("Only pending seller requests can be cancelled.");
  }

  await deleteSellerRequest(requestId);
}

export async function getAllSellerRequests() {
  return await findAllSellerRequests();
}

export async function approveSellerRequest(
  requestId: number,
  adminId: number
) {
  const request = await findSellerRequestById(requestId);

  if (!request) {
    throw new Error("Seller request not found.");
  }

  if (request.status !== "PENDING") {
    throw new Error("Only pending requests can be approved.");
  }

  const updatedRequest = await updateSellerRequest(requestId, {
    status: "APPROVED",
    reviewed_by: adminId,
    reviewed_at: new Date(),
  });

  await updateUserSellerStatus(request.user_id, true);

  return updatedRequest;
}

export async function rejectSellerRequest(
  requestId: number,
  adminId: number
) {
  const request = await findSellerRequestById(requestId);

  if (!request) {
    throw new Error("Seller request not found.");
  }

  if (request.status !== "PENDING") {
    throw new Error("Only pending requests can be rejected.");
  }

  return await updateSellerRequest(requestId, {
    status: "REJECTED",
    reviewed_by: adminId,
    reviewed_at: new Date(),
  });
}