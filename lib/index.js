'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _phpass = require('phpass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_request2.default.defaults({
  strictSSL: false,
  rejectUnauthorized: false
});
var passwordHash = new _phpass.PasswordHash();
var promiseRequestPost = function promiseRequestPost(obj) {
  return new Promise(function (resolve, reject) {
    _request2.default.post(obj, function (err, res, body) {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
};
var promiseRequestGet = function promiseRequestGet(url) {
  return new Promise(function (resolve, reject) {
    _request2.default.get(url, function (err, res, body) {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
};

var _class = function () {
  function _class(url, app_key, app_secret) {
    _classCallCheck(this, _class);

    this.url = url;
    this.app_key = app_key;
    this.app_secret = app_secret;
  }

  _createClass(_class, [{
    key: 'authorize',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var auth_key, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                auth_key = passwordHash.hashPassword(this.app_secret + 'Firekylin');
                _context.next = 3;
                return promiseRequestGet(url + '/admin/post_push?app_key=' + this.app_key + '&auth_key=' + auth_key).catch(function (err) {
                  return console.log(err);
                });

              case 3:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function authorize() {
        return ref.apply(this, arguments);
      }

      return authorize;
    }()
  }, {
    key: 'push',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(post) {
        var _arr, _i, key, result;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _arr = ['status', 'title', 'pathname', 'markdown_content'];
                _i = 0;

              case 2:
                if (!(_i < _arr.length)) {
                  _context2.next = 9;
                  break;
                }

                key = _arr[_i];

                if (post[key]) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', '缺少 post.' + key);

              case 6:
                _i++;
                _context2.next = 2;
                break;

              case 9:
                post.auth_key = passwordHash.hashPassword('' + this.app_secret + post.markdown_content);
                _context2.next = 12;
                return promiseRequestPost({ url: url + '/admin/post_push', form: post }).catch(function (err) {
                  return console.log(err);
                });

              case 12:
                result = _context2.sent;
                return _context2.abrupt('return', result);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function push(_x) {
        return ref.apply(this, arguments);
      }

      return push;
    }()
  }]);

  return _class;
}();

exports.default = _class;