const { validationResult } = require("express-validator");
const Tasks = require("../models/task");
const { default: mongoose } = require("mongoose");

const editTaskDetail = async (req, res) => {
    try {
        const { id } = req.params;

        function isValidObjectId(id) {
            return mongoose.Types.ObjectId.isValid(id);
        }

        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format." });
        }

        const details = await Tasks.findById(id);

        // Check if the course with the given ID exists
        if (!details) {
            return res.status(404).json({ success: false, message: "Task not found." });
        }

        // console.log(details);

        res.status(200).json({ success: true, message: "Data found successfully", details });
    } catch (error) {
        console.error("Error while getting Task details:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

const updateTaskDetail = async (req, res) => {
    try {

        const { _id } = req.params;

        // console.log(_id)

        const { title, descriptions, status, priority } = req.body;
        
        console.log(title, descriptions, status, priority)

        // Additional validation using express-validator
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(422).json({ errors: validationErrors.array(), success: false });
        }

        // Update user details in the database
        const updateTask = await Tasks.findByIdAndUpdate(
            { _id: _id },
            {
                title: title,
                descriptions: descriptions,
                status: status,
                priority: priority,
            },
            { new: true }
        );
        // await updateTask.save(); 

        // Check if the user was updated successfully
        if (!updateTask) {
            return res.status(404).json({ error: 'task is not found', success: false });
        }

        // Return the updated user profile
        res.json({ updateTask, message: "task updated successfully", success: true });
    } catch (error) {
        console.error('Error in updating:', error);
        res.status(500).json({ error: 'Internal Server Error', success: false });
    }
};

module.exports = { editTaskDetail, updateTaskDetail };