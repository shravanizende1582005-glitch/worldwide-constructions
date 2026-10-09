const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const db = require("../config/db");

// ======================================
// REGISTRATION
// ======================================
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required.",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long.",
    });
  }

  try {
    const checkSql = "SELECT id FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, results) => {
      if (err) {
        console.log("Error checking user:", err);

        return res.status(500).json({
          success: false,
          message: "Database error while checking account.",
        });
      }

      if (results.length > 0) {
        return res.status(409).json({
          success: false,
          message: "An account with this email already exists.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;

      db.query(
        insertSql,
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.log("Error creating account:", err);

            return res.status(500).json({
              success: false,
              message: "Failed to create account.",
            });
          }

          res.status(201).json({
            success: true,
            message: "Account created successfully!",
            userId: result.insertId,
          });
        }
      );
    });
  } catch (error) {
    console.log("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong during registration.",
    });
  }
});

// ======================================
// LOGIN
// ======================================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  const sql = `
    SELECT id, name, email, password, is_admin
    FROM users
    WHERE email = ?
  `;

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.log("Login database error:", err);

      return res.status(500).json({
        success: false,
        message: "Database error during login.",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = results[0];

    try {
      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Login successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.is_admin === 1,
        },
      });
    } catch (error) {
      console.log("Password verification error:", error);

      res.status(500).json({
        success: false,
        message: "Something went wrong during login.",
      });
    }
  });
});

module.exports = router;