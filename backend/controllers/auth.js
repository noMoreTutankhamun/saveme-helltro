import bcrypt from "bcrypt"; // 비밀번호 노출을 막기 위해 암호화해서 DB에 저장
import jwt from "jsonwebtoken"; // 로그인 정보가 회원 정보와 일치하면 jwt 토큰 발급
import * as userRepository from "../models/user.js"; // 데이터 접근을 위한 모델 참조
import { config } from "../config.js";

// 회원 가입
export async function signup(req, res) {
  const { email, nickname, password } = req.body;
  const user = await userRepository.findByEmail(email);
  // 이메일 중복 확인
  if (user) {
    return res.status(409).json({ message: `해당 이메일은 이미 존재합니다.` });
  }
  // 비밀번호 암호화
  const hashPwd = await bcrypt.hash(password, config.bcrypt.saltRounds);
  // 새 회원 정보
  const userId = await userRepository.createUser({
    email,
    nickname,
    password: hashPwd,
  });
  // 토큰 생성
  const token = createJwtToken(userId);
  res.status(201).json({ token, email });
}

// 로그인
export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  // 입력 받은 이메일이 회원 정보에 없다면 에러 반환
  if (!user) {
    return res
      .status(401)
      .json({ message: `유효하지 않은 로그인 정보입니다.` });
  }
  // 입력 받은 비밀번호가 해당 회원의 비밀번호와 일치하는지 확인
  const isValidPwd = await bcrypt.compare(password, user.password);
  if (!isValidPwd) {
    return res
      .status(401)
      .json({ message: `유효하지 않은 로그인 정보입니다.` });
  }
  // 일치한다면 토큰 생성
  const token = createJwtToken(user.id);
  res.status(200).json({ token, email });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

// isAuth 미들웨어를 통해 유저가 가지고 있는 토큰이 유효한 토큰인지 확인 후
// req.userId에 저장된 회원 id로 해당 회원 정보 조회
export async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "해당 회원을 찾지 못했습니다." });
  }
  res.status(200).json({ token: req.token, email: user.email });
}
