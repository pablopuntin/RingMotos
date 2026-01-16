"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentAllocationDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreatePaymentAllocationDto = function () {
    var _a;
    var _paymentId_decorators;
    var _paymentId_initializers = [];
    var _paymentId_extraInitializers = [];
    var _saleId_decorators;
    var _saleId_initializers = [];
    var _saleId_extraInitializers = [];
    var _amountApplied_decorators;
    var _amountApplied_initializers = [];
    var _amountApplied_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePaymentAllocationDto() {
                this.paymentId = __runInitializers(this, _paymentId_initializers, void 0);
                this.saleId = (__runInitializers(this, _paymentId_extraInitializers), __runInitializers(this, _saleId_initializers, void 0));
                this.amountApplied = (__runInitializers(this, _saleId_extraInitializers), __runInitializers(this, _amountApplied_initializers, void 0));
                __runInitializers(this, _amountApplied_extraInitializers);
            }
            return CreatePaymentAllocationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _paymentId_decorators = [(0, swagger_1.ApiProperty)({ description: "UUID del pago asociado" }), (0, class_validator_1.IsUUID)()];
            _saleId_decorators = [(0, swagger_1.ApiProperty)({ description: "UUID de la venta asociada" }), (0, class_validator_1.IsUUID)()];
            _amountApplied_decorators = [(0, swagger_1.ApiProperty)({ description: "Monto aplicado a la venta", example: 500.00 }), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _paymentId_decorators, { kind: "field", name: "paymentId", static: false, private: false, access: { has: function (obj) { return "paymentId" in obj; }, get: function (obj) { return obj.paymentId; }, set: function (obj, value) { obj.paymentId = value; } }, metadata: _metadata }, _paymentId_initializers, _paymentId_extraInitializers);
            __esDecorate(null, null, _saleId_decorators, { kind: "field", name: "saleId", static: false, private: false, access: { has: function (obj) { return "saleId" in obj; }, get: function (obj) { return obj.saleId; }, set: function (obj, value) { obj.saleId = value; } }, metadata: _metadata }, _saleId_initializers, _saleId_extraInitializers);
            __esDecorate(null, null, _amountApplied_decorators, { kind: "field", name: "amountApplied", static: false, private: false, access: { has: function (obj) { return "amountApplied" in obj; }, get: function (obj) { return obj.amountApplied; }, set: function (obj, value) { obj.amountApplied = value; } }, metadata: _metadata }, _amountApplied_initializers, _amountApplied_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePaymentAllocationDto = CreatePaymentAllocationDto;
