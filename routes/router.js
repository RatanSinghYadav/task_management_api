const { Router } = require("express");
const route = Router();
const userLogin = require("./userAuth/login");
const userSignup = require("./userAuth/signup");
const fetchUser = require("../middleware/fetchUserFromToken");
const verifiedUser = require("../controllers/verifyUser");
const addTask = require("./addTask");
const getAllTasks = require("./getAllTask");
const getTaskDetail = require("./getTaskDetails");
const deleteTask = require("./deleteTasks");
const { editTaskDetail, updateTaskDetail } = require("./editTask");
const updateUserDetail = require("./updateUser");
const getPublicTask = require("./publicTasks");

//  verification route
route.post('/verifyuser', fetchUser, verifiedUser);

// Auth routes
route.post('/api/v1/user/login', userLogin);
route.post('/api/v1/user/signup', userSignup);

route.post('/api/v1/user/addTask', fetchUser, addTask);
route.post('/api/v1/user/updateUser', fetchUser, updateUserDetail);
route.get('/api/v1/user/getTasks', fetchUser, getAllTasks);
route.get('/api/v1/user/tasks/delete/:id', fetchUser, deleteTask);
route.get('/api/v1/user/tasks/edit/:id', fetchUser, editTaskDetail);
route.post('/api/v1/user/tasks/update/:_id', fetchUser, updateTaskDetail);

route.get('/api/v1/user/getTaskDetail/:id', fetchUser, getTaskDetail);
route.get('/api/v1/user/getTasks', fetchUser, getAllTasks);

route.get('/api/v1/public/getTaskDetail/:id', getTaskDetail);
route.get('/api/v1/public/getTasks', getPublicTask);

module.exports = route;


