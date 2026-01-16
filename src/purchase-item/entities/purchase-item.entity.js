"use strict";
// // import { ApiProperty } from '@nestjs/swagger';
// // import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
// // import { Purchase } from 'src/purchase/entities/purchase.entity';
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
exports.PurchaseItem = void 0;
// // @Entity()
// // export class PurchaseItem {
// //   @ApiProperty({ description: "Identificador único del ítem de compra", example: "uuid" })
// //   @PrimaryGeneratedColumn('uuid')
// //   id: string;
// //   @ApiProperty({ description: "Compra asociada al ítem" })
// //   @ManyToOne(() => Purchase, (purchase) => purchase.items)
// //   purchase: Purchase;
// //   @ApiProperty({ description: "ID del producto (nullable)", example: "prod-456" })
// //   @Column({ nullable: true })
// //   productId: string;
// //   @ApiProperty({ description: "Descripción libre del producto", example: "Bolsa de cemento" })
// //   @Column()
// //   description: string;
// //   @ApiProperty({ description: "Cantidad", example: 20 })
// //   @Column('int')
// //   qty: number;
// //   @ApiProperty({ description: "Costo unitario", example: 1200.00 })
// //   @Column({ type: 'decimal', precision: 10, scale: 2 })
// //   unitCost: number;
// //   @ApiProperty({ description: "Total de la línea", example: 24000.00 })
// //   @Column({ type: 'decimal', precision: 10, scale: 2 })
// //   lineTotal: number;
// // }
// import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
// import { Purchase } from 'src/purchase/entities/purchase.entity';
// @Entity()
// export class PurchaseItem {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;
//   @ManyToOne(() => Purchase, (purchase) => purchase.items)
//   purchase: Purchase;
//   @Column({ nullable: true })
//   productId: string;
//   @Column()
//   description: string;
//   @Column('int')
//   qty: number;
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   unitCost: number;
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   lineTotal: number;
// }
// purchases/purchase-item.entity.ts
var typeorm_1 = require("typeorm");
var purchase_entity_1 = require("../../../../../../../../../src/purchase/entities/purchase.entity");
var PurchaseItem = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('purchase_items')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _purchase_decorators;
    var _purchase_initializers = [];
    var _purchase_extraInitializers = [];
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
    var PurchaseItem = _classThis = /** @class */ (function () {
        function PurchaseItem_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.purchase = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _purchase_initializers, void 0));
            this.productId = (__runInitializers(this, _purchase_extraInitializers), __runInitializers(this, _productId_initializers, void 0));
            this.description = (__runInitializers(this, _productId_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.qty = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _qty_initializers, void 0));
            this.unitCost = (__runInitializers(this, _qty_extraInitializers), __runInitializers(this, _unitCost_initializers, void 0));
            this.lineTotal = (__runInitializers(this, _unitCost_extraInitializers), __runInitializers(this, _lineTotal_initializers, void 0));
            __runInitializers(this, _lineTotal_extraInitializers);
        }
        return PurchaseItem_1;
    }());
    __setFunctionName(_classThis, "PurchaseItem");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _purchase_decorators = [(0, typeorm_1.ManyToOne)(function () { return purchase_entity_1.Purchase; }, function (p) { return p.items; }, { onDelete: 'CASCADE' })];
        _productId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _qty_decorators = [(0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 })];
        _unitCost_decorators = [(0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 })];
        _lineTotal_decorators = [(0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _purchase_decorators, { kind: "field", name: "purchase", static: false, private: false, access: { has: function (obj) { return "purchase" in obj; }, get: function (obj) { return obj.purchase; }, set: function (obj, value) { obj.purchase = value; } }, metadata: _metadata }, _purchase_initializers, _purchase_extraInitializers);
        __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: function (obj) { return "productId" in obj; }, get: function (obj) { return obj.productId; }, set: function (obj, value) { obj.productId = value; } }, metadata: _metadata }, _productId_initializers, _productId_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _qty_decorators, { kind: "field", name: "qty", static: false, private: false, access: { has: function (obj) { return "qty" in obj; }, get: function (obj) { return obj.qty; }, set: function (obj, value) { obj.qty = value; } }, metadata: _metadata }, _qty_initializers, _qty_extraInitializers);
        __esDecorate(null, null, _unitCost_decorators, { kind: "field", name: "unitCost", static: false, private: false, access: { has: function (obj) { return "unitCost" in obj; }, get: function (obj) { return obj.unitCost; }, set: function (obj, value) { obj.unitCost = value; } }, metadata: _metadata }, _unitCost_initializers, _unitCost_extraInitializers);
        __esDecorate(null, null, _lineTotal_decorators, { kind: "field", name: "lineTotal", static: false, private: false, access: { has: function (obj) { return "lineTotal" in obj; }, get: function (obj) { return obj.lineTotal; }, set: function (obj, value) { obj.lineTotal = value; } }, metadata: _metadata }, _lineTotal_initializers, _lineTotal_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PurchaseItem = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PurchaseItem = _classThis;
}();
exports.PurchaseItem = PurchaseItem;
