const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", (req, res) => {
  const {
    name,
    email,
    phone,
    location,
    projectType,
    budget,
    timeline,
    message,
  } = req.body;

  const sql = `
    INSERT INTO contacts
    (name, email, phone, location, project_type, budget, timeline, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    email,
    phone,
    location,
    projectType,
    budget,
    timeline,
    message,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("Error saving contact:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to save contact enquiry",
      });
    }

    res.status(201).json({
      success: true,
      message: "Contact enquiry submitted successfully!",
      contactId: result.insertId,
    });
  });
});

module.exports = router;