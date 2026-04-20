module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Cart', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: "id"
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'user_id'
      },
      totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'total_quantity'
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'total_price'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at'
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at'
      }
    }, {
      tableName: 'cart',
    });
  };