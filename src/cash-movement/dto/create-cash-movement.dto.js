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
exports.CreateCashMovementDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreateCashMovementDto = function () {
    var _a;
    var _cashRegisterId_decorators;
    var _cashRegisterId_initializers = [];
    var _cashRegisterId_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _relatedSaleId_decorators;
    var _relatedSaleId_initializers = [];
    var _relatedSaleId_extraInitializers = [];
    var _relatedPaymentId_decorators;
    var _relatedPaymentId_initializers = [];
    var _relatedPaymentId_extraInitializers = [];
    var _relatedSupplierPaymentId_decorators;
    var _relatedSupplierPaymentId_initializers = [];
    var _relatedSupplierPaymentId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateCashMovementDto() {
                this.cashRegisterId = __runInitializers(this, _cashRegisterId_initializers, void 0);
                this.type = (__runInitializers(this, _cashRegisterId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.amount = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
                this.reason = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
                this.relatedSaleId = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _relatedSaleId_initializers, void 0));
                this.relatedPaymentId = (__runInitializers(this, _relatedSaleId_extraInitializers), __runInitializers(this, _relatedPaymentId_initializers, void 0));
                this.relatedSupplierPaymentId = (__runInitializers(this, _relatedPaymentId_extraInitializers), __runInitializers(this, _relatedSupplierPaymentId_initializers, void 0));
                __runInitializers(this, _relatedSupplierPaymentId_extraInitializers);
            }
            return CreateCashMovementDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _cashRegisterId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID de la caja registradora asociada',
                    example: 'uuid-de-la-caja',
                })];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Tipo de movimiento',
                    example: 'IN',
                    enum: ['IN', 'OUT']
                })];
            _amount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Monto del movimiento',
                    example: 500
                })];
            _reason_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Motivo del movimiento',
                    example: 'Pago de cliente',
                    required: false
                })];
            _relatedSaleId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID de la venta relacionada (nullable)',
                    example: 'uuid-de-la-venta',
                    required: false
                })];
            _relatedPaymentId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID del pago relacionado (nullable)',
                    example: 'uuid-del-pago',
                    required: false,
                })];
            _relatedSupplierPaymentId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID del pago a proveedor relacionado (nullable)',
                    example: 'uuid-del-pago-proveedor',
                    required: false,
                })];
            __esDecorate(null, null, _cashRegisterId_decorators, { kind: "field", name: "cashRegisterId", static: false, private: false, access: { has: function (obj) { return "cashRegisterId" in obj; }, get: function (obj) { return obj.cashRegisterId; }, set: function (obj, value) { obj.cashRegisterId = value; } }, metadata: _metadata }, _cashRegisterId_initializers, _cashRegisterId_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            __esDecorate(null, null, _relatedSaleId_decorators, { kind: "field", name: "relatedSaleId", static: false, private: false, access: { has: function (obj) { return "relatedSaleId" in obj; }, get: function (obj) { return obj.relatedSaleId; }, set: function (obj, value) { obj.relatedSaleId = value; } }, metadata: _metadata }, _relatedSaleId_initializers, _relatedSaleId_extraInitializers);
            __esDecorate(null, null, _relatedPaymentId_decorators, { kind: "field", name: "relatedPaymentId", static: false, private: false, access: { has: function (obj) { return "relatedPaymentId" in obj; }, get: function (obj) { return obj.relatedPaymentId; }, set: function (obj, value) { obj.relatedPaymentId = value; } }, metadata: _metadata }, _relatedPaymentId_initializers, _relatedPaymentId_extraInitializers);
            __esDecorate(null, null, _relatedSupplierPaymentId_decorators, { kind: "field", name: "relatedSupplierPaymentId", static: false, private: false, access: { has: function (obj) { return "relatedSupplierPaymentId" in obj; }, get: function (obj) { return obj.relatedSupplierPaymentId; }, set: function (obj, value) { obj.relatedSupplierPaymentId = value; } }, metadata: _metadata }, _relatedSupplierPaymentId_initializers, _relatedSupplierPaymentId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateCashMovementDto = CreateCashMovementDto;
