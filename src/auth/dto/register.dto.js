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
exports.RegisterDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var RegisterDto = function () {
    var _a;
    var _firstname_decorators;
    var _firstname_initializers = [];
    var _firstname_extraInitializers = [];
    var _lastname_decorators;
    var _lastname_initializers = [];
    var _lastname_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RegisterDto() {
                this.firstname = __runInitializers(this, _firstname_initializers, void 0);
                this.lastname = (__runInitializers(this, _firstname_extraInitializers), __runInitializers(this, _lastname_initializers, void 0));
                this.email = (__runInitializers(this, _lastname_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                __runInitializers(this, _password_extraInitializers);
            }
            return RegisterDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstname_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Nombre',
                    example: 'Juan',
                }), (0, class_validator_1.IsNotEmpty)()];
            _lastname_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Apellido',
                    example: 'Perez',
                }), (0, class_validator_1.IsNotEmpty)()];
            _email_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Debe ser un mail valido',
                    example: 'prueba@mail.com',
                    required: true
                }), (0, class_validator_1.IsEmail)()];
            _password_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Su password debe contener 8 caracteres, un numero y una mayuscula',
                    example: 'Prueba12',
                    required: true
                }), (0, class_validator_1.IsNotEmpty)({ message: 'El Password mo puede estar vacio' }), (0, class_validator_1.MinLength)(8)];
            __esDecorate(null, null, _firstname_decorators, { kind: "field", name: "firstname", static: false, private: false, access: { has: function (obj) { return "firstname" in obj; }, get: function (obj) { return obj.firstname; }, set: function (obj, value) { obj.firstname = value; } }, metadata: _metadata }, _firstname_initializers, _firstname_extraInitializers);
            __esDecorate(null, null, _lastname_decorators, { kind: "field", name: "lastname", static: false, private: false, access: { has: function (obj) { return "lastname" in obj; }, get: function (obj) { return obj.lastname; }, set: function (obj, value) { obj.lastname = value; } }, metadata: _metadata }, _lastname_initializers, _lastname_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RegisterDto = RegisterDto;
