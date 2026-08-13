import User from "../models/User.model";

export async function findUserByEmail(email: string) {
  return User.findOne({
    where: {
      email,
    },
  });
}

export async function findAdmin() {
  return User.findOne({
    where: {
      role: "ADMIN",
    },
  });
}

export async function findUserByUsername(username: string) {
  return User.findOne({
    where: {
      username,
    },
  });
}

export async function createUser(data: {
  username: string;
  email: string;
  password_hash: string;
  role?: "USER" | "ADMIN";
  is_seller?: boolean;
  status?: "ACTIVE" | "SUSPENDED";
}) {
  return User.create({
    username: data.username,
    email: data.email,
    password_hash: data.password_hash,
    role: data.role ?? "USER",
    is_seller: data.is_seller ?? false,
    status: data.status ?? "ACTIVE",
  });
}