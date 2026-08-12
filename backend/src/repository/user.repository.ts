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
  role: "BUYER" | "SELLER" | "ADMIN";
  status?: "ACTIVE" | "SUSPENDED";
}) {
  return User.create({
    username: data.username,
    email: data.email,
    password_hash: data.password_hash,
    role: data.role,
    status: data.status ?? "ACTIVE",
  });
}