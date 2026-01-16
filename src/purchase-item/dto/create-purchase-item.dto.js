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
exports.CreatePurchaseItemDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreatePurchaseItemDto = function () {
    var _a;
    var _productId_decorators;
    var _productId_initializers = [];
    var _productId_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _qty_decorators;
    var _qty_initializers = [];
    var _qty_extraInitializers = [];
    var _unitCost_decorators;
    var _unitCost_initializers = [];
    var _unitCost_extraInitializers = [];
    var _lineTotal_decorators;
    var _lineTotal_initializers = [];
    var _lineTotal_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePurchaseItemDto() {
                this.productId = __runInitializers(this, _productId_initializers, void 0);
                this.description = (__runInitializers(this, _productId_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.qty = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _qty_initializers, void 0));
                this.unitCost = (__runInitializers(this, _qty_extraInitializers), __runInitializers(this, _unitCost_initializers, void 0));
                this.lineTotal = (__runInitializers(this, _unitCost_extraInitializers), __runInitializers(this, _lineTotal_initializers, void 0));
                __runInitializers(this, _lineTotal_extraInitializers);
            }
            return CreatePurchaseItemDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _productId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'ID de producto (opcional)',
                    example: 'uuid-producto',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _description_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Descripción libre del producto',
                    example: 'Bolsa de cemento',
                }), (0, class_validator_1.IsString)()];
            _qty_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Cantidad',
                    example: 20,
                    minimum: 0.0001,
                }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0.0001)];
            _unitCost_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Costo unitario',
                    example: 1200.0,
                    minimum: 0,
                }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _lineTotal_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total de la línea',
                    example: 24000.0,
                    minimum: 0,
                }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: function (obj) { return "productId" in obj; }, get: function (obj) { return obj.productId; }, set: function (obj, value) { obj.productId = value; } }, metadata: _metadata }, _productId_initializers, _productId_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _qty_decorators, { kind: "field", name: "qty", static: false, private: false, access: { has: function (obj) { return "qty" in obj; }, get: function (obj) { return obj.qty; }, set: function (obj, value) { obj.qty = value; } }, metadata: _metadata }, _qty_initializers, _qty_extraInitializers);
            __esDecorate(null, null, _unitCost_decorators, { kind: "field", name: "unitCost", static: false, private: false, access: { has: function (obj) { return "unitCost" in obj; }, get: function (obj) { return obj.unitCost; }, set: function (obj, value) { obj.unitCost = value; } }, metadata: _metadata }, _unitCost_initializers, _unitCost_extraInitializers);
            __esDecorate(null, null, _lineTotal_decorators, { kind: "field", name: "lineTotal", static: false, private: false, access: { has: function (obj) { return "lineTotal" in obj; }, get: function (obj) { return obj.lineTotal; }, set: function (obj, value) { obj.lineTotal = value; } }, metadata: _metadata }, _lineTotal_initializers, _lineTotal_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePurchaseItemDto = CreatePurchaseItemDto;
