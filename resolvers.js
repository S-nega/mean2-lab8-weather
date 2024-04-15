const resolvers = {
    Query: {
      getWeatherByCityName: async (_, { cityName }, { dataSources }) => {
        try {
          const weatherData = await dataSources.weatherAPI.getWeatherByCityName(cityName);
          return weatherData;
        } catch (error) {
          console.error('Error getting weather data:', error);
          throw new Error('Failed to fetch weather data');
        }
      },
    },
  };

  
  module.exports = resolvers;