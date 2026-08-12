import bcrypt from "bcrypt";
import {
  createUser,
  findAdmin,
  findUserByEmail,
} from "../repository/user.repository";

interface CreateAdminInput {
  username: string;
  email: string;
  password: string;
}

export async function createAdmin(input: CreateAdminInput) {
  const existingAdmin = await findAdmin();

  if (existingAdmin) {
    throw new Error("An admin user already exists.");
  }

  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new Error("A user with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const admin = await createUser({
    username: input.username,
    email: input.email,
    password_hash: passwordHash,
    role: "ADMIN",
    status: "ACTIVE",
  });

  return admin;
}