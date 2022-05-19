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
        yield queryInterface.createTable('brandModelLines', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            brandId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'brands',
                    key: 'id',
                },
            },
            modelId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'models',
                    key: 'id',
                },
            },
            lineId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'lines',
                    key: 'id',
                },
            },
            createdUser: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            updatedUser: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        yield queryInterface.dropTable('brandModelLines');
    });
}
exports.down = down;
