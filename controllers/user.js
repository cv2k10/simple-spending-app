const User = require('../models/user');

exports.signup = (req, res) => {
  res.render('signup');
};

exports.postUser = (req, res) => {
  const user = new User(req.body);
                        
  user.save()
  .then(u => {
    res.redirect('/spending');
  })
  .catch( err => {
    console.error(err);
    res.render('signup', {error: err});
  });                        
  
};

exports.showUser = (req, res) => {
  User.findOne({_id: req.params.id})
  .then((user) => {
    res.render('showUser', {user});
  })
  .catch((err) => console.error(err))
}