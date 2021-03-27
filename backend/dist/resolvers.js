"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getForms = function () {
    return [
        {
            fields: [
                {
                    name: 'Handsomeness Rating',
                    type: 'number',
                    desc: 'Describe how handsome Sam is on a scale of 1-10',
                    rules: [
                        {
                            key: 'bottom',
                            value: '0'
                        },
                        {
                            key: 'top',
                            value: '10'
                        }
                    ]
                }
            ]
        }
    ];
};
exports.default = {
    Query: {
        status: function () { return 'Okay!'; },
        getForms: function () { return getForms(); }
    }
};
