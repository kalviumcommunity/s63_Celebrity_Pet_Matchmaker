const sequelize = require('./database');
const User = require('./models/User');
const Entity = require('./models/Entity');

async function seedDatabase() {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
        { name: 'Alice', email: 'alice@example.com', age: 28 },
        { name: 'Bob', email: 'bob@example.com', age: 30 },
        { name: 'Charlie', email: 'charlie@example.com', age: 25 },
    ]);

    await Entity.bulkCreate([
        { name: 'Entity 1', created_by: users[0].id },
        { name: 'Entity 2', created_by: users[1].id },
        { name: 'Entity 3', created_by: users[2].id },
        { name: 'Entity 4', created_by: users[0].id },
    ]);

    console.log('Database seeded successfully.');
    process.exit();
}

seedDatabase();
