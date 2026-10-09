const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", (req, res) => {
  const {
    rating,
    appreciationPoints,
    feedback,
    name,
    email,
  } = req.body;

  const sql = `
    INSERT INTO feedback
    (rating, appreciation_points, feedback, name, email)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    rating,
    appreciationPoints,
    feedback,
    name || null,
    email || null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("Error saving feedback:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to save feedback",
      });
    }

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully!",
      feedbackId: result.insertId,
    });
  });
});

module.exports = router;