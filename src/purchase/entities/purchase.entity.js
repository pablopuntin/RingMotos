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
exports.Purchase = exports.PurchaseStatus = void 0;
// purchases/purchase.entity.ts
var typeorm_1 = require("typeorm");
var supplier_entity_1 = require("../../../../../../../../../src/supplier/entities/supplier.entity");
var purchase_item_entity_1 = require("../../../../../../../../../src/purchase-item/entities/purchase-item.entity");
var supplier_account_entry_entity_1 = require("../../../../../../../../../src/supplier-account-entry/entities/supplier-account-entry.entity");
var PurchaseStatus;
(function (PurchaseStatus) {
    PurchaseStatus["DRAFT"] = "DRAFT";
    PurchaseStatus["CONFIRMED"] = "CONFIRMED";
})(PurchaseStatus || (exports.PurchaseStatus = PurchaseStatus = {}));
var Purchase = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('purchases')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _supplier_decorators;
    var _supplier_initializers = [];
    var _supplier_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _totalAmount_decorators;
    var _totalAmount_initializers = [];
    var _totalAmount_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _confirmedAt_decorators;
    var _confirmedAt_initializers = [];
    var _confirmedAt_extraInitializers = [];
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _accountEntries_decorators;
    var _accountEntries_initializers = [];
    var _accountEntries_extraInitializers = [];
    var Purchase = _classThis = /** @class */ (function () {
        function Purchase_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.supplier = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _supplier_initializers, void 0));
            this.status = (__runInitializers(this, _supplier_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.totalAmount = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _totalAmount_initializers, void 0));
            this.createdAt = (__runInitializers(this, _totalAmount_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.confirmedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _confirmedAt_initializers, void 0));
            this.items = (__runInitializers(this, _confirmedAt_extraInitializers), __runInitializers(this, _items_initializers, void 0));
            this.accountEntries = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _accountEntries_initializers, void 0));
            __runInitializers(this, _accountEntries_extraInitializers);
        }
        return Purchase_1;
    }());
    __setFunctionName(_classThis, "Purchase");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _supplier_decorators = [(0, typeorm_1.ManyToOne)(function () { return supplier_entity_1.Supplier; }, function (s) { return s.purchases; }, { eager: true })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: PurchaseStatus, default: PurchaseStatus.DRAFT })];
        _totalAmount_decorators = [(0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _confirmedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _items_decorators = [(0, typeorm_1.OneToMany)(function () { return purchase_item_entity_1.PurchaseItem; }, function (i) { return i.purchase; }, { cascade: true })];
        _accountEntries_decorators = [(0, typeorm_1.OneToMany)(function () { return supplier_account_entry_entity_1.SupplierAccountEntry; }, function (sae) { return sae.purchase; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _supplier_decorators, { kind: "field", name: "supplier", static: false, private: false, access: { has: function (obj) { return "supplier" in obj; }, get: function (obj) { return obj.supplier; }, set: function (obj, value) { obj.supplier = value; } }, metadata: _metadata }, _supplier_initializers, _supplier_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _totalAmount_decorators, { kind: "field", name: "totalAmount", static: false, private: false, access: { has: function (obj) { return "totalAmount" in obj; }, get: function (obj) { return obj.totalAmount; }, set: function (obj, value) { obj.totalAmount = value; } }, metadata: _metadata }, _totalAmount_initializers, _totalAmount_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _confirmedAt_decorators, { kind: "field", name: "confirmedAt", static: false, private: false, access: { has: function (obj) { return "confirmedAt" in obj; }, get: function (obj) { return obj.confirmedAt; }, set: function (obj, value) { obj.confirmedAt = value; } }, metadata: _metadata }, _confirmedAt_initializers, _confirmedAt_extraInitializers);
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, null, _accountEntries_decorators, { kind: "field", name: "accountEntries", static: false, private: false, access: { has: function (obj) { return "accountEntries" in obj; }, get: function (obj) { return obj.accountEntries; }, set: function (obj, value) { obj.accountEntries = value; } }, metadata: _metadata }, _accountEntries_initializers, _accountEntries_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Purchase = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Purchase = _classThis;
}();
exports.Purchase = Purchase;
