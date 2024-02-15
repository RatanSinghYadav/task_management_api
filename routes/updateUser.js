const { validationResult } = require("express-validator");
const users = require("../models/user");

const updateUserDetail = async (req, res) => {
    try {
      // Retrieve user details from request
      const id = req.userId;
  
      const { fname, lname, email, number, currentLocation } = req.body;
  
      // Additional validation using express-validator
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(422).json({ errors: validationErrors.array(), success: false });
      }
  
      // Update user details in the database
      const updatedUser = await users.findByIdAndUpdate(
        id,
        {
          fname,
          lname,
          email,
          number,
          currentLocation,
        },
        { new: true }
      );
      // await updatedUser.save();
  
      // Check if the user was updated successfully
      if (!updatedUser) {
        return res.status(404).json({ error: 'User or UserDetail not found', success: false });
      }
  
      // Return the updated user profile
      res.json({ user: updatedUser, message: "user update successfully", success: true });
    } catch (error) {
      console.error('Error in uploading:', error);
      res.status(500).json({ error: 'Internal Server Error', success: false });
    }
  };


  module.exports = updateUserDetail;