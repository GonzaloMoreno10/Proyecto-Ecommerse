export async function up(queryInterface: any, Sequelize: any) {
  await queryInterface.createTable('models', {
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('models');
}
