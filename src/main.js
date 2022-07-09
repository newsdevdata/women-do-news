/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getJSON = __webpack_require__(1);

var _getJSON2 = _interopRequireDefault(_getJSON);

var _dom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
window.onResize = function (width) {
  console.log(width);
};

window.enterView = function (msg) {
  console.log('enter-view', msg);
};

var renderLink = function renderLink(link) {
  return '<a href=' + link + ' target=\'_blank\' rel=\'noopener noreferrer\'>Click here to edit on Wikipedia</a>';
};

function displayTable(err, res) {
  if (err) {
    throw err;
  } else {
    var data = res.data;


    var filteredData = data.filter(function (d) {
      return d['Needs article'] === 'TRUE';
    });
    var table = (0, _dom.select)('#my-table');

    var tableHeaders = ['Name of journalist', 'Claimed by', 'Link to edit'];

    var obj = {
      headings: tableHeaders,
      data: []
    };

    filteredData.forEach(function (row) {
      var outRow = tableHeaders.map(function (k) {
        return row[k];
      });
      obj.data.push(outRow);
    });

    console.log(obj);

    new simpleDatatables.DataTable(table, { // eslint-disable-line no-new
      data: obj,
      columns: [{ select: 2, render: renderLink }]
    });
  }
}

(0, _getJSON2.default)('assets/data.json', displayTable);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable */
var getJSON = function getJSON(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      callback(null, data);
    } else {
      // We reached our target server, but it returned an error
      callback(request.responseText, null);
    }
  };

  request.onerror = function () {
    callback(request.responseText, null);
  };

  request.send();
};

exports.default = getJSON;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// DOM helper functions

// private
var selectionToArray = function selectionToArray(selection) {
  var len = selection.length;
  var result = [];
  for (var i = 0; i < len; i += 1) {
    result.push(selection[i]);
  }
  return result;
};

// public
var select = function select(selector) {
  return document.querySelector(selector);
};

var selectAll = function selectAll(selector) {
  return selectionToArray(document.querySelectorAll(selector));
};

var find = function find(el, selector) {
  return selectionToArray(el.querySelectorAll(selector));
};

var removeClass = function removeClass(el, className) {
  return el.classList.remove(className);
};

var addClass = function addClass(el, className) {
  return el.classList.add(className);
};

var hasClass = function hasClass(el, className) {
  return el.classList.contains(className);
};

var jumpTo = function jumpTo(el) {
  if (document.body.scrollTop) document.body.scrollTop = el.offsetTop + 1;else document.documentElement.scrollTop = el.offsetTop + 1;
};

exports.select = select;
exports.selectAll = selectAll;
exports.find = find;
exports.removeClass = removeClass;
exports.addClass = addClass;
exports.hasClass = hasClass;
exports.jumpTo = jumpTo;

/***/ })
/******/ ]);