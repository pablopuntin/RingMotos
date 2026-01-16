"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentAllocationDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var create_payment_allocation_dto_1 = require("./create-payment-allocation.dto");
var UpdatePaymentAllocationDto = /** @class */ (function (_super) {
    __extends(UpdatePaymentAllocationDto, _super);
    function UpdatePaymentAllocationDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdatePaymentAllocationDto;
}((0, swagger_1.PartialType)(create_payment_allocation_dto_1.CreatePaymentAllocationDto)));
exports.UpdatePaymentAllocationDto = UpdatePaymentAllocationDto;
