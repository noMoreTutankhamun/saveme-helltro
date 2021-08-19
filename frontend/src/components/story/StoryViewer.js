import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const StoryViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const StoryHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.4rem;
    line-height: 1.5;
    margin: 0;
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

const StoryContent = styled.div`
  font-size: 1.6rem;
  color: ${palette.gray[8]};
`;

const StoryViewer = () => {
  return (
    <StoryViewerBlock>
      <StoryHead>
        <h1>제목</h1>
        <SubInfo>
          <span>
            <b>tester</b>
          </span>
          <span>{new Date().toLocaleDateString()}</span>
        </SubInfo>
      </StoryHead>
      <StoryContent dangerouslySetInnerHTML={{ __html: '<p>HTML <b>내용</b>입니다</p>' }} />
    </StoryViewerBlock>
  );
};

export default StoryViewer;
