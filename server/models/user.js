module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "user_id"
    },
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'token_id'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'name'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'password'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'avatar'
    },
    dayOfBirth: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'date_of_birth'
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'tel'
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'role'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'address'
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
    tableName: 'user',
  });
};