import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  display: inline-block;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0rem;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;

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
      font-size: 1.125rem;
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
      margin-left:0.8rem;
      }
    `}
`;

const Button = (props) => <StyledButton {...props} />;

// Button.defaultProps = {
//   theme: { main: 'purple' },
// };

export default Button;
