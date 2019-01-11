(function evaluate(require, module, exports, process, setImmediate, global, afterAll, afterEach, beforeAll, beforeEach, describe, it, test, expect, jest, __dirname, __filename) {"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _socket = _interopRequireDefault(require("socket.io-client"));

require("./styles.css");

var letters = _socket.default.connect('http://localhost:3000/letters');

letters.emit('join', 'lowercase');

var numbers = _socket.default.connect('http://localhost:3000/numbers');

numbers.emit('join', 'negative');

var App =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(App, _React$Component);

  function App(props) {
    var _this;

    (0, _classCallCheck2.default)(this, App);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));

    _this.showNumber = function (number) {
      _this.setState({
        number: number
      });
    };

    _this.showNegativeNumber = function (_number) {
      _this.setState({
        _number: _number
      });
    };

    _this.showLetter = function (letter) {
      _this.setState({
        letter: letter
      });
    };

    _this.showLowercaseLetter = function (_letter) {
      _this.setState({
        _letter: _letter
      });
    };

    numbers.on('number', _this.showNumber);
    numbers.on('_number', _this.showNegativeNumber);
    letters.on('letter', _this.showLetter);
    letters.on('_letter', _this.showLowercaseLetter);
    _this.state = {
      number: 0,
      _number: 0,
      letter: '',
      _letter: ''
    };
    return _this;
  }

  (0, _createClass2.default)(App, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement("h1", null, this.state.number, " / ", this.state._number), _react.default.createElement("h1", null), _react.default.createElement("h1", null, this.state.letter, " / ", this.state._letter));
    }
  }]);
  return App;
}
})