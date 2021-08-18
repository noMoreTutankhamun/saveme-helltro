import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import useInput from '../hooks/useInput';
import { loginAction } from '../redux/user';
import axios from 'axios';
import Button from '../components/common/Button';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const history = useHistory();

  const onSubmitLogin = useCallback(
    (e) => {
      e.preventDefault();

      axios
        .post('auth/login', { email, password })
        .then((res) => {
          if (res.status === 200) {
            window.localStorage.setItem('token', res.data.token);
            dispatch(loginAction({ email, password }));
            alert('로그인 성공 !');
            history.push('/');
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
    [email, password],
  );

  return (
    <div className="auth-form">
      <h2>LOGIN</h2>
      <form onSubmit={onSubmitLogin}>
        <p>
          <label htmlFor="email">
            이메일
            <br />
            <input name="email" type="email" value={email} onChange={onChangeEmail} required />
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
          <Button fullWidth>로그인</Button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
