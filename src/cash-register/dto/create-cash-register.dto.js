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
exports.CreateCashRegisterDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreateCashRegisterDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _openingAmount_decorators;
    var _openingAmount_initializers = [];
    var _openingAmount_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _openedBy_decorators;
    var _openedBy_initializers = [];
    var _openedBy_extraInitializers = [];
    var _openedAt_decorators;
    var _openedAt_initializers = [];
    var _openedAt_extraInitializers = [];
    var _closingAmount_decorators;
    var _closingAmount_initializers = [];
    var _closingAmount_extraInitializers = [];
    var _closedAt_decorators;
    var _closedAt_initializers = [];
    var _closedAt_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateCashRegisterDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.openingAmount = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _openingAmount_initializers, void 0));
                this.status = (__runInitializers(this, _openingAmount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.openedBy = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _openedBy_initializers, void 0));
                this.openedAt = (__runInitializers(this, _openedBy_extraInitializers), __runInitializers(this, _openedAt_initializers, void 0));
                this.closingAmount = (__runInitializers(this, _openedAt_extraInitializers), __runInitializers(this, _closingAmount_initializers, void 0));
                this.closedAt = (__runInitializers(this, _closingAmount_extraInitializers), __runInitializers(this, _closedAt_initializers, void 0));
                __runInitializers(this, _closedAt_extraInitializers);
            }
            return CreateCashRegisterDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Nombre de la caja',
                    example: 'Caja Principal'
                })];
            _openingAmount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Monto de apertura',
                    example: 1000
                })];
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Estado de la caja',
                    example: 'OPEN',
                    enum: ['OPEN', 'CLOSED']
                })];
            _openedBy_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Usuario que abrió la caja (ID)',
                    example: 'uuid-del-usuario'
                })];
            _openedAt_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Fecha de apertura',
                    example: '2025-12-15T09:00:00.000Z'
                })];
            _closingAmount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Monto de cierre (nullable)',
                    example: 1500,
                    required: false
                })];
            _closedAt_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Fecha de cierre (nullable)',
                    example: '2025-12-15T18:00:00.000Z',
                    required: false
                })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _openingAmount_decorators, { kind: "field", name: "openingAmount", static: false, private: false, access: { has: function (obj) { return "openingAmount" in obj; }, get: function (obj) { return obj.openingAmount; }, set: function (obj, value) { obj.openingAmount = value; } }, metadata: _metadata }, _openingAmount_initializers, _openingAmount_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _openedBy_decorators, { kind: "field", name: "openedBy", static: false, private: false, access: { has: function (obj) { return "openedBy" in obj; }, get: function (obj) { return obj.openedBy; }, set: function (obj, value) { obj.openedBy = value; } }, metadata: _metadata }, _openedBy_initializers, _openedBy_extraInitializers);
            __esDecorate(null, null, _openedAt_decorators, { kind: "field", name: "openedAt", static: false, private: false, access: { has: function (obj) { return "openedAt" in obj; }, get: function (obj) { return obj.openedAt; }, set: function (obj, value) { obj.openedAt = value; } }, metadata: _metadata }, _openedAt_initializers, _openedAt_extraInitializers);
            __esDecorate(null, null, _closingAmount_decorators, { kind: "field", name: "closingAmount", static: false, private: false, access: { has: function (obj) { return "closingAmount" in obj; }, get: function (obj) { return obj.closingAmount; }, set: function (obj, value) { obj.closingAmount = value; } }, metadata: _metadata }, _closingAmount_initializers, _closingAmount_extraInitializers);
            __esDecorate(null, null, _closedAt_decorators, { kind: "field", name: "closedAt", static: false, private: false, access: { has: function (obj) { return "closedAt" in obj; }, get: function (obj) { return obj.closedAt; }, set: function (obj, value) { obj.closedAt = value; } }, metadata: _metadata }, _closedAt_initializers, _closedAt_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateCashRegisterDto = CreateCashRegisterDto;
