var geetest = require('./index')('50ed17103f109ccf7c25e93cb6e0d378', 'a0ec7ce42d4291382bfc9ca488313b80', 'http://api.geetest.com/');
//My example key/id, used for test only;

geetest.register(function(e) {
  if(e) {
    console.log(e);
  }
  else {
    console.log('fail to reach the server')
  }
});