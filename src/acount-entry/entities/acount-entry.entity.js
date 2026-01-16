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
exports.AccountEntry = void 0;
var typeorm_1 = require("typeorm");
var client_entity_1 = require("../../../../../../../../../src/client/entities/client.entity");
var sale_entity_1 = require("../../../../../../../../../src/sale/entities/sale.entity");
var payment_entity_1 = require("../../../../../../../../../src/payment/entities/payment.entity");
var user_entity_1 = require("../../../../../../../../../src/user/entities/user.entity");
var AccountEntry = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _client_decorators;
    var _client_initializers = [];
    var _client_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _sale_decorators;
    var _sale_initializers = [];
    var _sale_extraInitializers = [];
    var _payment_decorators;
    var _payment_initializers = [];
    var _payment_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _balanceAfter_decorators;
    var _balanceAfter_initializers = [];
    var _balanceAfter_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var AccountEntry = _classThis = /** @class */ (function () {
        function AccountEntry_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.client = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _client_initializers, void 0));
            this.type = (__runInitializers(this, _client_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.sale = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _sale_initializers, void 0));
            this.payment = (__runInitializers(this, _sale_extraInitializers), __runInitializers(this, _payment_initializers, void 0));
            //   @ManyToOne(() => User)
            // @JoinColumn({ name: 'created_by' })
            // createdBy: User;
            this.createdBy = (__runInitializers(this, _payment_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.amount = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.balanceAfter = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _balanceAfter_initializers, void 0));
            this.description = (__runInitializers(this, _balanceAfter_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.createdAt = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.status = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
        return AccountEntry_1;
    }());
    __setFunctionName(_classThis, "AccountEntry");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _client_decorators = [(0, typeorm_1.ManyToOne)(function () { return client_entity_1.Client; }, function (client) { return client.accountEntries; })];
        _type_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ['CHARGE', 'PAYMENT', 'ADJUSTMENT'] })];
        _sale_decorators = [(0, typeorm_1.ManyToOne)(function () { return sale_entity_1.Sale; }, function (sale) { return sale.accountEntries; }, { nullable: true })];
        _payment_decorators = [(0, typeorm_1.ManyToOne)(function () { return payment_entity_1.Payment; }, function (payment) { return payment.accountEntries; }, { nullable: true })];
        _createdBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { nullable: true })];
        _amount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _balanceAfter_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _description_decorators = [(0, typeorm_1.Column)()];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _status_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _client_decorators, { kind: "field", name: "client", static: false, private: false, access: { has: function (obj) { return "client" in obj; }, get: function (obj) { return obj.client; }, set: function (obj, value) { obj.client = value; } }, metadata: _metadata }, _client_initializers, _client_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _sale_decorators, { kind: "field", name: "sale", static: false, private: false, access: { has: function (obj) { return "sale" in obj; }, get: function (obj) { return obj.sale; }, set: function (obj, value) { obj.sale = value; } }, metadata: _metadata }, _sale_initializers, _sale_extraInitializers);
        __esDecorate(null, null, _payment_decorators, { kind: "field", name: "payment", static: false, private: false, access: { has: function (obj) { return "payment" in obj; }, get: function (obj) { return obj.payment; }, set: function (obj, value) { obj.payment = value; } }, metadata: _metadata }, _payment_initializers, _payment_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _balanceAfter_decorators, { kind: "field", name: "balanceAfter", static: false, private: false, access: { has: function (obj) { return "balanceAfter" in obj; }, get: function (obj) { return obj.balanceAfter; }, set: function (obj, value) { obj.balanceAfter = value; } }, metadata: _metadata }, _balanceAfter_initializers, _balanceAfter_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AccountEntry = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AccountEntry = _classThis;
}();
exports.AccountEntry = AccountEntry;
