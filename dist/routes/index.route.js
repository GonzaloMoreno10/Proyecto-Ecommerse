"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./auth.route"), exports);
__exportStar(require("./category.routes"), exports);
__exportStar(require("./line.route"), exports);
__exportStar(require("./brand.route"), exports);
__exportStar(require("./model.route"), exports);
__exportStar(require("./orders.route"), exports);
__exportStar(require("./product.route"), exports);
__exportStar(require("./productType.route"), exports);
__exportStar(require("./properties.route"), exports);
__exportStar(require("./serverConfig.route"), exports);
__exportStar(require("./stats.route"), exports);
__exportStar(require("./users.route"), exports);
