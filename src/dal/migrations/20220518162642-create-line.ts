module.exports = async function up(queryInterface: any, Sequelize: any) {
  await queryInterface.createTable('lines', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(),
    },
    nombre: {
      type: Sequelize.STRING(),
    },
    modeloId: {
      type: Sequelize.INTEGER(),
    },
    updateUser: {
      type: Sequelize.INTEGER(),
    },
    craetedUser: {
      type: Sequelize.INTEGER(),
    },
    enabled: {
      type: Sequelize.BOOLEAN(),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE(),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE(),
    },
  });
};
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('lines');
}
