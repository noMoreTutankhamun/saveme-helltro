import express from "express";
import "express-async-errors"; // async 함수에 대해 전역 에러 처리 지원
import cors from "cors"; // 외부 도메인 접근 허용
import morgan from "morgan"; // HTTP 요청에 대한 로그 출력
import helmet from "helmet"; // 보안 관련 HTTP 헤더 설정
import authRouter from "./routes/auth.js";
import { config } from "./config.js"; // 환경 변수를 보다 편하게 사용하기 위한 설정 파일
import { sequelize } from "./models/index.js"; // 시퀄라이즈 ORM 참조

const app = express();

app.use(express.json()); // for json-parsing
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

// 라우터 기본 도메인 정의
app.use("/auth", authRouter);

// 전역 에러 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// DB에서 데이터 불러온 후 서버 통신 시작
sequelize.sync().then(() => {
  app.listen(config.host.port);
});
