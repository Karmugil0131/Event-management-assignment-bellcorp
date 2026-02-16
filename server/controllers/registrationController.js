const Registration = require("../models/Registration");
const Event = require("../models/Event");

// @desc    Register user for event
// @route   POST /api/registrations/:eventId
// @access  Protected
const registerForEvent = async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (new Date(event.date) < new Date()) {
      return res.status(400).json({
        message: "Cannot register for past event",
      });
    }

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    const alreadyRegistered = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    await Registration.create({
      user: userId,
      event: eventId,
    });

    event.registeredCount += 1;
    await event.save();

    res.status(201).json({ message: "Registration successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Cancel registration
// @route   DELETE /api/registrations/:eventId
// @access  Protected
const cancelRegistration = async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.params;

  try {
    const registration = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    await registration.deleteOne();

    const event = await Event.findById(eventId);
    if (event && event.registeredCount > 0) {
      event.registeredCount -= 1;
      await event.save();
    }

    res.json({ message: "Registration cancelled" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get logged-in user's registrations
// @route   GET /api/registrations/my-events
// @access  Protected
const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id,
    }).populate("event");

    res.json(registrations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
};
