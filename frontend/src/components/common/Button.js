import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  display: inline-block;
  color: #fff;
  border: 2px solid ${palette.purple[2]};
  padding: 0.45rem 1rem;
  margin: 0rem;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.6rem;
  font-family: inherit;

  background-color: ${palette.purple[2]};
  &:hover {
    background-color: ${palette.purple[3]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.6rem;
      margin: 0;
      height: 4.8rem;
    `}
  ${(props) =>
    props.gray &&
    css`
      background-color: ${palette.gray[6]};
      &:hover {
        background-color: ${palette.gray[7]};
      }
    `}

    ${(props) =>
    props.marginLeft &&
    css`
      margin-left: 1rem;
    `}

    ${(props) =>
    props.inverted &&
    css`
      background: #fff;
      border: 2px solid ${palette.purple[1]};
      color: ${palette.purple[2]};
      box-sizing: border-box;
      &:hover {
        background-color: ${palette.gray[0]};
      }
    `}
`;

const Button = (props) => <StyledButton {...props} />;

// Button.defaultProps = {
//   theme: { main: 'purple' },
// };

export default Button;
