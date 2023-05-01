const Meals = require('./meals.modal');
const Orders = require('./orders.modal');
const Restaurants = require('./restaurants.modal');
const Reviews = require('./reviews.modal');
const User = require('./user.modal');

const initModel = () => {
  User.hasMany(Orders);
  Orders.belongsTo(User);

  User.hasMany(Reviews);
  Reviews.belongsTo(User);

  Meals.hasMany(Orders);
  Orders.belongsTo(Meals);

  Restaurants.hasMany(Meals);
  Meals.belongsTo(Restaurants);

  Restaurants.hasMany(Reviews);
  Reviews.belongsTo(Restaurants);
};

module.exports = initModel;
