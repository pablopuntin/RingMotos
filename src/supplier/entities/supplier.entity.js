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
exports.Supplier = void 0;
var typeorm_1 = require("typeorm");
var purchase_entity_1 = require("../../../../../../../../../src/purchase/entities/purchase.entity");
var supplier_payment_entity_1 = require("../../../../../../../../../src/supplier-payment/entities/supplier-payment.entity");
var supplier_account_entry_entity_1 = require("../../../../../../../../../src/supplier-account-entry/entities/supplier-account-entry.entity");
var Supplier = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('suppliers'), (0, typeorm_1.Unique)(['cuit']), (0, typeorm_1.Unique)(['email'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _cuit_decorators;
    var _cuit_initializers = [];
    var _cuit_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _totalDebtCache_decorators;
    var _totalDebtCache_initializers = [];
    var _totalDebtCache_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _purchases_decorators;
    var _purchases_initializers = [];
    var _purchases_extraInitializers = [];
    var _supplierPayments_decorators;
    var _supplierPayments_initializers = [];
    var _supplierPayments_extraInitializers = [];
    var _supplierAccountEntries_decorators;
    var _supplierAccountEntries_initializers = [];
    var _supplierAccountEntries_extraInitializers = [];
    var Supplier = _classThis = /** @class */ (function () {
        function Supplier_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.cuit = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _cuit_initializers, void 0));
            this.phone = (__runInitializers(this, _cuit_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.email = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.address = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            // @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
            // totalDebtCache: number;
            this.totalDebtCache = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _totalDebtCache_initializers, void 0));
            // 👉 estado operativo
            this.isActive = (__runInitializers(this, _totalDebtCache_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.createdAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.purchases = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _purchases_initializers, void 0));
            this.supplierPayments = (__runInitializers(this, _purchases_extraInitializers), __runInitializers(this, _supplierPayments_initializers, void 0));
            this.supplierAccountEntries = (__runInitializers(this, _supplierPayments_extraInitializers), __runInitializers(this, _supplierAccountEntries_initializers, void 0));
            __runInitializers(this, _supplierAccountEntries_extraInitializers);
        }
        return Supplier_1;
    }());
    __setFunctionName(_classThis, "Supplier");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)()];
        _cuit_decorators = [(0, typeorm_1.Column)()];
        _phone_decorators = [(0, typeorm_1.Column)()];
        _email_decorators = [(0, typeorm_1.Column)()];
        _address_decorators = [(0, typeorm_1.Column)()];
        _totalDebtCache_decorators = [(0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _purchases_decorators = [(0, typeorm_1.OneToMany)(function () { return purchase_entity_1.Purchase; }, function (purchase) { return purchase.supplier; })];
        _supplierPayments_decorators = [(0, typeorm_1.OneToMany)(function () { return supplier_payment_entity_1.SupplierPayment; }, function (sp) { return sp.supplier; })];
        _supplierAccountEntries_decorators = [(0, typeorm_1.OneToMany)(function () { return supplier_account_entry_entity_1.SupplierAccountEntry; }, function (sae) { return sae.supplier; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _cuit_decorators, { kind: "field", name: "cuit", static: false, private: false, access: { has: function (obj) { return "cuit" in obj; }, get: function (obj) { return obj.cuit; }, set: function (obj, value) { obj.cuit = value; } }, metadata: _metadata }, _cuit_initializers, _cuit_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _totalDebtCache_decorators, { kind: "field", name: "totalDebtCache", static: false, private: false, access: { has: function (obj) { return "totalDebtCache" in obj; }, get: function (obj) { return obj.totalDebtCache; }, set: function (obj, value) { obj.totalDebtCache = value; } }, metadata: _metadata }, _totalDebtCache_initializers, _totalDebtCache_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _purchases_decorators, { kind: "field", name: "purchases", static: false, private: false, access: { has: function (obj) { return "purchases" in obj; }, get: function (obj) { return obj.purchases; }, set: function (obj, value) { obj.purchases = value; } }, metadata: _metadata }, _purchases_initializers, _purchases_extraInitializers);
        __esDecorate(null, null, _supplierPayments_decorators, { kind: "field", name: "supplierPayments", static: false, private: false, access: { has: function (obj) { return "supplierPayments" in obj; }, get: function (obj) { return obj.supplierPayments; }, set: function (obj, value) { obj.supplierPayments = value; } }, metadata: _metadata }, _supplierPayments_initializers, _supplierPayments_extraInitializers);
        __esDecorate(null, null, _supplierAccountEntries_decorators, { kind: "field", name: "supplierAccountEntries", static: false, private: false, access: { has: function (obj) { return "supplierAccountEntries" in obj; }, get: function (obj) { return obj.supplierAccountEntries; }, set: function (obj, value) { obj.supplierAccountEntries = value; } }, metadata: _metadata }, _supplierAccountEntries_initializers, _supplierAccountEntries_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Supplier = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Supplier = _classThis;
}();
exports.Supplier = Supplier;
