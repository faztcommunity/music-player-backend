import { Model, DataTypes, ModelCtor } from 'sequelize';

const PROTECTED_ATTRIBUTES: string[] = ['password', 'token'];

class User extends Model {}

function userModel(): ModelCtor<User> {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.CHAR(20),
        allowNull: false
      },
      email: {
        type: DataTypes.CHAR(20),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize: global.database,
      modelName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      scopes: {
        protected: {
          attributes: {
            exclude: PROTECTED_ATTRIBUTES
          }
        }
      }
    }
  );

  return User;
}

export { userModel, User };
