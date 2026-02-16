const { protect } = require("../middleware/authMiddleware")
const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
} = require("../controllers/eventController");

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", protect, getEventById);

module.exports = router;
