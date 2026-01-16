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
exports.SupplierPayment = exports.SupplierPaymentStatus = void 0;
// supplier-payments/supplier-payment.entity.ts
var typeorm_1 = require("typeorm");
var supplier_entity_1 = require("../../../../../../../../../src/supplier/entities/supplier.entity");
var cash_register_entity_1 = require("../../../../../../../../../src/cash-register/entities/cash-register.entity");
var supplier_account_entry_entity_1 = require("../../../../../../../../../src/supplier-account-entry/entities/supplier-account-entry.entity");
var cash_movement_entity_1 = require("../../../../../../../../../src/cash-movement/entities/cash-movement.entity");
var SupplierPaymentStatus;
(function (SupplierPaymentStatus) {
    SupplierPaymentStatus["COMPLETED"] = "COMPLETED";
    SupplierPaymentStatus["REVERSED"] = "REVERSED";
})(SupplierPaymentStatus || (exports.SupplierPaymentStatus = SupplierPaymentStatus = {}));
var SupplierPayment = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('supplier_payments')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _supplier_decorators;
    var _supplier_initializers = [];
    var _supplier_extraInitializers = [];
    var _cashRegister_decorators;
    var _cashRegister_initializers = [];
    var _cashRegister_extraInitializers = [];
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
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _supplierAccountEntries_decorators;
    var _supplierAccountEntries_initializers = [];
    var _supplierAccountEntries_extraInitializers = [];
    var _cashMovements_decorators;
    var _cashMovements_initializers = [];
    var _cashMovements_extraInitializers = [];
    var SupplierPayment = _classThis = /** @class */ (function () {
        function SupplierPayment_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.supplier = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _supplier_initializers, void 0));
            this.cashRegister = (__runInitializers(this, _supplier_extraInitializers), __runInitializers(this, _cashRegister_initializers, void 0));
            this.amount = (__runInitializers(this, _cashRegister_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            this.paymentDate = (__runInitializers(this, _paymentMethod_extraInitializers), __runInitializers(this, _paymentDate_initializers, void 0));
            this.status = (__runInitializers(this, _paymentDate_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.supplierAccountEntries = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _supplierAccountEntries_initializers, void 0));
            this.cashMovements = (__runInitializers(this, _supplierAccountEntries_extraInitializers), __runInitializers(this, _cashMovements_initializers, void 0));
            __runInitializers(this, _cashMovements_extraInitializers);
        }
        return SupplierPayment_1;
    }());
    __setFunctionName(_classThis, "SupplierPayment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _supplier_decorators = [(0, typeorm_1.ManyToOne)(function () { return supplier_entity_1.Supplier; }, function (s) { return s.supplierPayments; }, { eager: true })];
        _cashRegister_decorators = [(0, typeorm_1.ManyToOne)(function () { return cash_register_entity_1.CashRegister; }, function (c) { return c.supplierPayments; }, { eager: true })];
        _amount_decorators = [(0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 })];
        _paymentMethod_decorators = [(0, typeorm_1.Column)({ length: 40 })];
        _paymentDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: SupplierPaymentStatus, default: SupplierPaymentStatus.COMPLETED })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _supplierAccountEntries_decorators = [(0, typeorm_1.OneToMany)(function () { return supplier_account_entry_entity_1.SupplierAccountEntry; }, function (sae) { return sae.supplierPayment; })];
        _cashMovements_decorators = [(0, typeorm_1.OneToMany)(function () { return cash_movement_entity_1.CashMovement; }, function (cm) { return cm.relatedSupplierPayment; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _supplier_decorators, { kind: "field", name: "supplier", static: false, private: false, access: { has: function (obj) { return "supplier" in obj; }, get: function (obj) { return obj.supplier; }, set: function (obj, value) { obj.supplier = value; } }, metadata: _metadata }, _supplier_initializers, _supplier_extraInitializers);
        __esDecorate(null, null, _cashRegister_decorators, { kind: "field", name: "cashRegister", static: false, private: false, access: { has: function (obj) { return "cashRegister" in obj; }, get: function (obj) { return obj.cashRegister; }, set: function (obj, value) { obj.cashRegister = value; } }, metadata: _metadata }, _cashRegister_initializers, _cashRegister_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, null, _paymentDate_decorators, { kind: "field", name: "paymentDate", static: false, private: false, access: { has: function (obj) { return "paymentDate" in obj; }, get: function (obj) { return obj.paymentDate; }, set: function (obj, value) { obj.paymentDate = value; } }, metadata: _metadata }, _paymentDate_initializers, _paymentDate_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _supplierAccountEntries_decorators, { kind: "field", name: "supplierAccountEntries", static: false, private: false, access: { has: function (obj) { return "supplierAccountEntries" in obj; }, get: function (obj) { return obj.supplierAccountEntries; }, set: function (obj, value) { obj.supplierAccountEntries = value; } }, metadata: _metadata }, _supplierAccountEntries_initializers, _supplierAccountEntries_extraInitializers);
        __esDecorate(null, null, _cashMovements_decorators, { kind: "field", name: "cashMovements", static: false, private: false, access: { has: function (obj) { return "cashMovements" in obj; }, get: function (obj) { return obj.cashMovements; }, set: function (obj, value) { obj.cashMovements = value; } }, metadata: _metadata }, _cashMovements_initializers, _cashMovements_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SupplierPayment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SupplierPayment = _classThis;
}();
exports.SupplierPayment = SupplierPayment;
