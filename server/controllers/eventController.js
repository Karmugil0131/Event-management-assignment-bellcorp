const Event = require("../models/Event");

// @desc    Create new event
// @route   POST /api/events
const createEvent = async (req, res) => {
  const { name, organizer, location, date, description, capacity, category } = req.body;

  if (!name || !organizer || !location || !date || !description || !capacity || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const event = await Event.create({
      name,
      organizer,
      location,
      date,
      description,
      capacity,
      category,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all events with search & filter
// @route   GET /api/events
const getEvents = async (req, res) => {
  const { search, category, location, date } = req.query;

  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (date) {
    query.date = { $gte: new Date(date) };
  }

  try {
    const events = await Event.find(query).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createEvent, getEvents, getEventById };
