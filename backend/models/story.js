import SQ from "sequelize";
import { sequelize } from "./index.js";
import { User } from "./user.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Story = sequelize.define("story", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  stationName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});
Story.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    "id",
    "title",
    "content",
    "stationName",
    "createdAt",
    "userId",
    [Sequelize.col("user.email"), "email"],
    [Sequelize.col("user.nickname"), "nickname"],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = {
  order: [["createdAt", "DESC"]],
};

export async function getAll() {
  return Story.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByStationName(stationName) {
  return Story.findAll({
    where: { stationName },
    ...INCLUDE_USER,
  });
}

export async function getById(id) {
  return Story.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
}

export async function create(title, content, stationName, userId) {
  return Story.create({ title, content, stationName, userId }) //
    .then((data) => this.getById(data.dataValues.id));
}

export async function update(id, title, content) {
  return Story.findByPk(id, INCLUDE_USER) //
    .then((story) => {
      story.title = title;
      story.content = content;
      return story.save();
    });
}

export async function remove(id) {
  return Story.findByPk(id) //
    .then((story) => {
      story.destroy();
    });
}