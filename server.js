// const http = require('http');
// const OpenApiValidator = require('express-openapi-validator'); 
// const { ApolloServer, gql } = require('apollo-server-express');
// const typeDefs = require('./weather-schema.gql');
// const resolvers = require('./resolvers');

const express = require('express');
const axios = require('axios');

var path = require('path');
const mongoose = require('mongoose');
const weatherRouter = require('./routes/api/weather')
const cors = require('cors');

const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getWeatherByCityName(cityName: String!): Weather
  }

  type Weather {
    cityName: String!
    temperature: Float!
    description: String!
  }
`;

const resolvers = {
  Query: {
    getWeatherByCityName: async (_, { cityName }) => {
      try {
        console.log("server.js resolves");
        const API_KEY = 'a3a57c49760152eb5e48acf5527cc76c'
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        const weatherData = response.data;
        return {
          cityName: weatherData.name,
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
        };
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // throw new Error('Failed to fetch weather data');
      }
    },
  },
};

const app = express();
app.use(cors()); //Разрешение на cors
app.use('/api', weatherRouter);

async function startApolloServer() {
  console.log("Apolloserver");
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
module.exports = app;