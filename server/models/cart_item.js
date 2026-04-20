module.exports = function(sequelize, DataTypes) {
    return sequelize.define('CartItem', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: "id"
      },
      cartId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'cart_id'
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'product_id'
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quantity'
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'price'
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
      tableName: 'cart_item',
    });
  };