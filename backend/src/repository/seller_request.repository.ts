import SellerRequest from "../models/SellerRequest.model";

export async function createSellerRequest(userId: number) {
  return SellerRequest.create({
    user_id: userId,
    status: "PENDING",
  });
}

export async function findPendingSellerRequest(userId: number) {
  return SellerRequest.findOne({
    where: {
      user_id: userId,
      status: "PENDING",
    },
  });
}

export async function findSellerRequestById(id: number) {
  return SellerRequest.findByPk(id);
}

export async function findAllSellerRequests() {
  return SellerRequest.findAll({
    order: [["created_at", "DESC"]],
  });
}

export async function findPendingSellerRequests() {
  return SellerRequest.findAll({
    where: {
      status: "PENDING",
    },
    order: [["created_at", "ASC"]],
  });
}