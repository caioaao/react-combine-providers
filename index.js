"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var CombineProviders = /** @class */ (function () {
    function CombineProviders() {
        this.stack = [];
        this.stack = [];
    }
    CombineProviders.prototype.getNode = function (Component) {
        // @ts-ignore
        return this.stack.find(function (node) {
            return node.Component === Component;
        });
    };
    CombineProviders.prototype.push = function (Component, props) {
        // @ts-ignore
        var node = this.getNode(Component);
        if (node) {
            node.props = props;
        }
        else {
            // @ts-ignore
            this.stack.push({ Component: Component, props: props });
        }
    };
    CombineProviders.prototype.createProvidersTree = function (stack, index, children) {
        if (index === void 0) { index = 0; }
        var isLastNode = index === stack.length - 1;
        var providerNode = stack[index];
        var component = providerNode.Component;
        var props = providerNode.props;
        if (isLastNode) {
            return React.createElement(component, __assign({}, (props || {}), { children: children }));
        }
        else {
            return React.createElement(component, props, this.createProvidersTree(stack, ++index, children));
        }
    };
    CombineProviders.prototype.render = function (children) {
        return this.createProvidersTree(this.stack, 0, children);
    };
    CombineProviders.prototype.master = function () {
        var _this = this;
        return function (_a) {
            var children = _a.children;
            return _this.createProvidersTree(_this.stack, 0, children);
        };
    };
    return CombineProviders;
}());
exports.CombineProviders = CombineProviders;
exports.combineProviders = function () {
    return new CombineProviders();
};
