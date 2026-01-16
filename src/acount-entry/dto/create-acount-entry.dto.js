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
exports.CreateAccountEntryDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreateAccountEntryDto = function () {
    var _a;
    var _clientId_decorators;
    var _clientId_initializers = [];
    var _clientId_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _saleId_decorators;
    var _saleId_initializers = [];
    var _saleId_extraInitializers = [];
    var _paymentId_decorators;
    var _paymentId_initializers = [];
    var _paymentId_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _balanceAfter_decorators;
    var _balanceAfter_initializers = [];
    var _balanceAfter_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateAccountEntryDto() {
                this.clientId = __runInitializers(this, _clientId_initializers, void 0);
                this.type = (__runInitializers(this, _clientId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.saleId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _saleId_initializers, void 0));
                this.paymentId = (__runInitializers(this, _saleId_extraInitializers), __runInitializers(this, _paymentId_initializers, void 0));
                this.amount = (__runInitializers(this, _paymentId_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
                this.balanceAfter = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _balanceAfter_initializers, void 0));
                this.description = (__runInitializers(this, _balanceAfter_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                __runInitializers(this, _status_extraInitializers);
            }
            return CreateAccountEntryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _clientId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Cliente asociado',
                    example: 'uuid-del-cliente',
                })];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Tipo de movimiento',
                    example: 'CHARGE',
                    enum: ['CHARGE', 'PAYMENT', 'ADJUSTMENT'],
                })];
            _saleId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Venta asociada (nullable)',
                    example: 'uuid-de-la-venta',
                    required: false,
                })];
            _paymentId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Pago asociado (nullable)',
                    example: 'uuid-del-pago',
                    required: false,
                })];
            _amount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Monto del movimiento',
                    example: 250.0,
                })];
            _balanceAfter_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Balance después del movimiento',
                    example: 1250.0,
                })];
            _description_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Descripción del movimiento',
                    example: 'Pago parcial de factura',
                })];
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Estado del movimiento',
                    example: 'ACTIVE',
                })];
            __esDecorate(null, null, _clientId_decorators, { kind: "field", name: "clientId", static: false, private: false, access: { has: function (obj) { return "clientId" in obj; }, get: function (obj) { return obj.clientId; }, set: function (obj, value) { obj.clientId = value; } }, metadata: _metadata }, _clientId_initializers, _clientId_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _saleId_decorators, { kind: "field", name: "saleId", static: false, private: false, access: { has: function (obj) { return "saleId" in obj; }, get: function (obj) { return obj.saleId; }, set: function (obj, value) { obj.saleId = value; } }, metadata: _metadata }, _saleId_initializers, _saleId_extraInitializers);
            __esDecorate(null, null, _paymentId_decorators, { kind: "field", name: "paymentId", static: false, private: false, access: { has: function (obj) { return "paymentId" in obj; }, get: function (obj) { return obj.paymentId; }, set: function (obj, value) { obj.paymentId = value; } }, metadata: _metadata }, _paymentId_initializers, _paymentId_extraInitializers);
            __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
            __esDecorate(null, null, _balanceAfter_decorators, { kind: "field", name: "balanceAfter", static: false, private: false, access: { has: function (obj) { return "balanceAfter" in obj; }, get: function (obj) { return obj.balanceAfter; }, set: function (obj, value) { obj.balanceAfter = value; } }, metadata: _metadata }, _balanceAfter_initializers, _balanceAfter_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateAccountEntryDto = CreateAccountEntryDto;
