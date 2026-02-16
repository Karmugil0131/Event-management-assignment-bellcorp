const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("../models/Event");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const events = [
  {
    name: "Grand Wedding Celebration",
    organizer: "Kesav Groups",
    location: "Chennai",
    date: new Date("2026-04-12"),
    description: "A beautiful wedding celebration.",
    capacity: 80,
    category: "WEDDING"
  },
  {
    name: "Career Expo 2026",
    organizer: "Kesav Groups",
    location: "Coimbatore",
    date: new Date("2026-05-20"),
    description: "Job fair connecting graduates with top companies.",
    capacity: 100,
    category: "JOB FAIR"
  },
  {
    name: "Influencer Meetup 2026",
    organizer: "Kesav Groups",
    location: "Madurai",
    date: new Date("2026-06-15"),
    description: "Community gathering for digital creators.",
    capacity: 60,
    category: "INFLUENCER COMMUNITIES"
  },
  {
    name: "Summer Bash",
    organizer: "Kesav Groups",
    location: "Tiruchirappalli",
    date: new Date("2026-07-10"),
    description: "A lively summer party with music and dance.",
    capacity: 90,
    category: "PARTY"
  },
  {
    name: "Royal Wedding",
    organizer: "Kesav Groups",
    location: "Salem",
    date: new Date("2026-08-05"),
    description: "Traditional wedding with grandeur.",
    capacity: 70,
    category: "WEDDING"
  },
  {
    name: "Job Connect",
    organizer: "Kesav Groups",
    location: "Erode",
    date: new Date("2026-09-18"),
    description: "Job fair for freshers and professionals.",
    capacity: 95,
    category: "JOB FAIR"
  },
  {
    name: "Creator Conclave",
    organizer: "Kesav Groups",
    location: "Vellore",
    date: new Date("2026-10-22"),
    description: "Networking event for influencers.",
    capacity: 50,
    category: "INFLUENCER COMMUNITIES"
  },
  {
    name: "Beach Party",
    organizer: "Kesav Groups",
    location: "Thoothukudi",
    date: new Date("2026-11-30"),
    description: "Fun-filled beach party with live music.",
    capacity: 100,
    category: "PARTY"
  },
  {
    name: "Sacred Wedding",
    organizer: "Kesav Groups",
    location: "Kanchipuram",
    date: new Date("2025-12-12"),
    description: "A divine wedding in the temple city.",
    capacity: 60,
    category: "WEDDING"
  },
  {
    name: "Career Fest",
    organizer: "Kesav Groups",
    location: "Tirunelveli",
    date: new Date("2026-12-20"),
    description: "Job fair for local graduates.",
    capacity: 85,
    category: "JOB FAIR"
  },
  {
    name: "Influencer Circle",
    organizer: "Kesav Groups",
    location: "Dindigul",
    date: new Date("2026-12-28"),
    description: "Meetup for social media creators.",
    capacity: 40,
    category: "INFLUENCER COMMUNITIES"
  },
  {
    name: "Coastal Party",
    organizer: "Kesav Groups",
    location: "Nagapattinam",
    date: new Date("2026-12-31"),
    description: "New Year party by the coast.",
    capacity: 100,
    category: "PARTY"
  },
  {
    name: "Elegant Wedding",
    organizer: "Kesav Groups",
    location: "Karur",
    date: new Date("2026-04-25"),
    description: "Elegant wedding with cultural traditions.",
    capacity: 75,
    category: "WEDDING"
  },
  {
    name: "Job Fair 2026",
    organizer: "Kesav Groups",
    location: "Namakkal",
    date: new Date("2026-05-15"),
    description: "Employment opportunities for youth.",
    capacity: 90,
    category: "JOB FAIR"
  },
  {
    name: "Influencer Summit",
    organizer: "Kesav Groups",
    location: "Cuddalore",
    date: new Date("2026-06-05"),
    description: "Summit for content creators.",
    capacity: 55,
    category: "INFLUENCER COMMUNITIES"
  },
  {
    name: "Dance Party",
    organizer: "Kesav Groups",
    location: "Ariyalur",
    date: new Date("2026-07-25"),
    description: "Dance party with DJs and performers.",
    capacity: 95,
    category: "PARTY"
  },
  {
    name: "Wedding Gala",
    organizer: "Kesav Groups",
    location: "Krishnagiri",
    date: new Date("2026-08-18"),
    description: "Grand wedding celebration.",
    capacity: 65,
    category: "WEDDING"
  },
  {
    name: "Career Drive",
    organizer: "Kesav Groups",
    location: "Perambalur",
    date: new Date("2026-01-10"),
    description: "Job fair for local talent.",
    capacity: 80,
    category: "JOB FAIR"
  },
  {
    name: "Influencer Forum",
    organizer: "Kesav Groups",
    location: "Ramanathapuram",
    date: new Date("2026-10-05"),
    description: "Forum for influencers to collaborate.",
    capacity: 45,
    category: "INFLUENCER COMMUNITIES"
  },
  {
    name: "Night Party",
    organizer: "Kesav Groups",
    location: "Villupuram",
    date: new Date("2026-11-15"),
    description: "Night party with entertainment.",
    capacity: 100,
    category: "PARTY"
  }
];


const seedData = async () => {
  try {
    await connectDB();

    await Event.deleteMany(); // Clear old events
    console.log("Old events removed");

    await Event.insertMany(events);
    console.log("Seed data inserted successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
