const User = require("../models/user.js");
const ToDoList = require("../models/toDoList.js");
const ToDoListTask = require("../models/toDoListTask.js");

const dummyUsers = [
    {
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
        email: 'john.doe@example.com',
        image: 'https://example.com/images/johndoe.jpg'
    },
    {
        name: 'Jane Smith',
        username: 'janesmith',
        password: 'securepass456',
        email: 'jane.smith@example.com',
        image: 'https://example.com/images/janesmith.jpg'
    },
    {
        name: 'Alex Johnson',
        username: 'alexj',
        password: 'alexpass789',
        email: 'alex.johnson@example.com',
        image: 'https://example.com/images/alexj.jpg'
    },
    {
        name: 'Sarah Williams',
        username: 'sarahw',
        password: 'sarahpass321',
        email: 'sarah.williams@example.com',
        image: 'https://example.com/images/sarahw.jpg'
    },
    {
        name: 'Mike Brown',
        username: 'mikeb',
        password: 'mikepass654',
        email: 'mike.brown@example.com',
        image: 'https://example.com/images/mikeb.jpg'
    }
]

const dummyTasks = [
    {
        title: "Complete project proposal",
        description: "Finish writing the project proposal document and submit it",
        priorityLevel: "high",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        reminder: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        notes: "Check with team for any last-minute changes"
    },
    {
        title: "Buy groceries",
        description: "Milk, eggs, bread, fruits, and vegetables",
        priorityLevel: "medium",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        notes: "Don't forget the organic options"
    },
    {
        title: "Schedule dentist appointment",
        description: "Call Dr. Smith's office to schedule checkup",
        priorityLevel: "low",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: "completed"
    },
    {
        title: "Prepare for meeting",
        description: "Review presentation slides and prepare talking points",
        priorityLevel: "high",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        notes: "Focus on Q3 results and projections"
    },
    {
        title: "Exercise",
        description: "30-minute run in the park",
        priorityLevel: "medium",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        reminder: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
        inTrash: true
    }
]

async function initDB() {
    try {
        // clear existing data first 
        await User.deleteMany({});
        await ToDoList.deleteMany({});
        await ToDoListTask.deleteMany({});

        // creating dummy users
        const users = await User.insertMany(dummyUsers);
        // console.log('Users created successfully:', users);

        // creating todo list for each user
        const todoLists = [];
        for (const user of users) {
            const todoList = await ToDoList.create({ userId: user._id });
            todoLists.push(todoList);
        }
        // console.log('Todo lists created successfully', todoLists);

        // creating tasks for each todo list
        const tasks = [];
        for (let i = 0; i < todoLists.length; i++) {
            const todoList = todoLists[i];
            
            // Create a task for each todo list
            const taskData = {
                ...dummyTasks[i],
                toDoListId: todoList._id
            };
            
            const task = await ToDoListTask.create(taskData);
            tasks.push(task);
        }
        // console.log('Tasks created successfully', tasks);
    } catch (error) {
        console.error('Error during database initialization:', error);
        throw error;
    }
};

module.exports = { initDB };