import mysql from "mysql2"; // Node.js와 mysql을 연결해주는 mysql2 패키지 참조
import { config } from "../config.js";
import SQ from "sequelize";

// 중요 정보가 노출되지 않도록 정보는 .env에 적고 config.js에서 관리
const { host, user, database, password } = config.db[config.env];

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false, // 서버 실행할 때마다 콘솔에 쿼리 로그 뜨지 않게
});
