export async function up(queryInterface: any, Sequelize: any) {
  await queryInterface.createTable('brands', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    image: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    createdUser: {
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 1,
    },
    updatedUser: {
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 1,
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
  await queryInterface.dropTable('brands');
}
