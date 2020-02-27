const User = require('../models/user');
const Spending = require('../models/spending');

exports.spending = (req, res) => {
  User.find({})
  .then(users => {
    res.render('spending', {users});
  })
  .catch(err => {
    res.render('index');
  });
  
};

exports.postSpending = (req, res) => {
  const { place, amount, userid } = req.body;
  console.log('place ' + place);
  console.log('amount ' + amount);
  console.log('user ' + userid);
  
  let selectedUser;
  User.findOne({_id: userid})
  .then(user => user)
  .then((user) => {
    return Spending.create(
      { place, amount, user }
    )
  })
  .then( sp => {
      res.render('spendingList', { spending: sp }); 
    }
  )
  .catch(err => {
    console.error(err);
  }); 
};