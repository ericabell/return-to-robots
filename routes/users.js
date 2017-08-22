const express = require('express');
const data = require('../models/users');

let router = express.Router();

router.get('/', (req, res) => {
  res.render('directory', data);
});

router.get('/employed', (req, res) => {
  // get only the employed folks
  let employedUsers = data.users.filter( (user) => {
    console.log(user);
    if( user.job === null ) {
      // they are unemployed
      return false;
    }
    return true;
  });
  res.render('directory', {users: employedUsers});
})


module.exports = router;
