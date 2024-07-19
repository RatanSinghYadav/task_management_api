const Tasks = require("../models/task.js");
const users = require("../models/user.js");
const User = require("../models/user.js");


const addTask = async (req, res) => {
    try {
        const Id = req.userId;
        const { title, deptName, deptNumber, deptEmail, assignedTo, descriptions, priority,remark, status, startDate, dueDate } = req.body;

        // console.log(title, descriptions, priority, status, startDate, dueDate);

        const user = await User.findById({ _id: Id });

        const createTask = new Tasks({
            title: title,
            deptName: deptName,
            deptNumber: deptNumber,
            deptEmail: deptEmail,
            assignedTo: assignedTo,
            descriptions: descriptions,
            priority: priority,
            remark:remark,
            status: status,
            startDate: startDate,
            dueDate: dueDate,
            user: Id
        })

        const taskSaved = await createTask.save();


        await user.tasks.push(taskSaved._id);

        const updatedUser = await user.save();
        // console.log(updatedUser);

        res.status(201).json({ success: true, message: "task added successfyll!", updatedUser, taskSaved })

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ success: false, message: "error arive while adding task!", error: error });
    }
}

module.exports = addTask;