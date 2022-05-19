export async function up(queryInterface: any, Sequelize: any) {
  await queryInterface.createTable('productTypes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    image: {
      type: Sequelize.STRING,
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
  await queryInterface.dropTable('productTypes');
}
