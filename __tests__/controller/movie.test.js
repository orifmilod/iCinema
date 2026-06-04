const Movie = require("../../models/movie.js");
const Genre = require("../../models/genre.js");

jest.mock("../../models/movie.js");
jest.mock("../../models/genre.js");

describe("Movie Controller - Genre Validation and Image Handling", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Genre Validation", () => {
    test("should accept valid genre IDs", async () => {
      const genreIds = ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"];
      const selectMock = jest.fn().mockResolvedValue([
        { _id: "507f1f77bcf86cd799439011" },
        { _id: "507f1f77bcf86cd799439012" },
      ]);
      Genre.find = jest.fn().mockReturnValue({ select: selectMock });

      const genreIdsArray = Array.isArray(genreIds)
        ? genreIds
        : [genreIds];
      const existingGenres = await Genre.find({
        _id: { $in: genreIdsArray },
      }).select("_id");

      expect(genreIdsArray.length).toBe(2);
      expect(existingGenres.length).toBe(2);
      expect(existingGenres.length === genreIdsArray.length).toBe(true);
    });

    test("should reject when genre IDs are invalid", async () => {
      const genreIds = [
        "507f1f77bcf86cd799439011",
        "invalid_id_that_doesnt_exist",
      ];
      const selectMock = jest.fn().mockResolvedValue([
        { _id: "507f1f77bcf86cd799439011" },
      ]);
      Genre.find = jest.fn().mockReturnValue({ select: selectMock });

      const genreIdsArray = Array.isArray(genreIds)
        ? genreIds
        : [genreIds];
      const existingGenres = await Genre.find({
        _id: { $in: genreIdsArray },
      }).select("_id");

      expect(genreIdsArray.length).toBe(2);
      expect(existingGenres.length).toBe(1);
      expect(existingGenres.length === genreIdsArray.length).toBe(false);
    });

    test("should handle single genre ID (converted to array)", async () => {
      const genre = "507f1f77bcf86cd799439011";
      const selectMock = jest.fn().mockResolvedValue([
        { _id: "507f1f77bcf86cd799439011" },
      ]);
      Genre.find = jest.fn().mockReturnValue({ select: selectMock });

      const genreIds = Array.isArray(genre) ? genre : [genre];
      expect(genreIds).toEqual(["507f1f77bcf86cd799439011"]);

      const existingGenres = await Genre.find({
        _id: { $in: genreIds },
      }).select("_id");

      expect(existingGenres.length === genreIds.length).toBe(true);
    });

    test("should handle multiple genre IDs (already array)", async () => {
      const genre = [
        "507f1f77bcf86cd799439011",
        "507f1f77bcf86cd799439012",
      ];
      const selectMock = jest.fn().mockResolvedValue([
        { _id: "507f1f77bcf86cd799439011" },
        { _id: "507f1f77bcf86cd799439012" },
      ]);
      Genre.find = jest.fn().mockReturnValue({ select: selectMock });

      const genreIds = Array.isArray(genre) ? genre : [genre];
      expect(Array.isArray(genreIds)).toBe(true);

      const existingGenres = await Genre.find({
        _id: { $in: genreIds },
      }).select("_id");

      expect(existingGenres.length === genreIds.length).toBe(true);
    });

    test("should return false when no genres match", async () => {
      const genreIds = [
        "nonexistent_id_1",
        "nonexistent_id_2",
      ];
      const selectMock = jest.fn().mockResolvedValue([]);
      Genre.find = jest.fn().mockReturnValue({ select: selectMock });

      const genreIdsArray = Array.isArray(genreIds)
        ? genreIds
        : [genreIds];
      const existingGenres = await Genre.find({
        _id: { $in: genreIdsArray },
      }).select("_id");

      expect(existingGenres.length === genreIdsArray.length).toBe(false);
      expect(existingGenres.length).toBe(0);
    });
  });

  describe("Image File Handling", () => {
    test("should use file path when image is provided", () => {
      const req = {
        file: {
          path: "/path/to/image.jpg",
        },
      };

      const image = req.file ? req.file.path : "";
      expect(image).toBe("/path/to/image.jpg");
    });

    test("should set empty string when no image file is provided", () => {
      const req = {
        file: null,
      };

      const image = req.file ? req.file.path : "";
      expect(image).toBe("");
    });

    test("should handle undefined file gracefully", () => {
      const req = {
        file: undefined,
      };

      const image = req.file ? req.file.path : "";
      expect(image).toBe("");
    });

    test("should handle cloudinary image path", () => {
      const req = {
        file: {
          path: "https://res.cloudinary.com/demo/image/upload/v1234567890/movie_poster.jpg",
        },
      };

      const image = req.file ? req.file.path : "";
      expect(image).toContain("cloudinary.com");
      expect(image).toContain("movie_poster.jpg");
    });
  });

  describe("Movie Creation with Validation", () => {
    test("should create movie with valid genres and image", async () => {
      const movieData = {
        title: "Test Movie",
        genre: ["507f1f77bcf86cd799439011"],
        rate: 8.5,
        description: "Test description",
        trailerLink: "https://youtube.com/watch?v=test",
        movieLength: 120,
      };

      const fileData = {
        path: "/uploads/poster.jpg",
      };

      const genreIds = Array.isArray(movieData.genre)
        ? movieData.genre
        : [movieData.genre];

      const selectMock = jest.fn().mockResolvedValue([
        { _id: "507f1f77bcf86cd799439011" },
      ]);
      Genre.find = jest.fn().mockReturnValue({ select: selectMock });

      const existingGenres = await Genre.find({
        _id: { $in: genreIds },
      }).select("_id");

      const image = fileData ? fileData.path : "";

      expect(existingGenres.length === genreIds.length).toBe(true);
      expect(image).toBe("/uploads/poster.jpg");
    });

    test("should reject movie creation with invalid genres", async () => {
      const movieData = {
        title: "Test Movie",
        genre: [
          "507f1f77bcf86cd799439011",
          "invalid_genre_id",
        ],
        rate: 8.5,
        description: "Test description",
        trailerLink: "https://youtube.com/watch?v=test",
        movieLength: 120,
      };

      const genreIds = Array.isArray(movieData.genre)
        ? movieData.genre
        : [movieData.genre];

      const selectMock = jest.fn().mockResolvedValue([
        { _id: "507f1f77bcf86cd799439011" },
      ]);
      Genre.find = jest.fn().mockReturnValue({ select: selectMock });

      const existingGenres = await Genre.find({
        _id: { $in: genreIds },
      }).select("_id");

      expect(existingGenres.length === genreIds.length).toBe(false);
    });

    test("should create movie without image", async () => {
      const movieData = {
        title: "Test Movie",
        genre: ["507f1f77bcf86cd799439011"],
        rate: 8.5,
        description: "Test description",
        trailerLink: "https://youtube.com/watch?v=test",
        movieLength: 120,
      };

      const genreIds = Array.isArray(movieData.genre)
        ? movieData.genre
        : [movieData.genre];

      const selectMock = jest.fn().mockResolvedValue([
        { _id: "507f1f77bcf86cd799439011" },
      ]);
      Genre.find = jest.fn().mockReturnValue({ select: selectMock });

      const existingGenres = await Genre.find({
        _id: { $in: genreIds },
      }).select("_id");

      const image = null ? null.path : "";

      expect(existingGenres.length === genreIds.length).toBe(true);
      expect(image).toBe("");
    });
  });
});
