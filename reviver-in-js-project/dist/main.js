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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@rebolon/json-reviver/src/accessor.js":
/*!************************************************************!*\
  !*** ./node_modules/@rebolon/json-reviver/src/accessor.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Accessor(prop, entity, values) {
    // use setter first, then the prop
    var setter = 'set' + (prop[0].toUpperCase() + prop.slice(1));
    var value = typeof values[prop] != 'undefined' ? values[prop] : values;
    if (entity.hasOwnProperty(setter)) {
        entity[setter](value);
    }
    else {
        entity[prop] = value;
    }
    return entity;
}
exports.Accessor = Accessor;
//# sourceMappingURL=accessor.js.map

/***/ }),

/***/ "./node_modules/@rebolon/json-reviver/src/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@rebolon/json-reviver/src/index.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var itemAbstractReviver_1 = __webpack_require__(/*! ./reviver/itemAbstractReviver */ "./node_modules/@rebolon/json-reviver/src/reviver/itemAbstractReviver.js");
exports.ItemAbstractReviver = itemAbstractReviver_1.ItemAbstractReviver;
var listAbstractReviver_1 = __webpack_require__(/*! ./reviver/listAbstractReviver */ "./node_modules/@rebolon/json-reviver/src/reviver/listAbstractReviver.js");
exports.ListAbstractReviver = listAbstractReviver_1.ListAbstractReviver;
var accessor_1 = __webpack_require__(/*! ./accessor */ "./node_modules/@rebolon/json-reviver/src/accessor.js");
exports.Accessor = accessor_1.Accessor;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@rebolon/json-reviver/src/reviver/AbstractReviver.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@rebolon/json-reviver/src/reviver/AbstractReviver.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var accessor_1 = __webpack_require__(/*! ../accessor */ "./node_modules/@rebolon/json-reviver/src/accessor.js");
var registry = [];
var propertyPath = [];
/**
 * @todo there is maybe a way to mutualize the 3 methods buildWith*
 *
 * Class AbstractReviver
 */
var AbstractReviver = /** @class */ (function () {
    function AbstractReviver() {
        /**
         * Default name of the id property
         * @var string
         */
        this.idProperty = 'id';
    }
    /**
     * main entry point
     * {@inheritdoc}
     */
    AbstractReviver.prototype.main = function (content) {
        if (!content) {
            return false;
        }
        var raw;
        try {
            var json = typeof content == 'string' ? JSON.parse(content) : content;
            raw = this.initFromJson(json, this.getNodeName());
        }
        catch (e) {
            throw e;
        }
        return raw;
    };
    /**
     * @inheritdoc
     */
    AbstractReviver.prototype.getIdProperty = function () {
        return this.idProperty;
    };
    /**
     * @param json
     * @return mixed
     * @throws RuntimeException
     * @throws \TypeError
     */
    AbstractReviver.prototype.buildEntity = function (json) {
        var entity = this.getNewEntity();
        this.buildWithEzProps(json, entity);
        this.buildWithManyRelProps(json, entity);
        this.buildWithOneRelProps(json, entity);
        return entity;
    };
    /**
     * Used for simple property that is not linked to other entities with relation like ManyTo OneTo...
     *
     * @param array json
     * @param EntityInterface entity
     * @return EntityInterface
     */
    AbstractReviver.prototype.buildWithEzProps = function (json, entity) {
        var ezProps = this.getEzPropsName();
        for (var _i = 0, ezProps_1 = ezProps; _i < ezProps_1.length; _i++) {
            var prop = ezProps_1[_i];
            if (!json.hasOwnProperty(prop)
                || json[prop] === null) {
                console.info("Unknown property " + prop + " for node " + this.getNodeName());
                continue;
            }
            accessor_1.Accessor(prop, entity, json);
        }
        return entity;
    };
    /**
     * @param array json
     * @param EntityInterface entity
     * @return EntityInterface
     * @throws RuntimeException
     */
    AbstractReviver.prototype.buildWithManyRelProps = function (json, entity) {
        var relManyProps = this.getManyRelPropsName();
        for (var prop in relManyProps) {
            if (!json.hasOwnProperty(prop)
                || json[prop] === null) {
                console.info("Unknown property " + prop + " for node " + this.getNodeName());
                continue;
            }
            var operationsInfo = relManyProps[prop];
            this.checkOperationsInfo(operationsInfo, 'getManyRelPropsName');
            var relations = operationsInfo['reviver'].initFromJson(json[prop], prop);
            // I don't fond a quick way to use the propertyAccessor so i keep this for instance
            var methodName = operationsInfo.hasOwnProperty('setter') ? operationsInfo['setter'] : null;
            for (var _i = 0, relations_1 = relations; _i < relations_1.length; _i++) {
                var relation = relations_1[_i];
                if (operationsInfo.hasOwnProperty('cb')) {
                    if (typeof operationsInfo['cb'] != 'function') {
                        throw new Error('cb in operations info must be callable (a function)');
                    }
                    operationsInfo['cb'](relation, entity);
                }
                if (methodName) {
                    // the setter is a function or just a prop name ?
                    if (typeof entity[methodName] == 'function') {
                        entity[methodName](relation);
                    }
                    else {
                        entity[methodName] = relation;
                    }
                }
                else {
                    try {
                        accessor_1.Accessor(prop, entity, relation);
                    }
                    catch (e) {
                        // @todo manage this with a log + a report to user with explanation on what have not been processed
                    }
                }
            }
        }
        return entity;
    };
    /**
     * @todo: if json is an object : creation, if it's a string : retreive the entity with doctrine and add it to entity
     *
     * @param array json
     * @param EntityInterface entity
     * @return EntityInterface
     *
     * @throws RuntimeException
     */
    AbstractReviver.prototype.buildWithOneRelProps = function (json, entity) {
        var oneRelProps = this.getOneRelPropsName();
        for (var prop in oneRelProps) {
            if (!json.hasOwnProperty(prop)
                || json[prop] === null) {
                console.info("Unknown property " + prop + " for node " + this.getNodeName());
                continue;
            }
            var operationsInfo = oneRelProps[prop];
            this.checkOperationsInfo(operationsInfo, 'getOneRelPropsName');
            var relation = operationsInfo['reviver'].initFromJson(json[prop], prop);
            var relationRegistered = this.useRegistry(relation, operationsInfo);
            if (operationsInfo.hasOwnProperty('setter')) {
                var methodName = operationsInfo['setter'];
                if (!entity.hasOwnProperty(methodName)) {
                    throw new Error("methodName (" + methodName + ") must exists in entity " + this.getNodeName());
                }
                entity[methodName](relationRegistered);
            }
            else {
                try {
                    accessor_1.Accessor(prop, entity, relationRegistered);
                }
                catch (e) {
                    // @todo manage this with a log + a report to user with explanation on what have not been processed
                }
            }
        }
        return entity;
    };
    /**
     * @param jsonOrArray
     * @return mixed
     * @throws ValidationException
     */
    AbstractReviver.prototype.checkJsonOrArray = function (jsonOrArray) {
        var json;
        try {
            json = typeof jsonOrArray == 'string' ? JSON.parse(jsonOrArray) : jsonOrArray;
            if (!json) {
                throw new Error;
            }
        }
        catch (e) {
            // to prevent ts2339 i cast Object into (<any>Object)
            var itemName = Object.values(propertyPath).pop();
            throw new Error("jsonOrArray for " + itemName + " must be a String or Array");
        }
        return json;
    };
    /**
     * @param operationsInfo
     * @param methodName
     * @throws RuntimeException
     */
    AbstractReviver.prototype.checkOperationsInfo = function (operationsInfo, methodName) {
        if (!operationsInfo.hasOwnProperty('reviver')) {
            throw new Error("Library *Reviver::{methodName} must return an associative array\n                 with the key as the Entity props name also used in HTTP Request Json node, and the value must contain\n                 an array with reviver key, and a setter if you don't want to use default propertyAccess");
        }
        // instanceof doesn't exists in typescript, so i just check the initFromJson
        if (typeof operationsInfo['reviver'] != 'object'
            || typeof operationsInfo['reviver'].initFromJson != 'function') {
            throw new Error('reviver should be an object that implements ReviverInterface');
        }
    };
    /**
     * @param relation
     * @param operationsInfo
     * @return mixed
     */
    AbstractReviver.prototype.useRegistry = function (relation, operationsInfo) {
        if (operationsInfo.hasOwnProperty('registryKey')) {
            if (!registry.hasOwnProperty(operationsInfo['registryKey'])) {
                registry[operationsInfo['registryKey']] = [];
            }
            var serialized = JSON.stringify(relation);
            if (registry[operationsInfo['registryKey']].hasOwnProperty(serialized)) {
                relation = registry[operationsInfo['registryKey']][serialized];
            }
            else {
                registry[operationsInfo['registryKey']][serialized] = relation;
            }
        }
        return relation;
    };
    /**
     * @return string
     */
    AbstractReviver.prototype.getPropertyPath = function () {
        var raw = propertyPath.join('.');
        return raw.replace('.[', '[');
    };
    /**
     * for ManyToMany reviver, they need to access it
     * @returns {Array<any>}
     */
    AbstractReviver.prototype.getPropertyPathContent = function () {
        return propertyPath;
    };
    return AbstractReviver;
}());
exports.AbstractReviver = AbstractReviver;
//# sourceMappingURL=AbstractReviver.js.map

/***/ }),

/***/ "./node_modules/@rebolon/json-reviver/src/reviver/itemAbstractReviver.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@rebolon/json-reviver/src/reviver/itemAbstractReviver.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractReviver_1 = __webpack_require__(/*! ./AbstractReviver */ "./node_modules/@rebolon/json-reviver/src/reviver/AbstractReviver.js");
/**
 * @todo there is maybe a way to mutualize the 3 methods buildWith*
 *
 * Class ItemAbstractReviver
 */
var ItemAbstractReviver = /** @class */ (function (_super) {
    __extends(ItemAbstractReviver, _super);
    function ItemAbstractReviver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    ItemAbstractReviver.prototype.initFromJson = function (jsonOrArray, propertyPathToAdd) {
        try {
            _super.prototype.getPropertyPathContent.call(this).push(propertyPathToAdd);
            var json = this.checkJsonOrArray(jsonOrArray);
            var entity = this.buildEntity(json);
            _super.prototype.getPropertyPathContent.call(this).pop();
            return entity;
        }
        catch (e) {
            throw e;
        }
    };
    return ItemAbstractReviver;
}(AbstractReviver_1.AbstractReviver));
exports.ItemAbstractReviver = ItemAbstractReviver;
//# sourceMappingURL=itemAbstractReviver.js.map

/***/ }),

/***/ "./node_modules/@rebolon/json-reviver/src/reviver/listAbstractReviver.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@rebolon/json-reviver/src/reviver/listAbstractReviver.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractReviver_1 = __webpack_require__(/*! ./AbstractReviver */ "./node_modules/@rebolon/json-reviver/src/reviver/AbstractReviver.js");
/**
 * @todo there is maybe a way to mutualize the 3 methods buildWith*
 *
 * Class ListAbstractReviver
 */
var ListAbstractReviver = /** @class */ (function (_super) {
    __extends(ListAbstractReviver, _super);
    function ListAbstractReviver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    ListAbstractReviver.prototype.initFromJson = function (jsonOrArray, propertyPathToAdd) {
        _super.prototype.getPropertyPathContent.call(this).push(propertyPathToAdd);
        var json = _super.prototype.checkJsonOrArray.call(this, jsonOrArray);
        // the API accept authors as one object or as an array of object, so i need to transform at least in one array
        var list = json;
        if (Object.prototype.toString.call(json) != '[object Array]') {
            list = [json];
        }
        var entities = [];
        try {
            for (var item in list) {
                _super.prototype.getPropertyPathContent.call(this)[_super.prototype.getPropertyPathContent.call(this).length] = '[' + entities.length + ']';
                entities.push(_super.prototype.buildEntity.call(this, list[item]));
                _super.prototype.getPropertyPathContent.call(this).pop();
            }
        }
        catch (e) {
            throw new Error("Wrong parameter to create new " + this.getNodeName() + ", have a look at node " + _super.prototype.getPropertyPath.call(this));
        }
        finally {
            _super.prototype.getPropertyPathContent.call(this).pop();
        }
        return entities;
    };
    return ListAbstractReviver;
}(AbstractReviver_1.AbstractReviver));
exports.ListAbstractReviver = ListAbstractReviver;
//# sourceMappingURL=listAbstractReviver.js.map

/***/ }),

/***/ "./src/entities/book.js":
/*!******************************!*\
  !*** ./src/entities/book.js ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = exports.Book = function () {
    function Book() {
        _classCallCheck(this, Book);

        this.id;
        this.title;
        this.description;
        this.indexInSerie;
        this.serie;
    }

    _createClass(Book, [{
        key: "setSerie",
        value: function setSerie(serie) {
            this.serie = serie;
        }
    }]);

    return Book;
}();

/***/ }),

/***/ "./src/entities/serie.js":
/*!*******************************!*\
  !*** ./src/entities/serie.js ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Serie = exports.Serie = function Serie() {
    _classCallCheck(this, Serie);

    this.id;
    this.name;
};

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _serieReviver = __webpack_require__(/*! ./reviver/serieReviver */ "./src/reviver/serieReviver.js");

var _bookReviver = __webpack_require__(/*! ./reviver/bookReviver */ "./src/reviver/bookReviver.js");

var oneBook = {
    "book": {
        "title": "Zombies in western culture",
        "serie": {
            "name": "Open Reports Series"
        }
    }
};

var serieReviver = new _serieReviver.SerieReviver();
var bookReviver = new _bookReviver.BookReviver(serieReviver);

// @todo the AbstractReviver should be able to auto-select the root node if
var book = bookReviver.main(oneBook.book);

console.log(book);

/***/ }),

/***/ "./src/reviver/bookReviver.js":
/*!************************************!*\
  !*** ./src/reviver/bookReviver.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BookReviver = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _book = __webpack_require__(/*! ../entities/book */ "./src/entities/book.js");

var _src = __webpack_require__(/*! @rebolon/json-reviver/src */ "./node_modules/@rebolon/json-reviver/src/index.js");

var _serieReviver = __webpack_require__(/*! ./serieReviver */ "./src/reviver/serieReviver.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BookReviver = exports.BookReviver = function (_ItemAbstractReviver) {
    _inherits(BookReviver, _ItemAbstractReviver);

    /**
     * @param {SerieReviver} serieReviver
     */
    function BookReviver(serieReviver) {
        _classCallCheck(this, BookReviver);

        var _this = _possibleConstructorReturn(this, (BookReviver.__proto__ || Object.getPrototypeOf(BookReviver)).call(this));

        _this.serieReviver = serieReviver;
        return _this;
    }

    /**
     *
     * @returns {string}
     */


    _createClass(BookReviver, [{
        key: "getNodeName",
        value: function getNodeName() {
            return 'book';
        }

        /**
         *
         * @returns {Object}
         */

    }, {
        key: "getNewEntity",
        value: function getNewEntity() {
            return new _book.Book();
        }

        /**
         * {@inheritdoc}
         * for this kind of json:
         * {
         *   "book": {
         *     "title": "The green lantern",
         *     "description": "Whatever you want",
         *     "index_in_serie": 15
         *   }
         * }
         */

    }, {
        key: "getEzPropsName",
        value: function getEzPropsName() {
            return ['id', 'title', 'description', 'indexInSerie'];
        }

        /**
         * {@inheritdoc}
         */

    }, {
        key: "getManyRelPropsName",
        value: function getManyRelPropsName() {
            return [];
        }

        /**
         * {@inheritdoc}
         *
         * registryKey could be used if we create an endpoint that allow batch POST/PUT of book with embedded serie
         */

    }, {
        key: "getOneRelPropsName",
        value: function getOneRelPropsName() {
            return {
                'serie': {
                    'reviver': this.serieReviver,
                    'registryKey': 'serie'
                }
            };
        }
    }]);

    return BookReviver;
}(_src.ItemAbstractReviver);

/***/ }),

/***/ "./src/reviver/serieReviver.js":
/*!*************************************!*\
  !*** ./src/reviver/serieReviver.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SerieReviver = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _serie = __webpack_require__(/*! ../entities/serie */ "./src/entities/serie.js");

var _src = __webpack_require__(/*! @rebolon/json-reviver/src */ "./node_modules/@rebolon/json-reviver/src/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SerieReviver = exports.SerieReviver = function (_ItemAbstractReviver) {
    _inherits(SerieReviver, _ItemAbstractReviver);

    function SerieReviver() {
        _classCallCheck(this, SerieReviver);

        return _possibleConstructorReturn(this, (SerieReviver.__proto__ || Object.getPrototypeOf(SerieReviver)).apply(this, arguments));
    }

    _createClass(SerieReviver, [{
        key: 'getNodeName',

        /**
         *
         * @returns {string}
         */
        value: function getNodeName() {
            return 'serie';
        }

        /**
         *
         * @returns {Object}
         */

    }, {
        key: 'getNewEntity',
        value: function getNewEntity() {
            return new _serie.Serie();
        }

        /**
         * {@inheritdoc}
         * for this kind of json:
         * {
         *   "serie": {
         *     "name": "The serie name"
         *   }
         * }
         */

    }, {
        key: 'getEzPropsName',
        value: function getEzPropsName() {
            return ['id', 'name'];
        }

        /**
         * {@inheritdoc}
         */

    }, {
        key: 'getManyRelPropsName',
        value: function getManyRelPropsName() {
            // for instance i don't want to allow the creation of a serie with all embeded books, this is not a usual way of working
            // that's why i don't add books here
            return {};
        }

        /**
         * {@inheritdoc}
         */

    }, {
        key: 'getOneRelPropsName',
        value: function getOneRelPropsName() {
            return {};
        }
    }]);

    return SerieReviver;
}(_src.ItemAbstractReviver);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjQzNzk0YTNjNzY4NjYzYjRhNzkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZWJvbG9uL2pzb24tcmV2aXZlci9zcmMvYWNjZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZWJvbG9uL2pzb24tcmV2aXZlci9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZWJvbG9uL2pzb24tcmV2aXZlci9zcmMvcmV2aXZlci9BYnN0cmFjdFJldml2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZWJvbG9uL2pzb24tcmV2aXZlci9zcmMvcmV2aXZlci9pdGVtQWJzdHJhY3RSZXZpdmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVib2xvbi9qc29uLXJldml2ZXIvc3JjL3Jldml2ZXIvbGlzdEFic3RyYWN0UmV2aXZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvYm9vay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvc2VyaWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jldml2ZXIvYm9va1Jldml2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jldml2ZXIvc2VyaWVSZXZpdmVyLmpzIl0sIm5hbWVzIjpbIkJvb2siLCJpZCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJpbmRleEluU2VyaWUiLCJzZXJpZSIsIlNlcmllIiwibmFtZSIsIm9uZUJvb2siLCJzZXJpZVJldml2ZXIiLCJib29rUmV2aXZlciIsImJvb2siLCJtYWluIiwiY29uc29sZSIsImxvZyIsIkJvb2tSZXZpdmVyIiwiU2VyaWVSZXZpdmVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQSxtQkFBTyxFQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs2Q0FJQTtBQUNJLG1CQUFPLEVBQVA7QUFDSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI0Mzc5NGEzYzc2ODY2M2I0YTc5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBBY2Nlc3Nvcihwcm9wLCBlbnRpdHksIHZhbHVlcykge1xuICAgIC8vIHVzZSBzZXR0ZXIgZmlyc3QsIHRoZW4gdGhlIHByb3BcbiAgICB2YXIgc2V0dGVyID0gJ3NldCcgKyAocHJvcFswXS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKSk7XG4gICAgdmFyIHZhbHVlID0gdHlwZW9mIHZhbHVlc1twcm9wXSAhPSAndW5kZWZpbmVkJyA/IHZhbHVlc1twcm9wXSA6IHZhbHVlcztcbiAgICBpZiAoZW50aXR5Lmhhc093blByb3BlcnR5KHNldHRlcikpIHtcbiAgICAgICAgZW50aXR5W3NldHRlcl0odmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZW50aXR5W3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBlbnRpdHk7XG59XG5leHBvcnRzLkFjY2Vzc29yID0gQWNjZXNzb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hY2Nlc3Nvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AcmVib2xvbi9qc29uLXJldml2ZXIvc3JjL2FjY2Vzc29yLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AcmVib2xvbi9qc29uLXJldml2ZXIvc3JjL2FjY2Vzc29yLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGl0ZW1BYnN0cmFjdFJldml2ZXJfMSA9IHJlcXVpcmUoXCIuL3Jldml2ZXIvaXRlbUFic3RyYWN0UmV2aXZlclwiKTtcbmV4cG9ydHMuSXRlbUFic3RyYWN0UmV2aXZlciA9IGl0ZW1BYnN0cmFjdFJldml2ZXJfMS5JdGVtQWJzdHJhY3RSZXZpdmVyO1xudmFyIGxpc3RBYnN0cmFjdFJldml2ZXJfMSA9IHJlcXVpcmUoXCIuL3Jldml2ZXIvbGlzdEFic3RyYWN0UmV2aXZlclwiKTtcbmV4cG9ydHMuTGlzdEFic3RyYWN0UmV2aXZlciA9IGxpc3RBYnN0cmFjdFJldml2ZXJfMS5MaXN0QWJzdHJhY3RSZXZpdmVyO1xudmFyIGFjY2Vzc29yXzEgPSByZXF1aXJlKFwiLi9hY2Nlc3NvclwiKTtcbmV4cG9ydHMuQWNjZXNzb3IgPSBhY2Nlc3Nvcl8xLkFjY2Vzc29yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHJlYm9sb24vanNvbi1yZXZpdmVyL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQHJlYm9sb24vanNvbi1yZXZpdmVyL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhY2Nlc3Nvcl8xID0gcmVxdWlyZShcIi4uL2FjY2Vzc29yXCIpO1xudmFyIHJlZ2lzdHJ5ID0gW107XG52YXIgcHJvcGVydHlQYXRoID0gW107XG4vKipcbiAqIEB0b2RvIHRoZXJlIGlzIG1heWJlIGEgd2F5IHRvIG11dHVhbGl6ZSB0aGUgMyBtZXRob2RzIGJ1aWxkV2l0aCpcbiAqXG4gKiBDbGFzcyBBYnN0cmFjdFJldml2ZXJcbiAqL1xudmFyIEFic3RyYWN0UmV2aXZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBYnN0cmFjdFJldml2ZXIoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZhdWx0IG5hbWUgb2YgdGhlIGlkIHByb3BlcnR5XG4gICAgICAgICAqIEB2YXIgc3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlkUHJvcGVydHkgPSAnaWQnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBtYWluIGVudHJ5IHBvaW50XG4gICAgICoge0Bpbmhlcml0ZG9jfVxuICAgICAqL1xuICAgIEFic3RyYWN0UmV2aXZlci5wcm90b3R5cGUubWFpbiA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciByYXc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIganNvbiA9IHR5cGVvZiBjb250ZW50ID09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShjb250ZW50KSA6IGNvbnRlbnQ7XG4gICAgICAgICAgICByYXcgPSB0aGlzLmluaXRGcm9tSnNvbihqc29uLCB0aGlzLmdldE5vZGVOYW1lKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXc7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIEFic3RyYWN0UmV2aXZlci5wcm90b3R5cGUuZ2V0SWRQcm9wZXJ0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRQcm9wZXJ0eTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBqc29uXG4gICAgICogQHJldHVybiBtaXhlZFxuICAgICAqIEB0aHJvd3MgUnVudGltZUV4Y2VwdGlvblxuICAgICAqIEB0aHJvd3MgXFxUeXBlRXJyb3JcbiAgICAgKi9cbiAgICBBYnN0cmFjdFJldml2ZXIucHJvdG90eXBlLmJ1aWxkRW50aXR5ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgdmFyIGVudGl0eSA9IHRoaXMuZ2V0TmV3RW50aXR5KCk7XG4gICAgICAgIHRoaXMuYnVpbGRXaXRoRXpQcm9wcyhqc29uLCBlbnRpdHkpO1xuICAgICAgICB0aGlzLmJ1aWxkV2l0aE1hbnlSZWxQcm9wcyhqc29uLCBlbnRpdHkpO1xuICAgICAgICB0aGlzLmJ1aWxkV2l0aE9uZVJlbFByb3BzKGpzb24sIGVudGl0eSk7XG4gICAgICAgIHJldHVybiBlbnRpdHk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBzaW1wbGUgcHJvcGVydHkgdGhhdCBpcyBub3QgbGlua2VkIHRvIG90aGVyIGVudGl0aWVzIHdpdGggcmVsYXRpb24gbGlrZSBNYW55VG8gT25lVG8uLi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcnJheSBqc29uXG4gICAgICogQHBhcmFtIEVudGl0eUludGVyZmFjZSBlbnRpdHlcbiAgICAgKiBAcmV0dXJuIEVudGl0eUludGVyZmFjZVxuICAgICAqL1xuICAgIEFic3RyYWN0UmV2aXZlci5wcm90b3R5cGUuYnVpbGRXaXRoRXpQcm9wcyA9IGZ1bmN0aW9uIChqc29uLCBlbnRpdHkpIHtcbiAgICAgICAgdmFyIGV6UHJvcHMgPSB0aGlzLmdldEV6UHJvcHNOYW1lKCk7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgZXpQcm9wc18xID0gZXpQcm9wczsgX2kgPCBlelByb3BzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IGV6UHJvcHNfMVtfaV07XG4gICAgICAgICAgICBpZiAoIWpzb24uaGFzT3duUHJvcGVydHkocHJvcClcbiAgICAgICAgICAgICAgICB8fCBqc29uW3Byb3BdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiVW5rbm93biBwcm9wZXJ0eSBcIiArIHByb3AgKyBcIiBmb3Igbm9kZSBcIiArIHRoaXMuZ2V0Tm9kZU5hbWUoKSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY2Nlc3Nvcl8xLkFjY2Vzc29yKHByb3AsIGVudGl0eSwganNvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVudGl0eTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcnJheSBqc29uXG4gICAgICogQHBhcmFtIEVudGl0eUludGVyZmFjZSBlbnRpdHlcbiAgICAgKiBAcmV0dXJuIEVudGl0eUludGVyZmFjZVxuICAgICAqIEB0aHJvd3MgUnVudGltZUV4Y2VwdGlvblxuICAgICAqL1xuICAgIEFic3RyYWN0UmV2aXZlci5wcm90b3R5cGUuYnVpbGRXaXRoTWFueVJlbFByb3BzID0gZnVuY3Rpb24gKGpzb24sIGVudGl0eSkge1xuICAgICAgICB2YXIgcmVsTWFueVByb3BzID0gdGhpcy5nZXRNYW55UmVsUHJvcHNOYW1lKCk7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcmVsTWFueVByb3BzKSB7XG4gICAgICAgICAgICBpZiAoIWpzb24uaGFzT3duUHJvcGVydHkocHJvcClcbiAgICAgICAgICAgICAgICB8fCBqc29uW3Byb3BdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiVW5rbm93biBwcm9wZXJ0eSBcIiArIHByb3AgKyBcIiBmb3Igbm9kZSBcIiArIHRoaXMuZ2V0Tm9kZU5hbWUoKSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3BlcmF0aW9uc0luZm8gPSByZWxNYW55UHJvcHNbcHJvcF07XG4gICAgICAgICAgICB0aGlzLmNoZWNrT3BlcmF0aW9uc0luZm8ob3BlcmF0aW9uc0luZm8sICdnZXRNYW55UmVsUHJvcHNOYW1lJyk7XG4gICAgICAgICAgICB2YXIgcmVsYXRpb25zID0gb3BlcmF0aW9uc0luZm9bJ3Jldml2ZXInXS5pbml0RnJvbUpzb24oanNvbltwcm9wXSwgcHJvcCk7XG4gICAgICAgICAgICAvLyBJIGRvbid0IGZvbmQgYSBxdWljayB3YXkgdG8gdXNlIHRoZSBwcm9wZXJ0eUFjY2Vzc29yIHNvIGkga2VlcCB0aGlzIGZvciBpbnN0YW5jZVxuICAgICAgICAgICAgdmFyIG1ldGhvZE5hbWUgPSBvcGVyYXRpb25zSW5mby5oYXNPd25Qcm9wZXJ0eSgnc2V0dGVyJykgPyBvcGVyYXRpb25zSW5mb1snc2V0dGVyJ10gOiBudWxsO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCByZWxhdGlvbnNfMSA9IHJlbGF0aW9uczsgX2kgPCByZWxhdGlvbnNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVsYXRpb24gPSByZWxhdGlvbnNfMVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbnNJbmZvLmhhc093blByb3BlcnR5KCdjYicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3BlcmF0aW9uc0luZm9bJ2NiJ10gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYiBpbiBvcGVyYXRpb25zIGluZm8gbXVzdCBiZSBjYWxsYWJsZSAoYSBmdW5jdGlvbiknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zSW5mb1snY2InXShyZWxhdGlvbiwgZW50aXR5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHNldHRlciBpcyBhIGZ1bmN0aW9uIG9yIGp1c3QgYSBwcm9wIG5hbWUgP1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudGl0eVttZXRob2ROYW1lXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlbbWV0aG9kTmFtZV0ocmVsYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5W21ldGhvZE5hbWVdID0gcmVsYXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvcl8xLkFjY2Vzc29yKHByb3AsIGVudGl0eSwgcmVsYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdG9kbyBtYW5hZ2UgdGhpcyB3aXRoIGEgbG9nICsgYSByZXBvcnQgdG8gdXNlciB3aXRoIGV4cGxhbmF0aW9uIG9uIHdoYXQgaGF2ZSBub3QgYmVlbiBwcm9jZXNzZWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW50aXR5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHRvZG86IGlmIGpzb24gaXMgYW4gb2JqZWN0IDogY3JlYXRpb24sIGlmIGl0J3MgYSBzdHJpbmcgOiByZXRyZWl2ZSB0aGUgZW50aXR5IHdpdGggZG9jdHJpbmUgYW5kIGFkZCBpdCB0byBlbnRpdHlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcnJheSBqc29uXG4gICAgICogQHBhcmFtIEVudGl0eUludGVyZmFjZSBlbnRpdHlcbiAgICAgKiBAcmV0dXJuIEVudGl0eUludGVyZmFjZVxuICAgICAqXG4gICAgICogQHRocm93cyBSdW50aW1lRXhjZXB0aW9uXG4gICAgICovXG4gICAgQWJzdHJhY3RSZXZpdmVyLnByb3RvdHlwZS5idWlsZFdpdGhPbmVSZWxQcm9wcyA9IGZ1bmN0aW9uIChqc29uLCBlbnRpdHkpIHtcbiAgICAgICAgdmFyIG9uZVJlbFByb3BzID0gdGhpcy5nZXRPbmVSZWxQcm9wc05hbWUoKTtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBvbmVSZWxQcm9wcykge1xuICAgICAgICAgICAgaWYgKCFqc29uLmhhc093blByb3BlcnR5KHByb3ApXG4gICAgICAgICAgICAgICAgfHwganNvbltwcm9wXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlVua25vd24gcHJvcGVydHkgXCIgKyBwcm9wICsgXCIgZm9yIG5vZGUgXCIgKyB0aGlzLmdldE5vZGVOYW1lKCkpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wZXJhdGlvbnNJbmZvID0gb25lUmVsUHJvcHNbcHJvcF07XG4gICAgICAgICAgICB0aGlzLmNoZWNrT3BlcmF0aW9uc0luZm8ob3BlcmF0aW9uc0luZm8sICdnZXRPbmVSZWxQcm9wc05hbWUnKTtcbiAgICAgICAgICAgIHZhciByZWxhdGlvbiA9IG9wZXJhdGlvbnNJbmZvWydyZXZpdmVyJ10uaW5pdEZyb21Kc29uKGpzb25bcHJvcF0sIHByb3ApO1xuICAgICAgICAgICAgdmFyIHJlbGF0aW9uUmVnaXN0ZXJlZCA9IHRoaXMudXNlUmVnaXN0cnkocmVsYXRpb24sIG9wZXJhdGlvbnNJbmZvKTtcbiAgICAgICAgICAgIGlmIChvcGVyYXRpb25zSW5mby5oYXNPd25Qcm9wZXJ0eSgnc2V0dGVyJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IG9wZXJhdGlvbnNJbmZvWydzZXR0ZXInXTtcbiAgICAgICAgICAgICAgICBpZiAoIWVudGl0eS5oYXNPd25Qcm9wZXJ0eShtZXRob2ROYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtZXRob2ROYW1lIChcIiArIG1ldGhvZE5hbWUgKyBcIikgbXVzdCBleGlzdHMgaW4gZW50aXR5IFwiICsgdGhpcy5nZXROb2RlTmFtZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZW50aXR5W21ldGhvZE5hbWVdKHJlbGF0aW9uUmVnaXN0ZXJlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvcl8xLkFjY2Vzc29yKHByb3AsIGVudGl0eSwgcmVsYXRpb25SZWdpc3RlcmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gbWFuYWdlIHRoaXMgd2l0aCBhIGxvZyArIGEgcmVwb3J0IHRvIHVzZXIgd2l0aCBleHBsYW5hdGlvbiBvbiB3aGF0IGhhdmUgbm90IGJlZW4gcHJvY2Vzc2VkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbnRpdHk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ganNvbk9yQXJyYXlcbiAgICAgKiBAcmV0dXJuIG1peGVkXG4gICAgICogQHRocm93cyBWYWxpZGF0aW9uRXhjZXB0aW9uXG4gICAgICovXG4gICAgQWJzdHJhY3RSZXZpdmVyLnByb3RvdHlwZS5jaGVja0pzb25PckFycmF5ID0gZnVuY3Rpb24gKGpzb25PckFycmF5KSB7XG4gICAgICAgIHZhciBqc29uO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAganNvbiA9IHR5cGVvZiBqc29uT3JBcnJheSA9PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoanNvbk9yQXJyYXkpIDoganNvbk9yQXJyYXk7XG4gICAgICAgICAgICBpZiAoIWpzb24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIHRvIHByZXZlbnQgdHMyMzM5IGkgY2FzdCBPYmplY3QgaW50byAoPGFueT5PYmplY3QpXG4gICAgICAgICAgICB2YXIgaXRlbU5hbWUgPSBPYmplY3QudmFsdWVzKHByb3BlcnR5UGF0aCkucG9wKCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJqc29uT3JBcnJheSBmb3IgXCIgKyBpdGVtTmFtZSArIFwiIG11c3QgYmUgYSBTdHJpbmcgb3IgQXJyYXlcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3BlcmF0aW9uc0luZm9cbiAgICAgKiBAcGFyYW0gbWV0aG9kTmFtZVxuICAgICAqIEB0aHJvd3MgUnVudGltZUV4Y2VwdGlvblxuICAgICAqL1xuICAgIEFic3RyYWN0UmV2aXZlci5wcm90b3R5cGUuY2hlY2tPcGVyYXRpb25zSW5mbyA9IGZ1bmN0aW9uIChvcGVyYXRpb25zSW5mbywgbWV0aG9kTmFtZSkge1xuICAgICAgICBpZiAoIW9wZXJhdGlvbnNJbmZvLmhhc093blByb3BlcnR5KCdyZXZpdmVyJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxpYnJhcnkgKlJldml2ZXI6OnttZXRob2ROYW1lfSBtdXN0IHJldHVybiBhbiBhc3NvY2lhdGl2ZSBhcnJheVxcbiAgICAgICAgICAgICAgICAgd2l0aCB0aGUga2V5IGFzIHRoZSBFbnRpdHkgcHJvcHMgbmFtZSBhbHNvIHVzZWQgaW4gSFRUUCBSZXF1ZXN0IEpzb24gbm9kZSwgYW5kIHRoZSB2YWx1ZSBtdXN0IGNvbnRhaW5cXG4gICAgICAgICAgICAgICAgIGFuIGFycmF5IHdpdGggcmV2aXZlciBrZXksIGFuZCBhIHNldHRlciBpZiB5b3UgZG9uJ3Qgd2FudCB0byB1c2UgZGVmYXVsdCBwcm9wZXJ0eUFjY2Vzc1wiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbnN0YW5jZW9mIGRvZXNuJ3QgZXhpc3RzIGluIHR5cGVzY3JpcHQsIHNvIGkganVzdCBjaGVjayB0aGUgaW5pdEZyb21Kc29uXG4gICAgICAgIGlmICh0eXBlb2Ygb3BlcmF0aW9uc0luZm9bJ3Jldml2ZXInXSAhPSAnb2JqZWN0J1xuICAgICAgICAgICAgfHwgdHlwZW9mIG9wZXJhdGlvbnNJbmZvWydyZXZpdmVyJ10uaW5pdEZyb21Kc29uICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncmV2aXZlciBzaG91bGQgYmUgYW4gb2JqZWN0IHRoYXQgaW1wbGVtZW50cyBSZXZpdmVySW50ZXJmYWNlJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSByZWxhdGlvblxuICAgICAqIEBwYXJhbSBvcGVyYXRpb25zSW5mb1xuICAgICAqIEByZXR1cm4gbWl4ZWRcbiAgICAgKi9cbiAgICBBYnN0cmFjdFJldml2ZXIucHJvdG90eXBlLnVzZVJlZ2lzdHJ5ID0gZnVuY3Rpb24gKHJlbGF0aW9uLCBvcGVyYXRpb25zSW5mbykge1xuICAgICAgICBpZiAob3BlcmF0aW9uc0luZm8uaGFzT3duUHJvcGVydHkoJ3JlZ2lzdHJ5S2V5JykpIHtcbiAgICAgICAgICAgIGlmICghcmVnaXN0cnkuaGFzT3duUHJvcGVydHkob3BlcmF0aW9uc0luZm9bJ3JlZ2lzdHJ5S2V5J10pKSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0cnlbb3BlcmF0aW9uc0luZm9bJ3JlZ2lzdHJ5S2V5J11dID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2VyaWFsaXplZCA9IEpTT04uc3RyaW5naWZ5KHJlbGF0aW9uKTtcbiAgICAgICAgICAgIGlmIChyZWdpc3RyeVtvcGVyYXRpb25zSW5mb1sncmVnaXN0cnlLZXknXV0uaGFzT3duUHJvcGVydHkoc2VyaWFsaXplZCkpIHtcbiAgICAgICAgICAgICAgICByZWxhdGlvbiA9IHJlZ2lzdHJ5W29wZXJhdGlvbnNJbmZvWydyZWdpc3RyeUtleSddXVtzZXJpYWxpemVkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlZ2lzdHJ5W29wZXJhdGlvbnNJbmZvWydyZWdpc3RyeUtleSddXVtzZXJpYWxpemVkXSA9IHJlbGF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWxhdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gc3RyaW5nXG4gICAgICovXG4gICAgQWJzdHJhY3RSZXZpdmVyLnByb3RvdHlwZS5nZXRQcm9wZXJ0eVBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYXcgPSBwcm9wZXJ0eVBhdGguam9pbignLicpO1xuICAgICAgICByZXR1cm4gcmF3LnJlcGxhY2UoJy5bJywgJ1snKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGZvciBNYW55VG9NYW55IHJldml2ZXIsIHRoZXkgbmVlZCB0byBhY2Nlc3MgaXRcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cbiAgICAgKi9cbiAgICBBYnN0cmFjdFJldml2ZXIucHJvdG90eXBlLmdldFByb3BlcnR5UGF0aENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eVBhdGg7XG4gICAgfTtcbiAgICByZXR1cm4gQWJzdHJhY3RSZXZpdmVyO1xufSgpKTtcbmV4cG9ydHMuQWJzdHJhY3RSZXZpdmVyID0gQWJzdHJhY3RSZXZpdmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWJzdHJhY3RSZXZpdmVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0ByZWJvbG9uL2pzb24tcmV2aXZlci9zcmMvcmV2aXZlci9BYnN0cmFjdFJldml2ZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0ByZWJvbG9uL2pzb24tcmV2aXZlci9zcmMvcmV2aXZlci9BYnN0cmFjdFJldml2ZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBBYnN0cmFjdFJldml2ZXJfMSA9IHJlcXVpcmUoXCIuL0Fic3RyYWN0UmV2aXZlclwiKTtcbi8qKlxuICogQHRvZG8gdGhlcmUgaXMgbWF5YmUgYSB3YXkgdG8gbXV0dWFsaXplIHRoZSAzIG1ldGhvZHMgYnVpbGRXaXRoKlxuICpcbiAqIENsYXNzIEl0ZW1BYnN0cmFjdFJldml2ZXJcbiAqL1xudmFyIEl0ZW1BYnN0cmFjdFJldml2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEl0ZW1BYnN0cmFjdFJldml2ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSXRlbUFic3RyYWN0UmV2aXZlcigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIEl0ZW1BYnN0cmFjdFJldml2ZXIucHJvdG90eXBlLmluaXRGcm9tSnNvbiA9IGZ1bmN0aW9uIChqc29uT3JBcnJheSwgcHJvcGVydHlQYXRoVG9BZGQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuZ2V0UHJvcGVydHlQYXRoQ29udGVudC5jYWxsKHRoaXMpLnB1c2gocHJvcGVydHlQYXRoVG9BZGQpO1xuICAgICAgICAgICAgdmFyIGpzb24gPSB0aGlzLmNoZWNrSnNvbk9yQXJyYXkoanNvbk9yQXJyYXkpO1xuICAgICAgICAgICAgdmFyIGVudGl0eSA9IHRoaXMuYnVpbGRFbnRpdHkoanNvbik7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmdldFByb3BlcnR5UGF0aENvbnRlbnQuY2FsbCh0aGlzKS5wb3AoKTtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBJdGVtQWJzdHJhY3RSZXZpdmVyO1xufShBYnN0cmFjdFJldml2ZXJfMS5BYnN0cmFjdFJldml2ZXIpKTtcbmV4cG9ydHMuSXRlbUFic3RyYWN0UmV2aXZlciA9IEl0ZW1BYnN0cmFjdFJldml2ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVtQWJzdHJhY3RSZXZpdmVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0ByZWJvbG9uL2pzb24tcmV2aXZlci9zcmMvcmV2aXZlci9pdGVtQWJzdHJhY3RSZXZpdmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AcmVib2xvbi9qc29uLXJldml2ZXIvc3JjL3Jldml2ZXIvaXRlbUFic3RyYWN0UmV2aXZlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEFic3RyYWN0UmV2aXZlcl8xID0gcmVxdWlyZShcIi4vQWJzdHJhY3RSZXZpdmVyXCIpO1xuLyoqXG4gKiBAdG9kbyB0aGVyZSBpcyBtYXliZSBhIHdheSB0byBtdXR1YWxpemUgdGhlIDMgbWV0aG9kcyBidWlsZFdpdGgqXG4gKlxuICogQ2xhc3MgTGlzdEFic3RyYWN0UmV2aXZlclxuICovXG52YXIgTGlzdEFic3RyYWN0UmV2aXZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTGlzdEFic3RyYWN0UmV2aXZlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBMaXN0QWJzdHJhY3RSZXZpdmVyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgTGlzdEFic3RyYWN0UmV2aXZlci5wcm90b3R5cGUuaW5pdEZyb21Kc29uID0gZnVuY3Rpb24gKGpzb25PckFycmF5LCBwcm9wZXJ0eVBhdGhUb0FkZCkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmdldFByb3BlcnR5UGF0aENvbnRlbnQuY2FsbCh0aGlzKS5wdXNoKHByb3BlcnR5UGF0aFRvQWRkKTtcbiAgICAgICAgdmFyIGpzb24gPSBfc3VwZXIucHJvdG90eXBlLmNoZWNrSnNvbk9yQXJyYXkuY2FsbCh0aGlzLCBqc29uT3JBcnJheSk7XG4gICAgICAgIC8vIHRoZSBBUEkgYWNjZXB0IGF1dGhvcnMgYXMgb25lIG9iamVjdCBvciBhcyBhbiBhcnJheSBvZiBvYmplY3QsIHNvIGkgbmVlZCB0byB0cmFuc2Zvcm0gYXQgbGVhc3QgaW4gb25lIGFycmF5XG4gICAgICAgIHZhciBsaXN0ID0ganNvbjtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChqc29uKSAhPSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICBsaXN0ID0gW2pzb25dO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRpdGllcyA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBsaXN0KSB7XG4gICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5nZXRQcm9wZXJ0eVBhdGhDb250ZW50LmNhbGwodGhpcylbX3N1cGVyLnByb3RvdHlwZS5nZXRQcm9wZXJ0eVBhdGhDb250ZW50LmNhbGwodGhpcykubGVuZ3RoXSA9ICdbJyArIGVudGl0aWVzLmxlbmd0aCArICddJztcbiAgICAgICAgICAgICAgICBlbnRpdGllcy5wdXNoKF9zdXBlci5wcm90b3R5cGUuYnVpbGRFbnRpdHkuY2FsbCh0aGlzLCBsaXN0W2l0ZW1dKSk7XG4gICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5nZXRQcm9wZXJ0eVBhdGhDb250ZW50LmNhbGwodGhpcykucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHBhcmFtZXRlciB0byBjcmVhdGUgbmV3IFwiICsgdGhpcy5nZXROb2RlTmFtZSgpICsgXCIsIGhhdmUgYSBsb29rIGF0IG5vZGUgXCIgKyBfc3VwZXIucHJvdG90eXBlLmdldFByb3BlcnR5UGF0aC5jYWxsKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuZ2V0UHJvcGVydHlQYXRoQ29udGVudC5jYWxsKHRoaXMpLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbnRpdGllcztcbiAgICB9O1xuICAgIHJldHVybiBMaXN0QWJzdHJhY3RSZXZpdmVyO1xufShBYnN0cmFjdFJldml2ZXJfMS5BYnN0cmFjdFJldml2ZXIpKTtcbmV4cG9ydHMuTGlzdEFic3RyYWN0UmV2aXZlciA9IExpc3RBYnN0cmFjdFJldml2ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXN0QWJzdHJhY3RSZXZpdmVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0ByZWJvbG9uL2pzb24tcmV2aXZlci9zcmMvcmV2aXZlci9saXN0QWJzdHJhY3RSZXZpdmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AcmVib2xvbi9qc29uLXJldml2ZXIvc3JjL3Jldml2ZXIvbGlzdEFic3RyYWN0UmV2aXZlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgY2xhc3MgQm9vayB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaWRcbiAgICAgICAgdGhpcy50aXRsZVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMuaW5kZXhJblNlcmllXG4gICAgICAgIHRoaXMuc2VyaWVcbiAgICB9XG5cbiAgICBzZXRTZXJpZShzZXJpZSkge1xuICAgICAgICB0aGlzLnNlcmllID0gc2VyaWVcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudGl0aWVzL2Jvb2suanMiLCJleHBvcnQgY2xhc3MgU2VyaWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlkXG4gICAgICAgIHRoaXMubmFtZVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50aXRpZXMvc2VyaWUuanMiLCJpbXBvcnQge1NlcmllUmV2aXZlcn0gZnJvbSBcIi4vcmV2aXZlci9zZXJpZVJldml2ZXJcIjtcclxuaW1wb3J0IHtCb29rUmV2aXZlcn0gZnJvbSBcIi4vcmV2aXZlci9ib29rUmV2aXZlclwiO1xyXG5cclxuY29uc3Qgb25lQm9vayA9IHtcclxuICAgIFwiYm9va1wiOiB7XHJcbiAgICAgICAgXCJ0aXRsZVwiOiBcIlpvbWJpZXMgaW4gd2VzdGVybiBjdWx0dXJlXCIsXHJcbiAgICAgICAgXCJzZXJpZVwiOiB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIk9wZW4gUmVwb3J0cyBTZXJpZXNcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3Qgc2VyaWVSZXZpdmVyID0gbmV3IFNlcmllUmV2aXZlcigpXHJcbmNvbnN0IGJvb2tSZXZpdmVyID0gbmV3IEJvb2tSZXZpdmVyKHNlcmllUmV2aXZlcilcclxuXHJcbi8vIEB0b2RvIHRoZSBBYnN0cmFjdFJldml2ZXIgc2hvdWxkIGJlIGFibGUgdG8gYXV0by1zZWxlY3QgdGhlIHJvb3Qgbm9kZSBpZlxyXG5jb25zdCBib29rID0gYm9va1Jldml2ZXIubWFpbihvbmVCb29rLmJvb2spXHJcblxyXG5jb25zb2xlLmxvZyhib29rKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiaW1wb3J0IHtCb29rfSBmcm9tIFwiLi4vZW50aXRpZXMvYm9va1wiXG5pbXBvcnQge0l0ZW1BYnN0cmFjdFJldml2ZXIsIEFjY2Vzc29yfSBmcm9tIFwiQHJlYm9sb24vanNvbi1yZXZpdmVyL3NyY1wiO1xuaW1wb3J0IHtTZXJpZVJldml2ZXJ9IGZyb20gXCIuL3NlcmllUmV2aXZlclwiO1xuXG5leHBvcnQgY2xhc3MgQm9va1Jldml2ZXIgZXh0ZW5kcyBJdGVtQWJzdHJhY3RSZXZpdmVyXG57XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTZXJpZVJldml2ZXJ9IHNlcmllUmV2aXZlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgc2VyaWVSZXZpdmVyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKClcblxuICAgICAgICB0aGlzLnNlcmllUmV2aXZlciA9IHNlcmllUmV2aXZlclxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXROb2RlTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdib29rJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXROZXdFbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQm9vaygpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICoge0Bpbmhlcml0ZG9jfVxuICAgICAqIGZvciB0aGlzIGtpbmQgb2YganNvbjpcbiAgICAgKiB7XG4gICAgICogICBcImJvb2tcIjoge1xuICAgICAqICAgICBcInRpdGxlXCI6IFwiVGhlIGdyZWVuIGxhbnRlcm5cIixcbiAgICAgKiAgICAgXCJkZXNjcmlwdGlvblwiOiBcIldoYXRldmVyIHlvdSB3YW50XCIsXG4gICAgICogICAgIFwiaW5kZXhfaW5fc2VyaWVcIjogMTVcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICovXG4gICAgZ2V0RXpQcm9wc05hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFsnaWQnLCAndGl0bGUnLCAnZGVzY3JpcHRpb24nLCAnaW5kZXhJblNlcmllJywgXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHtAaW5oZXJpdGRvY31cbiAgICAgKi9cbiAgICBnZXRNYW55UmVsUHJvcHNOYW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiBbXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHtAaW5oZXJpdGRvY31cbiAgICAgKlxuICAgICAqIHJlZ2lzdHJ5S2V5IGNvdWxkIGJlIHVzZWQgaWYgd2UgY3JlYXRlIGFuIGVuZHBvaW50IHRoYXQgYWxsb3cgYmF0Y2ggUE9TVC9QVVQgb2YgYm9vayB3aXRoIGVtYmVkZGVkIHNlcmllXG4gICAgICovXG4gICAgZ2V0T25lUmVsUHJvcHNOYW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc2VyaWUnOiB7XG4gICAgICAgICAgICAgICAgJ3Jldml2ZXInOiB0aGlzLnNlcmllUmV2aXZlcixcbiAgICAgICAgICAgICAgICAncmVnaXN0cnlLZXknOiAnc2VyaWUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZXZpdmVyL2Jvb2tSZXZpdmVyLmpzIiwiaW1wb3J0IHtTZXJpZX0gZnJvbSBcIi4uL2VudGl0aWVzL3NlcmllXCJcbmltcG9ydCB7SXRlbUFic3RyYWN0UmV2aXZlcn0gZnJvbSAnQHJlYm9sb24vanNvbi1yZXZpdmVyL3NyYydcblxuZXhwb3J0IGNsYXNzIFNlcmllUmV2aXZlciBleHRlbmRzIEl0ZW1BYnN0cmFjdFJldml2ZXJcbntcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Tm9kZU5hbWUoKSB7XG4gICAgICAgIHJldHVybiAnc2VyaWUnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldE5ld0VudGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXJpZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICoge0Bpbmhlcml0ZG9jfVxuICAgICAqIGZvciB0aGlzIGtpbmQgb2YganNvbjpcbiAgICAgKiB7XG4gICAgICogICBcInNlcmllXCI6IHtcbiAgICAgKiAgICAgXCJuYW1lXCI6IFwiVGhlIHNlcmllIG5hbWVcIlxuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKi9cbiAgICBnZXRFelByb3BzTmFtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gWydpZCcsICduYW1lJywgXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHtAaW5oZXJpdGRvY31cbiAgICAgKi9cbiAgICBnZXRNYW55UmVsUHJvcHNOYW1lKClcbiAgICB7XG4gICAgICAgIC8vIGZvciBpbnN0YW5jZSBpIGRvbid0IHdhbnQgdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIGEgc2VyaWUgd2l0aCBhbGwgZW1iZWRlZCBib29rcywgdGhpcyBpcyBub3QgYSB1c3VhbCB3YXkgb2Ygd29ya2luZ1xuICAgICAgICAvLyB0aGF0J3Mgd2h5IGkgZG9uJ3QgYWRkIGJvb2tzIGhlcmVcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICoge0Bpbmhlcml0ZG9jfVxuICAgICAqL1xuICAgIGdldE9uZVJlbFByb3BzTmFtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4ge31cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmV2aXZlci9zZXJpZVJldml2ZXIuanMiXSwic291cmNlUm9vdCI6IiJ9