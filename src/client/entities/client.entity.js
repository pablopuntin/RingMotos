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
exports.Client = void 0;
// src/clients/client.entity.ts
var typeorm_1 = require("typeorm");
var sale_entity_1 = require("../../../../../../../../../src/sale/entities/sale.entity");
var acount_entry_entity_1 = require("../../../../../../../../../src/acount-entry/entities/acount-entry.entity");
var Client = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('client')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _dni_decorators;
    var _dni_initializers = [];
    var _dni_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _isFinalConsumer_decorators;
    var _isFinalConsumer_initializers = [];
    var _isFinalConsumer_extraInitializers = [];
    var _totalDebtCache_decorators;
    var _totalDebtCache_initializers = [];
    var _totalDebtCache_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _imgUrl_decorators;
    var _imgUrl_initializers = [];
    var _imgUrl_extraInitializers = [];
    var _sales_decorators;
    var _sales_initializers = [];
    var _sales_extraInitializers = [];
    var _accountEntries_decorators;
    var _accountEntries_initializers = [];
    var _accountEntries_extraInitializers = [];
    var Client = _classThis = /** @class */ (function () {
        function Client_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.dni = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _dni_initializers, void 0));
            this.name = (__runInitializers(this, _dni_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.lastName = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
            this.phone = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.email = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.address = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.isFinalConsumer = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _isFinalConsumer_initializers, void 0));
            this.totalDebtCache = (__runInitializers(this, _isFinalConsumer_extraInitializers), __runInitializers(this, _totalDebtCache_initializers, void 0));
            this.createdAt = (__runInitializers(this, _totalDebtCache_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.imgUrl = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _imgUrl_initializers, void 0));
            // Relaciones
            this.sales = (__runInitializers(this, _imgUrl_extraInitializers), __runInitializers(this, _sales_initializers, void 0));
            this.accountEntries = (__runInitializers(this, _sales_extraInitializers), __runInitializers(this, _accountEntries_initializers, void 0));
            __runInitializers(this, _accountEntries_extraInitializers);
        }
        return Client_1;
    }());
    __setFunctionName(_classThis, "Client");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _dni_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _name_decorators = [(0, typeorm_1.Column)()];
        _lastName_decorators = [(0, typeorm_1.Column)()];
        _phone_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _email_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _address_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _isFinalConsumer_decorators = [(0, typeorm_1.Column)({ default: false })];
        _totalDebtCache_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _imgUrl_decorators = [(0, typeorm_1.Column)({
                type: 'text',
                default: 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg',
            })];
        _sales_decorators = [(0, typeorm_1.OneToMany)(function () { return sale_entity_1.Sale; }, function (sale) { return sale.client; })];
        _accountEntries_decorators = [(0, typeorm_1.OneToMany)(function () { return acount_entry_entity_1.AccountEntry; }, function (ae) { return ae.client; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _dni_decorators, { kind: "field", name: "dni", static: false, private: false, access: { has: function (obj) { return "dni" in obj; }, get: function (obj) { return obj.dni; }, set: function (obj, value) { obj.dni = value; } }, metadata: _metadata }, _dni_initializers, _dni_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _isFinalConsumer_decorators, { kind: "field", name: "isFinalConsumer", static: false, private: false, access: { has: function (obj) { return "isFinalConsumer" in obj; }, get: function (obj) { return obj.isFinalConsumer; }, set: function (obj, value) { obj.isFinalConsumer = value; } }, metadata: _metadata }, _isFinalConsumer_initializers, _isFinalConsumer_extraInitializers);
        __esDecorate(null, null, _totalDebtCache_decorators, { kind: "field", name: "totalDebtCache", static: false, private: false, access: { has: function (obj) { return "totalDebtCache" in obj; }, get: function (obj) { return obj.totalDebtCache; }, set: function (obj, value) { obj.totalDebtCache = value; } }, metadata: _metadata }, _totalDebtCache_initializers, _totalDebtCache_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _imgUrl_decorators, { kind: "field", name: "imgUrl", static: false, private: false, access: { has: function (obj) { return "imgUrl" in obj; }, get: function (obj) { return obj.imgUrl; }, set: function (obj, value) { obj.imgUrl = value; } }, metadata: _metadata }, _imgUrl_initializers, _imgUrl_extraInitializers);
        __esDecorate(null, null, _sales_decorators, { kind: "field", name: "sales", static: false, private: false, access: { has: function (obj) { return "sales" in obj; }, get: function (obj) { return obj.sales; }, set: function (obj, value) { obj.sales = value; } }, metadata: _metadata }, _sales_initializers, _sales_extraInitializers);
        __esDecorate(null, null, _accountEntries_decorators, { kind: "field", name: "accountEntries", static: false, private: false, access: { has: function (obj) { return "accountEntries" in obj; }, get: function (obj) { return obj.accountEntries; }, set: function (obj, value) { obj.accountEntries = value; } }, metadata: _metadata }, _accountEntries_initializers, _accountEntries_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Client = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Client = _classThis;
}();
exports.Client = Client;
