module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Payment', {
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
        field: 'user_id'
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'price'
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'discount'
      },
      discountAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'discount_amount'
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'total_amount'
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'payment_method'
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'status'
      },
      discountCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'discount_code'
      },
      paymentConfirmDate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'payment_confirmation_date'
      },
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'shipping_address'
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'notes'
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
      tableName: 'payment',
    });
  };