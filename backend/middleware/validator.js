import { validationResult } from "express-validator";

// 유효성 검사 시 에러를 출력하기 위한 내부 미들웨어
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
};
