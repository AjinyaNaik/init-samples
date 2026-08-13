import { Request, Response } from "express";

import {
  createSellerRequest,
  getMyRequests,
  cancelMyRequest,
  getAllSellerRequestsController,
  approveSellerRequestController,
  rejectSellerRequestController,
} from "../src/controller/seller_request.controller";

import {
  requestToBecomeSeller,
  getMySellerRequests,
  cancelMySellerRequest,
  getAllSellerRequests,
  approveSellerRequest,
  rejectSellerRequest,
} from "../src/service/seller_request.service";

jest.mock("../src/service/seller_request.service", () => ({
  requestToBecomeSeller: jest.fn(),
  getMySellerRequests: jest.fn(),
  cancelMySellerRequest: jest.fn(),
  getAllSellerRequests: jest.fn(),
  approveSellerRequest: jest.fn(),
  rejectSellerRequest: jest.fn(),
}));

const mockedRequestToBecomeSeller =
  requestToBecomeSeller as jest.MockedFunction<
    typeof requestToBecomeSeller
  >;

const mockedGetMySellerRequests =
  getMySellerRequests as jest.MockedFunction<
    typeof getMySellerRequests
  >;

const mockedCancelMySellerRequest =
  cancelMySellerRequest as jest.MockedFunction<
    typeof cancelMySellerRequest
  >;

const mockedGetAllSellerRequests =
  getAllSellerRequests as jest.MockedFunction<
    typeof getAllSellerRequests
  >;

const mockedApproveSellerRequest =
  approveSellerRequest as jest.MockedFunction<
    typeof approveSellerRequest
  >;

const mockedRejectSellerRequest =
  rejectSellerRequest as jest.MockedFunction<
    typeof rejectSellerRequest
  >;

describe("Seller Request Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      user: {
        id: 1,
        role: "USER",
      } as any,
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  // ============================================================
  // CREATE SELLER REQUEST
  // ============================================================

  describe("createSellerRequest", () => {
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
        new Error(
          "You already have a pending seller request."
        )
      );

      await createSellerRequest(
        req as Request,
        res as Response
      );

      expect(mockedRequestToBecomeSeller).toHaveBeenCalledWith(1);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "You already have a pending seller request.",
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
        message:
          "Unable to submit seller request.",
      });
    });
  });

  // ============================================================
  // GET MY REQUESTS
  // ============================================================

  describe("getMyRequests", () => {
    it("should return the user's seller requests", async () => {
      const requests = [
        {
          id: 1,
          user_id: 1,
          status: "PENDING",
        },
        {
          id: 2,
          user_id: 1,
          status: "REJECTED",
        },
      ];

      mockedGetMySellerRequests.mockResolvedValue(
        requests as any
      );

      await getMyRequests(
        req as Request,
        res as Response
      );

      expect(mockedGetMySellerRequests).toHaveBeenCalledWith(1);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        requests,
      });
    });

    it("should return 400 when fetching requests fails", async () => {
      mockedGetMySellerRequests.mockRejectedValue(
        new Error("Unable to fetch seller requests.")
      );

      await getMyRequests(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Unable to fetch seller requests.",
      });
    });

    it("should return generic error when service throws a non-Error value", async () => {
      mockedGetMySellerRequests.mockRejectedValue(
        "Something went wrong"
      );

      await getMyRequests(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Unable to fetch seller requests.",
      });
    });
  });

  // ============================================================
  // CANCEL MY REQUEST
  // ============================================================

  describe("cancelMyRequest", () => {
    it("should cancel the user's seller request successfully", async () => {
      req.params = {
        id: "1",
      };

      mockedCancelMySellerRequest.mockResolvedValue(
        undefined
      );

      await cancelMyRequest(
        req as Request,
        res as Response
      );

      expect(mockedCancelMySellerRequest).toHaveBeenCalledWith(
        1,
        1
      );

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "Seller request cancelled successfully.",
      });
    });

    it("should return 400 when the request does not belong to the user", async () => {
      req.params = {
        id: "10",
      };

      mockedCancelMySellerRequest.mockRejectedValue(
        new Error(
          "You are not authorized to cancel this request."
        )
      );

      await cancelMyRequest(
        req as Request,
        res as Response
      );

      expect(
        mockedCancelMySellerRequest
      ).toHaveBeenCalledWith(10, 1);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "You are not authorized to cancel this request.",
      });
    });

    it("should return 400 when the request is not pending", async () => {
      req.params = {
        id: "1",
      };

      mockedCancelMySellerRequest.mockRejectedValue(
        new Error(
          "Only pending seller requests can be cancelled."
        )
      );

      await cancelMyRequest(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "Only pending seller requests can be cancelled.",
      });
    });
  });

  // ============================================================
  // GET ALL REQUESTS - ADMIN
  // ============================================================

  describe("getAllSellerRequestsController", () => {
    it("should return all seller requests", async () => {
      const requests = [
        {
          id: 1,
          user_id: 1,
          status: "PENDING",
        },
        {
          id: 2,
          user_id: 2,
          status: "APPROVED",
        },
      ];

      mockedGetAllSellerRequests.mockResolvedValue(
        requests as any
      );

      await getAllSellerRequestsController(
        req as Request,
        res as Response
      );

      expect(mockedGetAllSellerRequests).toHaveBeenCalledWith();

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        requests,
      });
    });

    it("should return 400 when fetching all requests fails", async () => {
      mockedGetAllSellerRequests.mockRejectedValue(
        new Error("Unable to fetch seller requests.")
      );

      await getAllSellerRequestsController(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "Unable to fetch seller requests.",
      });
    });

    it("should return generic error when service throws a non-Error value", async () => {
      mockedGetAllSellerRequests.mockRejectedValue(
        "Something went wrong"
      );

      await getAllSellerRequestsController(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "Unable to fetch seller requests.",
      });
    });
  });

  // ============================================================
  // APPROVE REQUEST - ADMIN
  // ============================================================

  describe("approveSellerRequestController", () => {
    it("should approve a seller request successfully", async () => {
      req.params = {
        id: "5",
      };

      const sellerRequest = {
        id: 5,
        user_id: 2,
        status: "APPROVED",
        reviewed_by: 1,
      };

      mockedApproveSellerRequest.mockResolvedValue(
        sellerRequest as any
      );

      await approveSellerRequestController(
        req as Request,
        res as Response
      );

      expect(mockedApproveSellerRequest).toHaveBeenCalledWith(
        5,
        1
      );

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "Seller request approved successfully.",
        sellerRequest,
      });
    });

    it("should return 400 when the request does not exist", async () => {
      req.params = {
        id: "999",
      };

      mockedApproveSellerRequest.mockRejectedValue(
        new Error("Seller request not found.")
      );

      await approveSellerRequestController(
        req as Request,
        res as Response
      );

      expect(
        mockedApproveSellerRequest
      ).toHaveBeenCalledWith(999, 1);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Seller request not found.",
      });
    });

    it("should return 400 when the request is not pending", async () => {
      req.params = {
        id: "5",
      };

      mockedApproveSellerRequest.mockRejectedValue(
        new Error(
          "Only pending requests can be approved."
        )
      );

      await approveSellerRequestController(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "Only pending requests can be approved.",
      });
    });
  });

  // ============================================================
  // REJECT REQUEST - ADMIN
  // ============================================================

  describe("rejectSellerRequestController", () => {
    it("should reject a seller request successfully", async () => {
      req.params = {
        id: "5",
      };

      const sellerRequest = {
        id: 5,
        user_id: 2,
        status: "REJECTED",
        reviewed_by: 1,
      };

      mockedRejectSellerRequest.mockResolvedValue(
        sellerRequest as any
      );

      await rejectSellerRequestController(
        req as Request,
        res as Response
      );

      expect(mockedRejectSellerRequest).toHaveBeenCalledWith(
        5,
        1
      );

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "Seller request rejected successfully.",
        sellerRequest,
      });
    });

    it("should return 400 when the request does not exist", async () => {
      req.params = {
        id: "999",
      };

      mockedRejectSellerRequest.mockRejectedValue(
        new Error("Seller request not found.")
      );

      await rejectSellerRequestController(
        req as Request,
        res as Response
      );

      expect(
        mockedRejectSellerRequest
      ).toHaveBeenCalledWith(999, 1);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Seller request not found.",
      });
    });

    it("should return 400 when the request is not pending", async () => {
      req.params = {
        id: "5",
      };

      mockedRejectSellerRequest.mockRejectedValue(
        new Error(
          "Only pending requests can be rejected."
        )
      );

      await rejectSellerRequestController(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message:
          "Only pending requests can be rejected.",
      });
    });
  });
});