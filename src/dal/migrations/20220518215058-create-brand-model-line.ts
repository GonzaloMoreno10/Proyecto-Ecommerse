export async function up(queryInterface: any, Sequelize: any) {
  await queryInterface.createTable('brandModelLines', {
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('brandModelLines');
}
