const express = require("express");

const router = express.Router();
const db = require("../config/db");

// ======================================
// GET ALL REGISTERED USERS
// ======================================
router.get("/users", (req, res) => {
  const sql = `
    SELECT id, name, email, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error fetching users:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch registered users",
      });
    }

    res.status(200).json({
      success: true,
      users: results,
    });
  });
});

// ======================================
// GET ALL CONTACT ENTRIES
// ======================================
router.get("/contacts", (req, res) => {
  const sql = `
    SELECT *
    FROM contacts
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error fetching contacts:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch contact entries",
      });
    }

    res.status(200).json({
      success: true,
      contacts: results,
    });
  });
});

// ======================================
// GET ALL FEEDBACK
// ======================================
router.get("/feedback", (req, res) => {
  const sql = `
    SELECT *
    FROM feedback
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error fetching feedback:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch feedback",
      });
    }

    res.status(200).json({
      success: true,
      feedback: results,
    });
  });
});

// ======================================
// ADMIN DASHBOARD COUNTS
// ======================================
router.get("/stats", (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS totalUsers,
      (SELECT COUNT(*) FROM contacts) AS totalContacts,
      (SELECT COUNT(*) FROM feedback) AS totalFeedback
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error fetching dashboard stats:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard statistics",
      });
    }

    res.status(200).json({
      success: true,
      stats: results[0],
    });
  });
});

module.exports = router;