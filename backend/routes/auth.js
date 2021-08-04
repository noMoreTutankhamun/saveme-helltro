import express from "express";
import "express-async-errors";
import { body, validationResult } from "express-validator";
import { validate } from "../middleware/validator.js"; // 유효성 검사 시 에러를 출력하기 위한 내부 미들웨어
import * as authController from "../controllers/auth.js"; // auth 주요 로직을 담당하는 컨트롤러 연결
import { isAuth } from "../middleware/auth.js"; // 회원 인증을 위한 내부 미들웨어

const router = express.Router();

// DB 데이터를 바꾸기 직전에 백엔드에서 유효성 검사 추가 실시
const validateCredential = [
  body("email").trim().isEmail().withMessage("유효하지 않은 이메일입니다."),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("비밀번호는 5글자 이상 입력해주세요."),
];

const validateSignup = [
  ...validateCredential,
  body("nickname").trim().notEmpty().withMessage("닉네임을 입력해주세요."),
];

// REST API 구조를 보기 쉽도록 주요 로직은 controller로 분리
router.post("/signup", validateSignup, validate, authController.signup);
router.post("/login", validateCredential, validate, authController.login);
router.get("/me", isAuth, authController.me);

export default router;
