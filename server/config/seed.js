const connectDB = require ('./connection');
const {User, Product, Category } = require('../models');


connectDB.once ('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        {name: "Diver's Watches"},
        {name: "Dress Watches"},
        {name: "Women Watches"},
        {name: "Smart Watches"},
        {name: "Luxury Watches"}
        
    ]);

    console.log('categories seed');

    await Product.deleteMany();

    const products = await Product.insertMany([
    {
        name: 'G-shock CasiOak GA2100-1A1',
        description: 'The case is made of fine resin embedded with carbon fibers for outstanding strength, crack resistance, and durability.',
        image: 'casioak.jpg',
        category: categories[0]._id,
        price: 269.00,
        quantity: 10
    },
    {
        name: 'Seiko Prospex KingTurtle SRPE03K',
        description: 'The King Turtle named by fans comes with sapphire cyrstal glass with a day/date display.',
        image: 'Kingturtle.jpg',
        category: categories[0]._id,
        price: 999.00,
        quantity: 10
    },
    {
        name: 'Citizen Promaster BN0157-02E',
        description: 'Powered by light, featuring a one way rotating elapsed time bezel and screw down crown.',
        image: 'promaster.jpg',
        category: categories[0]._id,
        price: 599.00,
        quantity: 10
    },
    {
        name: 'Seiko Presage Cocktail Mockingbird SRPD37J',
        description: 'Automatic watch that combines Japanese aethetics with traditional craftsmanship.',
        image: 'mockingbird.jpg',
        category: categories[1]._id,
        price: 699.00,
        quantity: 10

    },
    {
        name: 'Timex Waterbury Legacy Watch TW2V17800',
        description: 'The Waterbury Legacy is a modern update to a classic Timex watch.',
        image: 'waterbury.jpg',
        category: categories[1]._id,
        price:  349.00,
        quantity: 10
    },
    {
        name: 'Bulova Classic Aerojet Automatic',
        description: 'Aerojet features a stainless-steel case with a crown at the two o’clock position.',
        image: 'classicaerojet.jpg',
        category: categories[1]._id,
        price: 659.00,
        quantity: 10
    },
    {
        name: 'Paul Hewitt Modest White Sand RG Mesh Watch',
        description: 'Simple white dial combined with a mesh watch strap for a discreet modest look',
        image: 'modest.jpg',
        category: categories[2]._id,
        price: 249.00,
        quantity: 10    
    },
    {
        name: 'Daniel Wellington Petite 28mm Ashfield',
        description: 'Ultra thin watch featuring a matte black mesh strap and sophisiticated black dial',
        image: 'ashfield.jpg',
        category: categories[2]._id,
        price: 259.00,
        quantity: 10
    },
    {
        name: 'Sekonda Red Active SmartWatch SK1910',
        description: 'Features a 1.3 inch full colour display, heart rate monitor, pedometer, sleep tracker and more.',
        image: 'redactive.jpg',
        category: categories[3]._id,
        price: 249.00,
        quantity: 10
    },
    {
        name: 'Reflex Active Pink Crystal Smart Watch RA06-2098',
        description: 'Sleek design featuring heart rate monitor, music control.',
        image: 'pinkcrystal.jpg',
        category: categories[3]._id,
        price: 140.00,
        quantity: 10
    },
    {
        name: 'Frederique Constant Classic Business Timer FC-270SW4P6',
        description: 'Offers a 40mm case diameter in stainless steel as well as quartz caliber with day, date, week number and moonphase.',
        image: 'classic.jpg',
        category: categories[4]._id,
        price: 1595.00,
        quantity: 1
    },
    {
        name: 'Frederique Constant Classic Index Automatic',
        description: 'classical and refined time piece of exceptional value.',
        image: 'index.jpg',
        category: categories[4]._id,
    },
]);
console.log('products seeded');

await User.deleteMany();

await User.create({
    firstName: 'Dylan',
    lastName: 'Pham',
    email: 'dyalnpahm@gmail.com',
    password: 'password123',
    orders: [
        {
            products: [products[0]._id, products[0]._id, products[1]._id]
        }
    ]
});

await User.create ({
    firstName: 'May',
    lastName: 'Carelton',
    email:'mayc12@testmail.com',
    password: 'password123',
});
console.log('users seed');

process.exit();

});

