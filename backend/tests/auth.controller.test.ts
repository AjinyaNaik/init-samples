import { Request, Response } from "express";
import { register, login } from "../src/controller/auth.controller";
import {
  registerUser,
  loginUser,
} from "../src/service/auth.service";

jest.mock("../src/service/auth.service", () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
}));

const mockedRegisterUser = registerUser as jest.MockedFunction<
  typeof registerUser
>;

const mockedLoginUser = loginUser as jest.MockedFunction<
  typeof loginUser
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
      role: "USER",
      is_seller: false,
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
        role: "USER",
        is_seller: false,
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

describe("Auth Controller - login", () => {
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

  it("should login a user successfully", async () => {
    req.body = {
      email: "john@example.com",
      password: "password123",
    };

    mockedLoginUser.mockResolvedValue({
      token: "test-jwt-token",
      user: {
        id: 1,
        username: "john",
        email: "john@example.com",
        role: "USER",
        is_seller: false,
        status: "ACTIVE",
      },
    });

    await login(req as Request, res as Response);

    expect(mockedLoginUser).toHaveBeenCalledWith(
      "john@example.com",
      "password123"
    );

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful.",
      token: "test-jwt-token",
      user: {
        id: 1,
        username: "john",
        email: "john@example.com",
        role: "USER",
        is_seller: false,
        status: "ACTIVE",
      },
    });
  });

  it("should return 400 when email is missing", async () => {
    req.body = {
      password: "password123",
    };

    await login(req as Request, res as Response);

    expect(mockedLoginUser).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Email and password are required.",
    });
  });

  it("should return 400 when password is missing", async () => {
    req.body = {
      email: "john@example.com",
    };

    await login(req as Request, res as Response);

    expect(mockedLoginUser).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Email and password are required.",
    });
  });

  it("should return 400 when email and password are missing", async () => {
    req.body = {};

    await login(req as Request, res as Response);

    expect(mockedLoginUser).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Email and password are required.",
    });
  });

  it("should return 401 when login service throws an Error", async () => {
    req.body = {
      email: "john@example.com",
      password: "wrongpassword",
    };

    mockedLoginUser.mockRejectedValue(
      new Error("Invalid email or password.")
    );

    await login(req as Request, res as Response);

    expect(mockedLoginUser).toHaveBeenCalledWith(
      "john@example.com",
      "wrongpassword"
    );

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password.",
    });
  });

  it("should return generic error when login service throws a non-Error value", async () => {
    req.body = {
      email: "john@example.com",
      password: "password123",
    };

    mockedLoginUser.mockRejectedValue("Something went wrong");

    await login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Unable to login.",
    });
  });
});