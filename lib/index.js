'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _phpass = require('phpass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_request2.default.defaults({
  strictSSL: false,
  rejectUnauthorized: false
});
var passwordHash = new _phpass.PasswordHash();
var promiseRequestPost = function promiseRequestPost(obj) {
  return new _promise2.default(function (resolve, reject) {
    _request2.default.post(obj, function (err, res, body) {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
};
var promiseRequestGet = function promiseRequestGet(url) {
  return new _promise2.default(function (resolve, reject) {
    _request2.default.get(url, function (err, res, body) {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
};

var push2Firekylin = function () {
  function push2Firekylin(url, app_key, app_secret) {
    (0, _classCallCheck3.default)(this, push2Firekylin);

    this.url = url;
    this.app_key = app_key;
    this.app_secret = app_secret;
  }

  (0, _createClass3.default)(push2Firekylin, [{
    key: 'authorize',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var auth_key, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                auth_key = passwordHash.hashPassword(this.app_secret + 'Firekylin');
                _context.next = 3;
                return promiseRequestGet(this.url + '/admin/post_push?app_key=' + this.app_key + '&auth_key=' + auth_key).catch(function (err) {
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
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(post) {
        var _arr, _i, key, result;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
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
                post.app_key = this.app_key;
                post.auth_key = passwordHash.hashPassword('' + this.app_secret + post.markdown_content);
                _context2.next = 13;
                return promiseRequestPost({ url: this.url + '/admin/post_push', form: post }).catch(function (err) {
                  return console.log(err);
                });

              case 13:
                result = _context2.sent;
                return _context2.abrupt('return', result);

              case 15:
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
  return push2Firekylin;
}();

module.exports = push2Firekylin;