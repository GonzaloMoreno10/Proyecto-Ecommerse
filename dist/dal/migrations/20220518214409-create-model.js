"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(queryInterface, Sequelize) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable('models', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            createdUser: {
                type: Sequelize.INTEGER,
            },
            updatedUser: {
                type: Sequelize.INTEGER,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                default: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    });
}
exports.up = up;
function down(queryInterface, Sequelize) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.dropTable('models');
    });
}
exports.down = down;
