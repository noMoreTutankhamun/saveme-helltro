import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useInput from '../hooks/useInput';
import Button from '../components/common/Button';

const SignupPage = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const history = useHistory();

  const onSubmitSignup = useCallback(
    (e) => {
      e.preventDefault();

      axios
        .post('auth/signup', { email, nickname, password })
        .then((res) => {
          if (res.status === 201) {
            window.localStorage.setItem('token', res.data.token);
            alert('회원 가입 성공 !');
            history.push('/login');
          } else {
            alert(res.statusText);
          }
        })
        .catch((err) =>
          err.response.data.message
            ? alert(err.response.data.message)
            : alert(err.response.statusText),
        );
    },
    [email, nickname, password],
  );

  return (
    <div className="auth-form">
      <h2>JOIN</h2>
      <form onSubmit={onSubmitSignup}>
        <p>
          <label htmlFor="email">
            이메일
            <br />
            <input name="email" type="email" value={email} onChange={onChangeEmail} required />
          </label>
        </p>
        <p>
          <label htmlFor="nickname">
            닉네임
            <br />
            <input
              name="nickname"
              type="text"
              value={nickname}
              onChange={onChangeNickname}
              required
            />
          </label>
        </p>
        <p>
          <label htmlFor="password">
            비밀번호
            <br />
            <input
              name="password"
              type="password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </label>
        </p>
        <p>
          <Button fullWidth>회원가입</Button>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
