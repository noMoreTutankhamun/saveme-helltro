import SQ from "sequelize";
import { sequelize } from "./index.js";
const DataTypes = SQ.DataTypes;

// users 엔티티 생성
export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

// 컨트롤러에서 함수를 사용해 데이터에 접근할 수 있게끔 함수를 export 해준다
export async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
}
