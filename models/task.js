const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null
    },
    deptName: {
        type: String,
        default: null
    },
    deptNumber: {
        type: String,
        defalut: null
    },
    deptEmail: {
        type: String,
        default: null
    },
    assignedTo: {
        type: String,
        default: null 
    },
    descriptions: {
        type: String,
        default: null
    },
    startDate: {
        type: String,
        default: null
    },
    dueDate: {
        type: String,
        default: null
    },
    remark: {
        type: String,
        default: null
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    status: {
        type: String,
        enum: ['Start', 'Ongoing', 'Done', 'On hold', 'Cancel', 'Close'],
        default: 'Start'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},
    {
        timestamps: true
    }
)

const Tasks = new mongoose.model('tasks', taskSchema);

module.exports = Tasks;
