import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    role: "USER",
    status: "ACTIVE",
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  if (user.status !== "ACTIVE") {
    throw new Error("User account is suspended.");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password.");
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    secret,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
}