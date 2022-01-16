"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _plugin = require("@parcel/plugin");

/*
 * @description:
 * @Author: Gomi
 * @Date: 2022-01-14 23:14:13
 */
var CONFIG = Symbol["for"]("parcel-plugin-config");

var _default = new _plugin.Namer({
  name: function (_name) {
    function name(_x) {
      return _name.apply(this, arguments);
    }

    name.toString = function () {
      return _name.toString();
    };

    return name;
  }(function (_ref) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var bundle, bundleGraph, logger, bundleGroup, bundleGroupBundles, isEntry;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              bundle = _ref.bundle, bundleGraph = _ref.bundleGraph, logger = _ref.logger;
              bundleGroup = bundleGraph.getBundleGroupsContainingBundle(bundle)[0];
              bundleGroupBundles = bundleGraph.getBundlesInBundleGroup(bundleGroup, {
                includeInline: true
              });
              isEntry = bundleGraph.isEntryBundleGroup(bundleGroup); //const name = await defaultName[CONFIG].name(opt);

              logger.log({
                message: "".concat(name)
              });
              return _context.abrupt("return", "123");

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  })
});

exports["default"] = _default;