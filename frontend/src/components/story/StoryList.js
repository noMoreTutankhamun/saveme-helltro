import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;
const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]};

  span + span:before {
    color: ${palette.gray[5]};
    padding: 0 0.25rem;
    content: '\\B7';
  }
`;

const StoryItem = () => {
  return (
    <PostItemBlock>
      <h2>제목</h2>
      <SubInfo>
        <span>
          <b>username</b>
        </span>
        <span>{new Date().toLocaleDateString()}</span>
      </SubInfo>
      <p>포스트 내용 일부</p>
    </PostItemBlock>
  );
};

const StoryList = () => {
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        <Button gray to="/write">
          새 글 작성하기
        </Button>
      </WritePostButtonWrapper>
      <div>
        <StoryItem />
        <StoryItem />
        <StoryItem />
      </div>
    </PostListBlock>
  );
};

export default StoryList;
