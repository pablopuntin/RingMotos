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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashMovement = void 0;
var typeorm_1 = require("typeorm");
var cash_register_entity_1 = require("../../../../../../../../../src/cash-register/entities/cash-register.entity");
var supplier_payment_entity_1 = require("../../../../../../../../../src/supplier-payment/entities/supplier-payment.entity");
var CashMovement = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('cash_movements')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
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
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _cashRegister_decorators;
    var _cashRegister_initializers = [];
    var _cashRegister_extraInitializers = [];
    var _relatedSupplierPayment_decorators;
    var _relatedSupplierPayment_initializers = [];
    var _relatedSupplierPayment_extraInitializers = [];
    var CashMovement = _classThis = /** @class */ (function () {
        function CashMovement_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.amount = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.reason = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            this.relatedSaleId = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _relatedSaleId_initializers, void 0));
            this.relatedPaymentId = (__runInitializers(this, _relatedSaleId_extraInitializers), __runInitializers(this, _relatedPaymentId_initializers, void 0));
            this.relatedSupplierPaymentId = (__runInitializers(this, _relatedPaymentId_extraInitializers), __runInitializers(this, _relatedSupplierPaymentId_initializers, void 0));
            this.createdAt = (__runInitializers(this, _relatedSupplierPaymentId_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            // 👇 Relación con CashRegister enlazada al campo cashRegisterId
            this.cashRegister = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _cashRegister_initializers, void 0));
            this.relatedSupplierPayment = (__runInitializers(this, _cashRegister_extraInitializers), __runInitializers(this, _relatedSupplierPayment_initializers, void 0));
            __runInitializers(this, _relatedSupplierPayment_extraInitializers);
        }
        return CashMovement_1;
    }());
    __setFunctionName(_classThis, "CashMovement");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _type_decorators = [(0, typeorm_1.Column)()];
        _amount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _reason_decorators = [(0, typeorm_1.Column)()];
        _relatedSaleId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _relatedPaymentId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _relatedSupplierPaymentId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } })];
        _cashRegister_decorators = [(0, typeorm_1.ManyToOne)(function () { return cash_register_entity_1.CashRegister; }, function (cr) { return cr.cashMovements; }), (0, typeorm_1.JoinColumn)({ name: 'cashRegisterId' })];
        _relatedSupplierPayment_decorators = [(0, typeorm_1.ManyToOne)(function () { return supplier_payment_entity_1.SupplierPayment; }, function (sp) { return sp.cashMovements; }, { nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, null, _relatedSaleId_decorators, { kind: "field", name: "relatedSaleId", static: false, private: false, access: { has: function (obj) { return "relatedSaleId" in obj; }, get: function (obj) { return obj.relatedSaleId; }, set: function (obj, value) { obj.relatedSaleId = value; } }, metadata: _metadata }, _relatedSaleId_initializers, _relatedSaleId_extraInitializers);
        __esDecorate(null, null, _relatedPaymentId_decorators, { kind: "field", name: "relatedPaymentId", static: false, private: false, access: { has: function (obj) { return "relatedPaymentId" in obj; }, get: function (obj) { return obj.relatedPaymentId; }, set: function (obj, value) { obj.relatedPaymentId = value; } }, metadata: _metadata }, _relatedPaymentId_initializers, _relatedPaymentId_extraInitializers);
        __esDecorate(null, null, _relatedSupplierPaymentId_decorators, { kind: "field", name: "relatedSupplierPaymentId", static: false, private: false, access: { has: function (obj) { return "relatedSupplierPaymentId" in obj; }, get: function (obj) { return obj.relatedSupplierPaymentId; }, set: function (obj, value) { obj.relatedSupplierPaymentId = value; } }, metadata: _metadata }, _relatedSupplierPaymentId_initializers, _relatedSupplierPaymentId_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _cashRegister_decorators, { kind: "field", name: "cashRegister", static: false, private: false, access: { has: function (obj) { return "cashRegister" in obj; }, get: function (obj) { return obj.cashRegister; }, set: function (obj, value) { obj.cashRegister = value; } }, metadata: _metadata }, _cashRegister_initializers, _cashRegister_extraInitializers);
        __esDecorate(null, null, _relatedSupplierPayment_decorators, { kind: "field", name: "relatedSupplierPayment", static: false, private: false, access: { has: function (obj) { return "relatedSupplierPayment" in obj; }, get: function (obj) { return obj.relatedSupplierPayment; }, set: function (obj, value) { obj.relatedSupplierPayment = value; } }, metadata: _metadata }, _relatedSupplierPayment_initializers, _relatedSupplierPayment_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CashMovement = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CashMovement = _classThis;
}();
exports.CashMovement = CashMovement;
