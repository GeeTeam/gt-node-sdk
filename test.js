var geetest = require('./index')('50ed17103f109ccf7c25e93cb6e0d378', 'a0ec7ce42d4291382bfc9ca488313b80', 'http://api.geetest.com/');
//My example key/id, used for test only;

geetest.register(function(err, challenge) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(challenge)

});