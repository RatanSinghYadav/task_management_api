const { default: mongoose } = require("mongoose");
const Tasks = require("../models/task");

const getTaskDetail = async (req, res) => {
    try {
        const { id } = req.params;

        function isValidObjectId(id) {
            return mongoose.Types.ObjectId.isValid(id);
        }

        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format." });
        }

        const details = await Tasks.findById(id);

        
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

module.exports = getTaskDetail;