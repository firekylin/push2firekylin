var request = require('request');
var PasswordHash = require('phpass').PasswordHash;
var passwordHash = new PasswordHash();
request.defaults({
  strictSSL: false,
  rejectUnauthorized: false
});

var req = {
  get: function(url) {
    return new Promise(function(resolve, reject) {
      request.get(url, function(err, res, body) {
        err ? reject(err) : resolve(body);
      });
    });
  },
  post: function(obj) {
    return new Promise(function(resolve, reject) {
      request.post(obj, function(err, res, body) {
        err ? reject(err) : resolve(body);
      });
    })
  }
}

function push2Firekylin(url, app_key, app_secret) {
  this.url = url;
  this.app_key = app_key;
  this.app_secret = app_secret;
}

push2Firekylin.prototype.authorize = function() {
  var auth_key = passwordHash.hashPassword(this.app_secret + 'Firekylin');
  return req.get(this.url + '/admin/post_push?app_key=' + this.app_key + '&auth_key=' + auth_key );
}

push2Firekylin.prototype.push = function(post) {
  if(!post.title || !post.pathname || !post.markdown_content ) {
    return Promise.reject('title, pathname, markdown_content 三字段必须完整');
  }
  if( !post.status ) {
    post.status = 3;
  }
  
  post.app_key = this.app_key;
  post.auth_key = passwordHash.hashPassword(this.app_secret + post.markdown_content);
  return req.post({url: this.url + '/admin/post_push', form: post});
}
module.exports = push2Firekylin;
