import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as storyController from "../controllers/story.js";
import { isAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateStory = [
  body("content")
    .trim()
    .isLength({ min: 3 })
    .withMessage("3글자 이상 적어주세요."),
  validate,
];

// GET /story
router.get("/", storyController.getStories);

// GET /story/:id
router.get("/:id", storyController.getStory);

// POST /story
router.post("/", validateStory, storyController.createStory);

// PUT /story/:id
router.put("/:id", validateStory, storyController.updateStory);

// DELETE /story/:id
router.delete("/:id", storyController.deleteStory);

export default router;
