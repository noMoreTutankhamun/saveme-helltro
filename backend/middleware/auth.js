import jwt from "jsonwebtoken";
import * as userRepository from "../models/user.js";
import { config } from "../config.js";

const AUTH_ERROR = { message: "권한이 없는 사용자입니다. 로그인해주세요." };

// 로그인을 요청하는 유저가 가지고 있는 토큰이 유효한 토큰인지 확인하는 내부 미들웨어
export const isAuth = async (req, res, next) => {
  // 유저가 jwt 토큰이 필요한 API를 요청할 때, 클라이언트가 Authorization header에 Access token을 담아서 보낸다
  const authHeader = req.get("Authorization");

  // Authorization header에 값이 없거나 "Bearer"로 시작하지 않으면 Unauthorized 에러 반환
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }
  // Authorization: <인증 타입> <토큰>
  // (예시) Authorization: Bearer YWxhZGRpbjpvcGVuc2VzYW1l
  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    // 1. 토큰의 유효성 확인 : 유효하지 않은 토큰이면 에러 반환
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    // 2. 디코딩된 토큰 값 속 회원 id가 실제 회원 정보 안에 있는지 확인
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    // 유효한 토큰이면 다음 미들웨어에서 해당 회원 정보 조회하기 위해 회원 id를 req.userId 값에 새로 저장한다
    req.userId = user.id;
    req.token = token;
    next();
  });
};
