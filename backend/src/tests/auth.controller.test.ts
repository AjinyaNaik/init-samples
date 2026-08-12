import { Request, Response } from "express";
import { register } from "../controller/auth.controller";
import { registerUser } from "../service/auth.service";

jest.mock("../service/auth.service", () => ({
  registerUser: jest.fn(),
}));

const mockedRegisterUser = registerUser as jest.MockedFunction<
  typeof registerUser
>;

describe("Auth Controller - register", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("should register a user successfully", async () => {
    req.body = {
      username: "john",
      email: "john@example.com",
      password: "password123",
    };

    mockedRegisterUser.mockResolvedValue({
      id: 1,
      username: "john",
      email: "john@example.com",
      role: "BUYER",
      status: "ACTIVE",
    } as any);

    await register(req as Request, res as Response);

    expect(mockedRegisterUser).toHaveBeenCalledWith({
      username: "john",
      email: "john@example.com",
      password: "password123",
    });

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully.",
      user: {
        id: 1,
        username: "john",
        email: "john@example.com",
        role: "BUYER",
        status: "ACTIVE",
      },
    });
  });

  it("should return 400 when username is missing", async () => {
    req.body = {
      email: "john@example.com",
      password: "password123",
    };

    await register(req as Request, res as Response);

    expect(mockedRegisterUser).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Username, email and password are required.",
    });
  });

  it("should return 400 when email is missing", async () => {
    req.body = {
      username: "john",
      password: "password123",
    };

    await register(req as Request, res as Response);

    expect(mockedRegisterUser).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Username, email and password are required.",
    });
  });

  it("should return 400 when password is missing", async () => {
    req.body = {
      username: "john",
      email: "john@example.com",
    };

    await register(req as Request, res as Response);

    expect(mockedRegisterUser).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Username, email and password are required.",
    });
  });

  it("should return 400 when all required fields are missing", async () => {
    req.body = {};

    await register(req as Request, res as Response);

    expect(mockedRegisterUser).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Username, email and password are required.",
    });
  });

  it("should return 400 when registration service throws an Error", async () => {
    req.body = {
      username: "john",
      email: "john@example.com",
      password: "password123",
    };

    mockedRegisterUser.mockRejectedValue(
      new Error("Email already exists.")
    );

    await register(req as Request, res as Response);

    expect(mockedRegisterUser).toHaveBeenCalledWith({
      username: "john",
      email: "john@example.com",
      password: "password123",
    });

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Email already exists.",
    });
  });

  it("should return generic error when service throws a non-Error value", async () => {
    req.body = {
      username: "john",
      email: "john@example.com",
      password: "password123",
    };

    mockedRegisterUser.mockRejectedValue("Something went wrong");

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Unable to register user.",
    });
  });
});
