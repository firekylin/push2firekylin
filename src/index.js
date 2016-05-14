import request from 'request';
import {PasswordHash} from 'phpass';
request.defaults({
  strictSSL: false,
  rejectUnauthorized: false
});
let passwordHash = new PasswordHash();
let promiseRequestPost = function(obj) {
  return new Promise((resolve, reject) => {
    request.post(obj, (err, res, body) => {
      if(err) { reject(err); }
      resolve(body);
    });
  });
}
let promiseRequestGet = function(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if(err) { reject(err); }
      resolve(body);
    });
  });
}

export default class {
  constructor(url, app_key, app_secret) {
    this.url = url;
    this.app_key = app_key;
    this.app_secret = app_secret;
  }

  async apply() {
    let auth_key = this.auth_generator('Firekylin');
    let result = await promiseRequestGet(`${url}/admin/post_push?app_key=${this.app_key}&auth_key=${auth_key}`)
                  .catch(err => console.log(err));
    return result;
  }

  async push(post) {
    for(let key of ['status', 'title', 'pathname', 'markdown_content']) {
      if( !post[key] ) {
        return `缺少 post.${key}`;
      }
    }
    post.auth_key = this.auth_generator(post.markdown_content);
    let result = await promiseRequestPost({url: `${url}/admin/post_push`, form: post})
                        .catch(err => console.log(err));
    return result;
  }

  auth_generator(content) {
    return password.hashPassword(`${this.app_secret}${content}`);
  }
}
