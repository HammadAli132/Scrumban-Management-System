const User = require("../models/user.js");

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

async function initDB() {
    try {
        // clear existing data first 
        await User.deleteMany({});

        // creating dummy users
        const users = await User.insertMany(dummyUsers);
        console.log('Users created successfully:', users);
    } catch (error) {
        console.error('Error during database initialization:', error);
        throw error;
    }
}