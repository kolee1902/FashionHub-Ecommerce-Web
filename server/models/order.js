module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Order', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: "id"
      },
      orderNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'order_no'
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: 'user_id'
      },
      cartId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: 'cart_id'
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'total_amount'
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'status'
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
      tableName: 'order',
    });
  };