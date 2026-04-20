module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: "id"
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
      },
      describe: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'describe'
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'price'
      },
      inventory: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'inventory'
      },
      cateId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'cat_id'
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'image'
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'brand'
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'status'
      },
      countLikes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'count_likes'
      },
      createdBy:{
        type: DataTypes.STRING,
        allowNull: true,
        field: 'created_by'
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
      tableName: 'product',
    });
  };