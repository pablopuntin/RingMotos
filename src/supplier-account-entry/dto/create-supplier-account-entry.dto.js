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
exports.CreateSupplierAccountEntryDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateSupplierAccountEntryDto = function () {
    var _a;
    var _supplierId_decorators;
    var _supplierId_initializers = [];
    var _supplierId_extraInitializers = [];
    var _purchaseId_decorators;
    var _purchaseId_initializers = [];
    var _purchaseId_extraInitializers = [];
    var _supplierPaymentId_decorators;
    var _supplierPaymentId_initializers = [];
    var _supplierPaymentId_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _balanceAfter_decorators;
    var _balanceAfter_initializers = [];
    var _balanceAfter_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateSupplierAccountEntryDto() {
                this.supplierId = __runInitializers(this, _supplierId_initializers, void 0);
                this.purchaseId = (__runInitializers(this, _supplierId_extraInitializers), __runInitializers(this, _purchaseId_initializers, void 0));
                this.supplierPaymentId = (__runInitializers(this, _purchaseId_extraInitializers), __runInitializers(this, _supplierPaymentId_initializers, void 0));
                this.type = (__runInitializers(this, _supplierPaymentId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.amount = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
                this.balanceAfter = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _balanceAfter_initializers, void 0));
                this.description = (__runInitializers(this, _balanceAfter_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                __runInitializers(this, _description_extraInitializers);
            }
            return CreateSupplierAccountEntryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _supplierId_decorators = [(0, swagger_1.ApiProperty)({ description: "UUID del proveedor asociado" }), (0, class_validator_1.IsUUID)()];
            _purchaseId_decorators = [(0, swagger_1.ApiProperty)({ description: "UUID de la compra asociada (nullable)", required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _supplierPaymentId_decorators = [(0, swagger_1.ApiProperty)({ description: "UUID del pago asociado (nullable)", required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({ description: "Tipo de movimiento", example: "DEBT", enum: ['DEBT', 'PAYMENT'] }), (0, class_validator_1.IsEnum)(['DEBT', 'PAYMENT'])];
            _amount_decorators = [(0, swagger_1.ApiProperty)({ description: "Monto del movimiento", example: 3000.00 }), (0, class_validator_1.IsNumber)()];
            _balanceAfter_decorators = [(0, swagger_1.ApiProperty)({ description: "Balance después del movimiento", example: 12000.00 }), (0, class_validator_1.IsNumber)()];
            _description_decorators = [(0, swagger_1.ApiProperty)({ description: "Descripción del movimiento", example: "Pago parcial de compra" }), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _supplierId_decorators, { kind: "field", name: "supplierId", static: false, private: false, access: { has: function (obj) { return "supplierId" in obj; }, get: function (obj) { return obj.supplierId; }, set: function (obj, value) { obj.supplierId = value; } }, metadata: _metadata }, _supplierId_initializers, _supplierId_extraInitializers);
            __esDecorate(null, null, _purchaseId_decorators, { kind: "field", name: "purchaseId", static: false, private: false, access: { has: function (obj) { return "purchaseId" in obj; }, get: function (obj) { return obj.purchaseId; }, set: function (obj, value) { obj.purchaseId = value; } }, metadata: _metadata }, _purchaseId_initializers, _purchaseId_extraInitializers);
            __esDecorate(null, null, _supplierPaymentId_decorators, { kind: "field", name: "supplierPaymentId", static: false, private: false, access: { has: function (obj) { return "supplierPaymentId" in obj; }, get: function (obj) { return obj.supplierPaymentId; }, set: function (obj, value) { obj.supplierPaymentId = value; } }, metadata: _metadata }, _supplierPaymentId_initializers, _supplierPaymentId_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
            __esDecorate(null, null, _balanceAfter_decorators, { kind: "field", name: "balanceAfter", static: false, private: false, access: { has: function (obj) { return "balanceAfter" in obj; }, get: function (obj) { return obj.balanceAfter; }, set: function (obj, value) { obj.balanceAfter = value; } }, metadata: _metadata }, _balanceAfter_initializers, _balanceAfter_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateSupplierAccountEntryDto = CreateSupplierAccountEntryDto;
