"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  type Rule {\n    key: String\n    value: String\n  }\n\n  type Field {\n    name: String!\n    type: String!\n    desc: String\n    rules: [Rule]\n  }\n\n  type Form {\n    fields: [Field]\n  }\n\n  type Query {\n    status: String!\n    forms: [Form]\n  }\n"], ["\n\n  type Rule {\n    key: String\n    value: String\n  }\n\n  type Field {\n    name: String!\n    type: String!\n    desc: String\n    rules: [Rule]\n  }\n\n  type Form {\n    fields: [Field]\n  }\n\n  type Query {\n    status: String!\n    forms: [Form]\n  }\n"])));
var templateObject_1;
