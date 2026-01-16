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
exports.AccountHistoryQueryDto = exports.AccountEntryType = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var AccountEntryType;
(function (AccountEntryType) {
    AccountEntryType["CHARGE"] = "CHARGE";
    AccountEntryType["PAYMENT"] = "PAYMENT";
    AccountEntryType["ADJUSTMENT"] = "ADJUSTMENT";
})(AccountEntryType || (exports.AccountEntryType = AccountEntryType = {}));
var AccountHistoryQueryDto = function () {
    var _a;
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _offset_decorators;
    var _offset_initializers = [];
    var _offset_extraInitializers = [];
    var _from_decorators;
    var _from_initializers = [];
    var _from_extraInitializers = [];
    var _to_decorators;
    var _to_initializers = [];
    var _to_extraInitializers = [];
    var _types_decorators;
    var _types_initializers = [];
    var _types_extraInitializers = [];
    var _includeSale_decorators;
    var _includeSale_initializers = [];
    var _includeSale_extraInitializers = [];
    var _includeItems_decorators;
    var _includeItems_initializers = [];
    var _includeItems_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AccountHistoryQueryDto() {
                this.limit = __runInitializers(this, _limit_initializers, 10);
                this.offset = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _offset_initializers, 0));
                this.from = (__runInitializers(this, _offset_extraInitializers), __runInitializers(this, _from_initializers, void 0));
                this.to = (__runInitializers(this, _from_extraInitializers), __runInitializers(this, _to_initializers, void 0));
                this.types = (__runInitializers(this, _to_extraInitializers), __runInitializers(this, _types_initializers, void 0));
                this.includeSale = (__runInitializers(this, _types_extraInitializers), __runInitializers(this, _includeSale_initializers, false));
                this.includeItems = (__runInitializers(this, _includeSale_extraInitializers), __runInitializers(this, _includeItems_initializers, false));
                __runInitializers(this, _includeItems_extraInitializers);
            }
            return AccountHistoryQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 10 }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _offset_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 0 }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _from_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: '2026-01-01' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _to_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: '2026-01-31' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _types_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    enum: AccountEntryType,
                    isArray: true,
                    example: ['CHARGE', 'PAYMENT'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(AccountEntryType, { each: true })];
            _includeSale_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: true }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Boolean; }), (0, class_validator_1.IsBoolean)()];
            _includeItems_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: true }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Boolean; }), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: function (obj) { return "offset" in obj; }, get: function (obj) { return obj.offset; }, set: function (obj, value) { obj.offset = value; } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
            __esDecorate(null, null, _from_decorators, { kind: "field", name: "from", static: false, private: false, access: { has: function (obj) { return "from" in obj; }, get: function (obj) { return obj.from; }, set: function (obj, value) { obj.from = value; } }, metadata: _metadata }, _from_initializers, _from_extraInitializers);
            __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: function (obj) { return "to" in obj; }, get: function (obj) { return obj.to; }, set: function (obj, value) { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
            __esDecorate(null, null, _types_decorators, { kind: "field", name: "types", static: false, private: false, access: { has: function (obj) { return "types" in obj; }, get: function (obj) { return obj.types; }, set: function (obj, value) { obj.types = value; } }, metadata: _metadata }, _types_initializers, _types_extraInitializers);
            __esDecorate(null, null, _includeSale_decorators, { kind: "field", name: "includeSale", static: false, private: false, access: { has: function (obj) { return "includeSale" in obj; }, get: function (obj) { return obj.includeSale; }, set: function (obj, value) { obj.includeSale = value; } }, metadata: _metadata }, _includeSale_initializers, _includeSale_extraInitializers);
            __esDecorate(null, null, _includeItems_decorators, { kind: "field", name: "includeItems", static: false, private: false, access: { has: function (obj) { return "includeItems" in obj; }, get: function (obj) { return obj.includeItems; }, set: function (obj, value) { obj.includeItems = value; } }, metadata: _metadata }, _includeItems_initializers, _includeItems_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AccountHistoryQueryDto = AccountHistoryQueryDto;
