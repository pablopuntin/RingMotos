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
exports.CreateClientDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateClientDto = function () {
    var _a;
    var _dni_decorators;
    var _dni_initializers = [];
    var _dni_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _imgUrl_decorators;
    var _imgUrl_initializers = [];
    var _imgUrl_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateClientDto() {
                this.dni = __runInitializers(this, _dni_initializers, void 0);
                this.name = (__runInitializers(this, _dni_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.lastName = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                this.address = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.phone = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.email = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.imgUrl = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _imgUrl_initializers, void 0));
                __runInitializers(this, _imgUrl_extraInitializers);
            }
            return CreateClientDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _dni_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Documento Nacional de Identidad del cliente',
                    example: '22555999',
                    required: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Nombre del cliente',
                    example: 'Juan'
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _lastName_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Apellido del cliente',
                    example: 'Perez'
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _address_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Dirección del cliente',
                    example: 'Lote 41',
                    required: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _phone_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Teléfono de contacto',
                    example: '3857408499',
                    required: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _email_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Correo electrónico del cliente',
                    example: 'perez@mail.com',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)()];
            _imgUrl_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'URL de la imagen del cliente (subida a Cloudinary)',
                    example: 'https://res.cloudinary.com/demo/image/upload/v1234567890/client-uuid.png',
                    required: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _dni_decorators, { kind: "field", name: "dni", static: false, private: false, access: { has: function (obj) { return "dni" in obj; }, get: function (obj) { return obj.dni; }, set: function (obj, value) { obj.dni = value; } }, metadata: _metadata }, _dni_initializers, _dni_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _imgUrl_decorators, { kind: "field", name: "imgUrl", static: false, private: false, access: { has: function (obj) { return "imgUrl" in obj; }, get: function (obj) { return obj.imgUrl; }, set: function (obj, value) { obj.imgUrl = value; } }, metadata: _metadata }, _imgUrl_initializers, _imgUrl_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateClientDto = CreateClientDto;
