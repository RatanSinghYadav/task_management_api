const Tasks = require("../models/task");

const getPublicTask = async (req, res) => {
    try {

        const { page = 1, pageSize = 50, search } = req.query;

        let searchOptions = {};

        if (search) {
            searchOptions = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { descriptions: { $regex: search, $options: 'i' } }
                ]
            }
        }

        

        const tasks = await Tasks.find({ ...searchOptions }).skip((page - 1) * pageSize).limit(parseInt(pageSize))
        // console.log(tasks)
        const reverseTasks = tasks.reverse();

        const totalTasks = await Tasks.countDocuments(searchOptions);
        const pageCount = await Math.ceil(totalTasks / pageSize);

        res.status(200).json({
            success: true, message: "Data found successfully", reverseTasks,
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

module.exports = getPublicTask;