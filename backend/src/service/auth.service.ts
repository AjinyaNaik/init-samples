import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../repository/user.repository";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput) {
  const { username, email, password } = input;

  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new Error("Email is already registered.");
  }

  const existingUsername = await findUserByUsername(username);

  if (existingUsername) {
    throw new Error("Username is already taken.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await createUser({
    username,
    email,
    password_hash: passwordHash,
    role: "BUYER",
    status: "ACTIVE",
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}