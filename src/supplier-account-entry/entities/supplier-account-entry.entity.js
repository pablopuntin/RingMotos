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
exports.SupplierAccountEntry = exports.SupplierAccountEntryType = void 0;
// supplier-account-entries/supplier-account-entry.entity.ts
var typeorm_1 = require("typeorm");
var supplier_entity_1 = require("../../../../../../../../../src/supplier/entities/supplier.entity");
var purchase_entity_1 = require("../../../../../../../../../src/purchase/entities/purchase.entity");
var supplier_payment_entity_1 = require("../../../../../../../../../src/supplier-payment/entities/supplier-payment.entity");
var SupplierAccountEntryType;
(function (SupplierAccountEntryType) {
    SupplierAccountEntryType["DEBT"] = "DEBT";
    SupplierAccountEntryType["PAYMENT"] = "PAYMENT";
    SupplierAccountEntryType["ADJUSTMENT"] = "ADJUSTMENT";
})(SupplierAccountEntryType || (exports.SupplierAccountEntryType = SupplierAccountEntryType = {}));
var SupplierAccountEntry = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('supplier_account_entries')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _supplier_decorators;
    var _supplier_initializers = [];
    var _supplier_extraInitializers = [];
    var _purchase_decorators;
    var _purchase_initializers = [];
    var _purchase_extraInitializers = [];
    var _supplierPayment_decorators;
    var _supplierPayment_initializers = [];
    var _supplierPayment_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _balanceAfter_decorators;
    var _balanceAfter_initializers = [];
    var _balanceAfter_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var SupplierAccountEntry = _classThis = /** @class */ (function () {
        function SupplierAccountEntry_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.supplier = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _supplier_initializers, void 0));
            this.purchase = (__runInitializers(this, _supplier_extraInitializers), __runInitializers(this, _purchase_initializers, void 0));
            this.supplierPayment = (__runInitializers(this, _purchase_extraInitializers), __runInitializers(this, _supplierPayment_initializers, void 0));
            this.amount = (__runInitializers(this, _supplierPayment_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.balanceAfter = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _balanceAfter_initializers, void 0));
            this.createdAt = (__runInitializers(this, _balanceAfter_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.description = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
        return SupplierAccountEntry_1;
    }());
    __setFunctionName(_classThis, "SupplierAccountEntry");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _supplier_decorators = [(0, typeorm_1.ManyToOne)(function () { return supplier_entity_1.Supplier; }, function (s) { return s.supplierAccountEntries; }, { eager: true })];
        _purchase_decorators = [(0, typeorm_1.ManyToOne)(function () { return purchase_entity_1.Purchase; }, function (p) { return p.accountEntries; }, { nullable: true })];
        _supplierPayment_decorators = [(0, typeorm_1.ManyToOne)(function () { return supplier_payment_entity_1.SupplierPayment; }, function (sp) { return sp.supplierAccountEntries; }, { nullable: true })];
        _amount_decorators = [(0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 })];
        _balanceAfter_decorators = [(0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({ length: 24, default: 'ACTIVE' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _supplier_decorators, { kind: "field", name: "supplier", static: false, private: false, access: { has: function (obj) { return "supplier" in obj; }, get: function (obj) { return obj.supplier; }, set: function (obj, value) { obj.supplier = value; } }, metadata: _metadata }, _supplier_initializers, _supplier_extraInitializers);
        __esDecorate(null, null, _purchase_decorators, { kind: "field", name: "purchase", static: false, private: false, access: { has: function (obj) { return "purchase" in obj; }, get: function (obj) { return obj.purchase; }, set: function (obj, value) { obj.purchase = value; } }, metadata: _metadata }, _purchase_initializers, _purchase_extraInitializers);
        __esDecorate(null, null, _supplierPayment_decorators, { kind: "field", name: "supplierPayment", static: false, private: false, access: { has: function (obj) { return "supplierPayment" in obj; }, get: function (obj) { return obj.supplierPayment; }, set: function (obj, value) { obj.supplierPayment = value; } }, metadata: _metadata }, _supplierPayment_initializers, _supplierPayment_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _balanceAfter_decorators, { kind: "field", name: "balanceAfter", static: false, private: false, access: { has: function (obj) { return "balanceAfter" in obj; }, get: function (obj) { return obj.balanceAfter; }, set: function (obj, value) { obj.balanceAfter = value; } }, metadata: _metadata }, _balanceAfter_initializers, _balanceAfter_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SupplierAccountEntry = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SupplierAccountEntry = _classThis;
}();
exports.SupplierAccountEntry = SupplierAccountEntry;
