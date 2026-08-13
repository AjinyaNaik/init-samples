import { Request, Response } from "express";
import { createSellerRequest } from "../src/controller/seller_request.controller";
import { requestToBecomeSeller } from "../src/service/seller_request.service";

jest.mock("../src/service/seller_request.service", () => ({
  requestToBecomeSeller: jest.fn(),
}));

const mockedRequestToBecomeSeller =
  requestToBecomeSeller as jest.MockedFunction<
    typeof requestToBecomeSeller
  >;

describe("Seller Request Controller - createSellerRequest", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      user: {
        id: 1,
        role: "USER",
      } as any,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("should create a seller request successfully", async () => {
    const sellerRequest = {
      id: 1,
      user_id: 1,
      status: "PENDING",
    };

    mockedRequestToBecomeSeller.mockResolvedValue(
      sellerRequest as any
    );

    await createSellerRequest(
      req as Request,
      res as Response
    );

    expect(mockedRequestToBecomeSeller).toHaveBeenCalledWith(1);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      message: "Seller request submitted successfully.",
      sellerRequest,
    });
  });

  it("should return 400 when the user already has a pending request", async () => {
    mockedRequestToBecomeSeller.mockRejectedValue(
      new Error("You already have a pending seller request.")
    );

    await createSellerRequest(
      req as Request,
      res as Response
    );

    expect(mockedRequestToBecomeSeller).toHaveBeenCalledWith(1);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "You already have a pending seller request.",
    });
  });

  it("should return generic error when service throws a non-Error value", async () => {
    mockedRequestToBecomeSeller.mockRejectedValue(
      "Something went wrong"
    );

    await createSellerRequest(
      req as Request,
      res as Response
    );

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Unable to submit seller request.",
    });
  });
});