"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var jogadores_module_1 = require("./jogadores/jogadores.module");
var mongoose_1 = require("@nestjs/mongoose");
var categorias_module_1 = require("./categorias/categorias.module");
var desafios_module_1 = require("./desafios/desafios.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:vaHK1REOAKSi0kP1@cluster0.n53km.mongodb.net/smartranking?retryWrites=true&w=majority', {
                    useCreateIndex: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false
                }),
                jogadores_module_1.JogadoresModule,
                categorias_module_1.CategoriasModule,
                desafios_module_1.DesafiosModule
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
