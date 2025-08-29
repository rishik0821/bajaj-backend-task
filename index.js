// Entry point for the application
console.log("Hello, World!");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Constants - YOUR PERSONAL INFO
const USER_INFO = {
  user_id: "sai_rishik_21082005",
  email: "sairishik589@gmail.com",
  roll_number: "22BCE7710",
};

// Helper Functions
const isNumber = (str) => {
  return !isNaN(str) && !isNaN(parseFloat(str));
};

const isAlphabet = (str) => {
  // Check if string contains only alphabets (can be multiple letters)
  return /^[a-zA-Z]+$/.test(str);
};

const isSpecialCharacter = (str) => {
  // If it's not a number and not alphabets, it's a special character
  return !isNumber(str) && !isAlphabet(str);
};

const processArray = (data) => {
  const oddNumbers = [];
  const evenNumbers = [];
  const alphabets = [];
  const specialCharacters = [];
  let sum = 0;
  const allAlphabets = [];

  for (const item of data) {
    // Process numbers
    if (isNumber(item)) {
      const num = parseInt(item);
      sum += num;

      if (num % 2 === 0) {
        evenNumbers.push(item);
      } else {
        oddNumbers.push(item);
      }
    }
    // Process alphabets (single or multiple)
    else if (isAlphabet(item)) {
      const upperItem = item.toUpperCase();
      alphabets.push(upperItem);
      // Store all individual characters for concatenation
      allAlphabets.push(...item.split(""));
    }
    // Process special characters
    else if (isSpecialCharacter(item)) {
      specialCharacters.push(item);
    }
  }

  // Create reverse alternating caps concatenation
  let concatString = "";
  if (allAlphabets.length > 0) {
    const reversed = allAlphabets.reverse();
    concatString = reversed
      .map((char, index) => {
        return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
      })
      .join("");
  }

  return {
    oddNumbers,
    evenNumbers,
    alphabets,
    specialCharacters,
    sum: sum.toString(), // Convert sum to string as per requirement
    concatString,
  };
};

// Routes

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "BFHL API is running!",
    endpoints: {
      POST: "/bfhl",
      GET: "/bfhl",
    },
    author: USER_INFO.user_id,
  });
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// POST endpoint - Main logic
app.post("/bfhl", (req, res) => {
  try {
    // Input validation
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        is_success: false,
        error: "Missing 'data' field in request body",
      });
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "'data' must be an array",
      });
    }

    if (data.length === 0) {
      return res.status(400).json({
        is_success: false,
        error: "'data' array cannot be empty",
      });
    }

    // Process the array
    const result = processArray(data);

    // Build response
    const response = {
      is_success: true,
      user_id: USER_INFO.user_id,
      email: USER_INFO.email,
      roll_number: USER_INFO.roll_number,
      odd_numbers: result.oddNumbers,
      even_numbers: result.evenNumbers,
      alphabets: result.alphabets,
      special_characters: result.specialCharacters,
      sum: result.sum,
      concat_string: result.concatString,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Endpoint not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    error: "Something went wrong!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test locally at: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
