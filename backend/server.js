require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import routes
const contactRoutes = require("./routes/contactRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ======================================
// MIDDLEWARE
// ======================================

app.use(cors());
app.use(express.json());

// ======================================
// API ROUTES
// ======================================

// Contact form
app.use("/api/contacts", contactRoutes);

// Feedback form
app.use("/api/feedback", feedbackRoutes);

// Registration & Login
app.use("/api/auth", authRoutes);

// Admin Panel
app.use("/api/admin", adminRoutes);

// ======================================
// HOME / SERVER TEST ROUTE
// ======================================

app.get("/", (req, res) => {
res.send("Worldwide Constructions Backend is Running!");
});

// ======================================
// START SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
console.log(`Server running on port ${PORT}`);
});
