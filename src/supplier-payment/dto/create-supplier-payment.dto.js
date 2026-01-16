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
exports.CreateSupplierPaymentDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateSupplierPaymentDto = function () {
    var _a;
    var _supplierId_decorators;
    var _supplierId_initializers = [];
    var _supplierId_extraInitializers = [];
    var _cashRegisterId_decorators;
    var _cashRegisterId_initializers = [];
    var _cashRegisterId_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var _paymentDate_decorators;
    var _paymentDate_initializers = [];
    var _paymentDate_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateSupplierPaymentDto() {
                this.supplierId = __runInitializers(this, _supplierId_initializers, void 0);
                this.cashRegisterId = (__runInitializers(this, _supplierId_extraInitializers), __runInitializers(this, _cashRegisterId_initializers, void 0));
                this.amount = (__runInitializers(this, _cashRegisterId_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
                this.paymentMethod = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
                this.paymentDate = (__runInitializers(this, _paymentMethod_extraInitializers), __runInitializers(this, _paymentDate_initializers, void 0));
                this.status = (__runInitializers(this, _paymentDate_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                __runInitializers(this, _status_extraInitializers);
            }
            return CreateSupplierPaymentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _supplierId_decorators = [(0, swagger_1.ApiProperty)({ description: "UUID del proveedor asociado al pago" }), (0, class_validator_1.IsUUID)()];
            _cashRegisterId_decorators = [(0, swagger_1.ApiProperty)({ description: "Caja registradora asociada (FK)", example: "cash-002" }), (0, class_validator_1.IsString)()];
            _amount_decorators = [(0, swagger_1.ApiProperty)({ description: "Monto del pago", example: 5000.00 }), (0, class_validator_1.IsNumber)()];
            _paymentMethod_decorators = [(0, swagger_1.ApiProperty)({ description: "Método de pago", example: "TRANSFER" }), (0, class_validator_1.IsString)()];
            _paymentDate_decorators = [(0, swagger_1.ApiProperty)({ description: "Fecha del pago", example: "2025-12-12T20:35:00.000Z" }), (0, class_validator_1.IsDateString)()];
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: "Estado del pago", example: "COMPLETED", enum: ['COMPLETED', 'REVERSED'] }), (0, class_validator_1.IsEnum)(['COMPLETED', 'REVERSED'])];
            __esDecorate(null, null, _supplierId_decorators, { kind: "field", name: "supplierId", static: false, private: false, access: { has: function (obj) { return "supplierId" in obj; }, get: function (obj) { return obj.supplierId; }, set: function (obj, value) { obj.supplierId = value; } }, metadata: _metadata }, _supplierId_initializers, _supplierId_extraInitializers);
            __esDecorate(null, null, _cashRegisterId_decorators, { kind: "field", name: "cashRegisterId", static: false, private: false, access: { has: function (obj) { return "cashRegisterId" in obj; }, get: function (obj) { return obj.cashRegisterId; }, set: function (obj, value) { obj.cashRegisterId = value; } }, metadata: _metadata }, _cashRegisterId_initializers, _cashRegisterId_extraInitializers);
            __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
            __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
            __esDecorate(null, null, _paymentDate_decorators, { kind: "field", name: "paymentDate", static: false, private: false, access: { has: function (obj) { return "paymentDate" in obj; }, get: function (obj) { return obj.paymentDate; }, set: function (obj, value) { obj.paymentDate = value; } }, metadata: _metadata }, _paymentDate_initializers, _paymentDate_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateSupplierPaymentDto = CreateSupplierPaymentDto;
