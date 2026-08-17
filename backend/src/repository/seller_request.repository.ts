import SellerRequest from "../models/seller-request.model";
import User from "../models/user.model";

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

export async function findSellerRequestsByUserId(userId: number) {
  return await SellerRequest.findAll({
    where: {
      user_id: userId,
    },
    order: [["created_at", "DESC"]],
  });
}

export async function findSellerRequestById(id: number) {
  return SellerRequest.findByPk(id);
}

export async function findAllSellerRequests() {
  return await SellerRequest.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "email"],
      },
      {
        model: User,
        as: "reviewer",
        attributes: ["id", "username", "email"],
        required: false,
      },
    ],
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

export async function updateSellerRequest(
  id: number,
  data: {
    status: "APPROVED" | "REJECTED";
    reviewed_by: number;
    reviewed_at: Date;
  }
) {
  const [updatedCount] = await SellerRequest.update(data, {
    where: {
      id,
    },
  });

  if (updatedCount === 0) {
    return null;
  }

  return await SellerRequest.findByPk(id);
}

export async function updateUserSellerStatus(
  userId: number,
  isSeller: boolean
) {
  return await User.update(
    {
      is_seller: isSeller,
    },
    {
      where: {
        id: userId,
      },
    }
  );
}

export async function deleteSellerRequest(id: number) {
  return await SellerRequest.destroy({
    where: {
      id,
    },
  });
}