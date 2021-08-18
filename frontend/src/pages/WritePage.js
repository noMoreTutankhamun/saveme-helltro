import React from 'react';
import Responsive from '../components/common/Responsive';
import Editor from '../components/write/Editor';
// import TagBox from '../components/write/TagBox';
import WriteActionButtons from '../components/write/WriteActionButtons';

const WritePage = () => {
  return (
    <Responsive>
      <Editor></Editor>
      {/* <TagBox></TagBox> */}
      <WriteActionButtons />
    </Responsive>
  );
};

export default WritePage;
