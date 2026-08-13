import { Request, Response } from "express";
import * as samplePackService from "../src/service/samplePack.service";

import {
  createSamplePack,
  getSamplePacks,
  getSamplePack,
  updateSamplePack,
  deleteSamplePack,
} from "../src/controller/samplePack.controller";

jest.mock("../src/service/samplePack.service");

describe("Sample Pack Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("createSamplePack", () => {
    it("should create a sample pack and return 201", async () => {
      const samplePack = {
        id: 1,
        name: "Dark Trap Essentials",
        description: "Dark trap sounds",
        cover_image: "cover.jpg",
      };

      req = {
        body: {
          name: "Dark Trap Essentials",
          description: "Dark trap sounds",
          cover_image: "cover.jpg",
        },
      };

      (
        samplePackService.createSamplePack as jest.Mock
      ).mockResolvedValue(samplePack);

      await createSamplePack(
        req as Request,
        res as Response
      );

      expect(
        samplePackService.createSamplePack
      ).toHaveBeenCalledWith(req.body);

      expect(res.status).toHaveBeenCalledWith(201);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: samplePack,
      });
    });

    it("should return 400 when service throws", async () => {
      req = {
        body: {},
      };

      (
        samplePackService.createSamplePack as jest.Mock
      ).mockRejectedValue(
        new Error("Sample pack name is required")
      );

      await createSamplePack(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sample pack name is required",
      });
    });
  });

  describe("getSamplePacks", () => {
    it("should return all sample packs", async () => {
      const samplePacks = [
        {
          id: 1,
          name: "Dark Trap Essentials",
        },
        {
          id: 2,
          name: "Cinematic Drums",
        },
      ];

      (
        samplePackService.getAllSamplePacks as jest.Mock
      ).mockResolvedValue(samplePacks);

      req = {};

      await getSamplePacks(
        req as Request,
        res as Response
      );

      expect(
        samplePackService.getAllSamplePacks
      ).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: samplePacks,
      });
    });

    it("should return 500 when service throws", async () => {
      (
        samplePackService.getAllSamplePacks as jest.Mock
      ).mockRejectedValue(
        new Error("Database error")
      );

      req = {};

      await getSamplePacks(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Database error",
      });
    });
  });

  describe("getSamplePack", () => {
    it("should return a sample pack by id", async () => {
      const samplePack = {
        id: 1,
        name: "Dark Trap Essentials",
      };

      req = {
        params: {
          id: "1",
        },
      };

      (
        samplePackService.getSamplePackById as jest.Mock
      ).mockResolvedValue(samplePack);

      await getSamplePack(
        req as Request,
        res as Response
      );

      expect(
        samplePackService.getSamplePackById
      ).toHaveBeenCalledWith(1);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: samplePack,
      });
    });

    it("should return 400 for invalid id", async () => {
      req = {
        params: {
          id: "abc",
        },
      };

      await getSamplePack(
        req as Request,
        res as Response
      );

      expect(
        samplePackService.getSamplePackById
      ).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid sample pack ID",
      });
    });

    it("should return 404 when sample pack is not found", async () => {
      req = {
        params: {
          id: "999",
        },
      };

      (
        samplePackService.getSamplePackById as jest.Mock
      ).mockRejectedValue(
        new Error("Sample pack not found")
      );

      await getSamplePack(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sample pack not found",
      });
    });
  });

  describe("updateSamplePack", () => {
    it("should update a sample pack", async () => {
      const updatedSamplePack = {
        id: 1,
        name: "Updated Trap Essentials",
      };

      req = {
        params: {
          id: "1",
        },
        body: {
          name: "Updated Trap Essentials",
        },
      };

      (
        samplePackService.updateSamplePack as jest.Mock
      ).mockResolvedValue(updatedSamplePack);

      await updateSamplePack(
        req as Request,
        res as Response
      );

      expect(
        samplePackService.updateSamplePack
      ).toHaveBeenCalledWith(1, req.body);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: updatedSamplePack,
      });
    });

    it("should return 400 for invalid id", async () => {
      req = {
        params: {
          id: "abc",
        },
        body: {},
      };

      await updateSamplePack(
        req as Request,
        res as Response
      );

      expect(
        samplePackService.updateSamplePack
      ).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid sample pack ID",
      });
    });

    it("should return 404 when sample pack is not found", async () => {
      req = {
        params: {
          id: "999",
        },
        body: {
          name: "Updated",
        },
      };

      (
        samplePackService.updateSamplePack as jest.Mock
      ).mockRejectedValue(
        new Error("Sample pack not found")
      );

      await updateSamplePack(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sample pack not found",
      });
    });
  });

  describe("deleteSamplePack", () => {
    it("should delete a sample pack", async () => {
      const result = {
        success: true,
        message: "Sample pack deleted successfully",
      };

      req = {
        params: {
          id: "1",
        },
      };

      (
        samplePackService.deleteSamplePack as jest.Mock
      ).mockResolvedValue(result);

      await deleteSamplePack(
        req as Request,
        res as Response
      );

      expect(
        samplePackService.deleteSamplePack
      ).toHaveBeenCalledWith(1);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith(result);
    });

    it("should return 400 for invalid id", async () => {
      req = {
        params: {
          id: "abc",
        },
      };

      await deleteSamplePack(
        req as Request,
        res as Response
      );

      expect(
        samplePackService.deleteSamplePack
      ).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid sample pack ID",
      });
    });

    it("should return 404 when sample pack is not found", async () => {
      req = {
        params: {
          id: "999",
        },
      };

      (
        samplePackService.deleteSamplePack as jest.Mock
      ).mockRejectedValue(
        new Error("Sample pack not found")
      );

      await deleteSamplePack(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sample pack not found",
      });
    });
  });
});