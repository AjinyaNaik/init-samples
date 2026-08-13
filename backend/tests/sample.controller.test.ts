import { Request, Response } from "express";
import * as sampleService from "..//src/service/sample.service";

import {
  createSample,
  getSamples,
  getSample,
  updateSample,
  deleteSample,
} from "../src/controller/sample.controller";

jest.mock("../src/service/sample.service");

describe("Sample Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("createSample", () => {
    it("should create a sample and return 201", async () => {
      const sample = {
        id: 1,
        name: "Dark 808",
        audio_url: "dark-808.wav",
        sample_type: "BASS",
      };

      req = {
        body: {
          name: "Dark 808",
          audio_url: "dark-808.wav",
          sample_type: "BASS",
          genres: ["TRAP"],
        },
      };

      (
        sampleService.createSample as jest.Mock
      ).mockResolvedValue(sample);

      await createSample(
        req as Request,
        res as Response
      );

      expect(
        sampleService.createSample
      ).toHaveBeenCalledWith(req.body);

      expect(res.status).toHaveBeenCalledWith(201);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: sample,
      });
    });

    it("should return 400 when service throws", async () => {
      req = {
        body: {},
      };

      (
        sampleService.createSample as jest.Mock
      ).mockRejectedValue(
        new Error("Sample name is required")
      );

      await createSample(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sample name is required",
      });
    });
  });

  describe("getSamples", () => {
    it("should return all samples", async () => {
      const samples = [
        {
          id: 1,
          name: "Dark 808",
        },
        {
          id: 2,
          name: "Trap Kick",
        },
      ];

      (
        sampleService.getAllSamples as jest.Mock
      ).mockResolvedValue(samples);

      req = {};

      await getSamples(
        req as Request,
        res as Response
      );

      expect(
        sampleService.getAllSamples
      ).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: samples,
      });
    });

    it("should return 500 when service throws", async () => {
      (
        sampleService.getAllSamples as jest.Mock
      ).mockRejectedValue(
        new Error("Database error")
      );

      req = {};

      await getSamples(
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

  describe("getSample", () => {
    it("should return a sample by id", async () => {
      const sample = {
        id: 1,
        name: "Dark 808",
      };

      req = {
        params: {
          id: "1",
        },
      };

      (
        sampleService.getSampleById as jest.Mock
      ).mockResolvedValue(sample);

      await getSample(
        req as Request,
        res as Response
      );

      expect(
        sampleService.getSampleById
      ).toHaveBeenCalledWith(1);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: sample,
      });
    });

    it("should return 400 for invalid id", async () => {
      req = {
        params: {
          id: "abc",
        },
      };

      await getSample(
        req as Request,
        res as Response
      );

      expect(
        sampleService.getSampleById
      ).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid sample ID",
      });
    });

    it("should return 404 when sample is not found", async () => {
      req = {
        params: {
          id: "999",
        },
      };

      (
        sampleService.getSampleById as jest.Mock
      ).mockRejectedValue(
        new Error("Sample not found")
      );

      await getSample(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sample not found",
      });
    });
  });

  describe("updateSample", () => {
    it("should update a sample", async () => {
      const updatedSample = {
        id: 1,
        name: "Updated 808",
        is_selling: true,
      };

      req = {
        params: {
          id: "1",
        },
        body: {
          name: "Updated 808",
          is_selling: true,
        },
      };

      (
        sampleService.updateSample as jest.Mock
      ).mockResolvedValue(updatedSample);

      await updateSample(
        req as Request,
        res as Response
      );

      expect(
        sampleService.updateSample
      ).toHaveBeenCalledWith(1, req.body);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: updatedSample,
      });
    });

    it("should return 400 for invalid id", async () => {
      req = {
        params: {
          id: "abc",
        },
        body: {},
      };

      await updateSample(
        req as Request,
        res as Response
      );

      expect(
        sampleService.updateSample
      ).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid sample ID",
      });
    });

    it("should return 404 when sample is not found", async () => {
      req = {
        params: {
          id: "999",
        },
        body: {
          name: "Updated",
        },
      };

      (
        sampleService.updateSample as jest.Mock
      ).mockRejectedValue(
        new Error("Sample not found")
      );

      await updateSample(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sample not found",
      });
    });
  });

  describe("deleteSample", () => {
    it("should delete a sample", async () => {
      const result = {
        success: true,
        message: "Sample deleted successfully",
      };

      req = {
        params: {
          id: "1",
        },
      };

      (
        sampleService.deleteSample as jest.Mock
      ).mockResolvedValue(result);

      await deleteSample(
        req as Request,
        res as Response
      );

      expect(
        sampleService.deleteSample
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

      await deleteSample(
        req as Request,
        res as Response
      );

      expect(
        sampleService.deleteSample
      ).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid sample ID",
      });
    });

    it("should return 404 when sample is not found", async () => {
      req = {
        params: {
          id: "999",
        },
      };

      (
        sampleService.deleteSample as jest.Mock
      ).mockRejectedValue(
        new Error("Sample not found")
      );

      await deleteSample(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sample not found",
      });
    });
  });
});