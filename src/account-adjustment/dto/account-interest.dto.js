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
exports.ApplyInterestDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var ApplyInterestDto = function () {
    var _a;
    var _clientId_decorators;
    var _clientId_initializers = [];
    var _clientId_extraInitializers = [];
    var _percentage_decorators;
    var _percentage_initializers = [];
    var _percentage_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _saleId_decorators;
    var _saleId_initializers = [];
    var _saleId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ApplyInterestDto() {
                this.clientId = __runInitializers(this, _clientId_initializers, void 0);
                this.percentage = (__runInitializers(this, _clientId_extraInitializers), __runInitializers(this, _percentage_initializers, void 0)); // ahora opcional
                this.description = (__runInitializers(this, _percentage_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.saleId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _saleId_initializers, void 0));
                __runInitializers(this, _saleId_extraInitializers);
            }
            return ApplyInterestDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _clientId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Identificador único del cliente', example: 'uuid-cliente' }), (0, class_validator_1.IsUUID)()];
            _percentage_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Monto de interés ', example: 15 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Descripción del movimiento', example: 'Interés por mora, puede ser positivo para aumentar o negativo para restarle un porcentaje al saldo' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _saleId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'ID de la venta asociada (si aplica)', example: 'uuid-venta' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _clientId_decorators, { kind: "field", name: "clientId", static: false, private: false, access: { has: function (obj) { return "clientId" in obj; }, get: function (obj) { return obj.clientId; }, set: function (obj, value) { obj.clientId = value; } }, metadata: _metadata }, _clientId_initializers, _clientId_extraInitializers);
            __esDecorate(null, null, _percentage_decorators, { kind: "field", name: "percentage", static: false, private: false, access: { has: function (obj) { return "percentage" in obj; }, get: function (obj) { return obj.percentage; }, set: function (obj, value) { obj.percentage = value; } }, metadata: _metadata }, _percentage_initializers, _percentage_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _saleId_decorators, { kind: "field", name: "saleId", static: false, private: false, access: { has: function (obj) { return "saleId" in obj; }, get: function (obj) { return obj.saleId; }, set: function (obj, value) { obj.saleId = value; } }, metadata: _metadata }, _saleId_initializers, _saleId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ApplyInterestDto = ApplyInterestDto;
