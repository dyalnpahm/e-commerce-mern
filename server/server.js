const express = require('express');
const {ApolloServer} = require ('apollo-server-express');
const path = require ('path');
const { authMiddleware } = require ('./utils/auth');


const { typeDefs, resolvers } = require('./schema');
const connectDB = require('./config/connection');
const { config } = require('process');
const PORT = process.env.PORT || 3000;
const app = express ();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    
    connectDB.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      })
    })
    };

    startApolloServer();

