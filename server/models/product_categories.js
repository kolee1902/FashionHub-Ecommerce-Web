module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ProductCategories', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: "id"
      },
      cateName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'cat_name'
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'created_by'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
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
      tableName: 'product_categories',
    });
  };