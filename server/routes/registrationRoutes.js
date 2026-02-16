const express = require("express");
const router = express.Router();
const {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
} = require("../controllers/registrationController");

const { protect } = require("../middleware/authMiddleware");

router.post("/:eventId", protect, registerForEvent);
router.delete("/:eventId", protect, cancelRegistration);
router.get("/my-events", protect, getMyRegistrations);

module.exports = router;
