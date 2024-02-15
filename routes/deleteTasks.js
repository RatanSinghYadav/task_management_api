const Tasks = require("../models/task");
const users = require("../models/user");

const deleteTask = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const updateUser = await users.findByIdAndUpdate(userId, { $pull: { tasks: id } }, { new: true });

        const updateTask = await Tasks.findByIdAndDelete(id);


        res.status(201).json({ success: true, messsage: "updated Data successfully", updateUser, updateTask })

    } catch (error) {
        console.log("Error While deleting Task");
        res.status(401).json({ success: false, messsage: "task deletion failed!", error })
    }
}

module.exports = deleteTask; 