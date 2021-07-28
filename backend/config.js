import dotenv from "dotenv"; // .env 파일에 정의한 변수를 환경 변수로 등록
dotenv.config();

// config에서 등록되지 않은 환경 변수를 정의하면 서버 통신 시작할 때 콘솔에 경고 띄움
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    // jwt 토큰 발급을 위한 secretKey와 토큰 만료 기한
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)), // 2일
  },
  bcrypt: {
    // 비밀번호 암호화를 위해 필요한 salt
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  host: {
    // 기본 포트 설정
    port: parseInt(required("HOST_PORT", 8080)),
  },
  db: {
    // DB 접근을 위한 설정 정보
    development: {
      host: required("DB_HOST"),
      user: required("DB_USER"),
      database: required("DB_DATABASE"),
      password: required("DB_PASSWORD"),
      port: parseInt(required("DB_PORT", 3306)),
    },
  },
  env: required("NODE_ENV", "development"), // DB 모드 변경을 위한 환경 변수 설정 : development/test/production
};
