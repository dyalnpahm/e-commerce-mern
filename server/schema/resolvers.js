const { AuthenticationError } = require ('apollo-server-express');
const {User, Product, Category, Order} = require('../models');
const { signToken } = require ('../utils/auth');
const stripe = require ('stripe')('sk_test_51N4I0bGpCDQTXt0mTk0mC0A9pMWAT5pFtOijDHPOM7pQx7kInvDXQNarIZZemEnKao7O8PDZGYNcCC1mnH1Dwk8b00BfVAslcl');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();

        },
        products: async (parents, { category, name}) => {
            const params = {};

            if (category) {
                params.category = category;

            }
            if (name){
                params.name = {
                    $regex:name
                };
            }
        return await Product.find(params).populate('category');
        },
        product: async (parent, {_id}) => {
            return await Product.findbyId(_id).populate('category');


        },
        user: async (parent, args, context) => {
            if (context.user){
                const user = await User.findbyId(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });
                user.orders.sort((a,b) => b.orderDate - a.orderDate);
                return user;
            }
            throw new AuthenticationError('Not logged in');

        },

    checkout: async (parent,args, context) => {
        const url= new URL(context.headers.referer).origin;
        const order= new Order({products:args.products});
        const line_items= [];

        const { products } = await order.populate('products');

        for(let i = 0; i < products.length; i++) {
            const product = await stripe.products.create({
                name:products[i].name,
                description: products[i].description,
                images: [`${url}/images/${products[i].image}`]
            });
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: products[i].price * 100,
                currency: 'aud',

            });

        line_items.push({
            price: price.id,
            quantity: 1
        });
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
    });

    return{session:session.id};
    }
},
Mutation: {
    addUser: async (parent,args) => {
        const user = await User.create (args);
        const token = signToken(user);

        return{ token, user} ;

    },

    addOrder: async (parent, { products }, context) => {
        console.log (context);
        if (context.user) {
            const order = new Order ({products});
            await User.findByIdAndUpdate(context.user._id, { $push: {orders: order} });
       return order;
        }
        throw new AuthenticationError('Not logged in');
    },
    updateProduct : async (parent, {_id, quantity}) => {
        const decrement = Maths.abs(quantity) * -1;
        return await Product.findByIdAndUpdate(_id, {$inc:{ quantity: decrement}}, {new: true});
    },
    login: async (parent, {email, password}) => {
        const user = await User.findOne ({email});
        if (!user){
            throw new AuthenticationError('Incorrect login');
        }
        const correctPw = await user.isCorrectPassword(password);
        
        if (!correctPw) {
            throw new AuthenticationError('Incorrect login');
            
        }
        const token = signToken(user);
        return{ token, user };
        
    }
    }
};

module.exports = resolvers;



        

          
