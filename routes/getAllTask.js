const Tasks = require("../models/task");
const Users = require("../models/user");

const getAllTasks = async (req, res) => {
    try {
        const id = req.userId;
        // console.log(id)

        const { page = 1, pageSize = 500, search } = req.query;

        let searchOptions = {};

        if (search) {
            searchOptions = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { descriptions: { $regex: search, $options: 'i' } }
                ]
            }
        }

        const user = await Users.findById({ _id: id });
        // console.log(usersTasks);

        const tasks = await Tasks.find({ ...searchOptions, _id: { $in: user.tasks } })
            .skip((page - 1) * pageSize)
            .limit(parseInt(pageSize))
            .select('title deptName deptNumber deptEmail assignedTo descriptions startDate dueDate priority status remark');


        const totalTasks = await Tasks.countDocuments(searchOptions);
        const pageCount = await Math.ceil(totalTasks / pageSize);

        res.status(200).json({
            success: true, message: "Data found successfully", tasks,
            pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalTasks,
                pageCount,
            },
        });

    } catch (error) {
        console.error("Error while getting all tasks:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

module.exports = getAllTasks;
