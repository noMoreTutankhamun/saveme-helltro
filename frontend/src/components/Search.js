// 각 정보를 보여주는 컴포넌트
// 추천 검색어
import React, { useState, useCallback, useEffect } from 'react';
import Chart from './Chart';

import { CardSubwayTime } from '../assets/subData.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const row = CardSubwayTime.row;

function Search() {
  const SearchJsonData = row.map((item, index) => {
    return {
      id: index,
      subName: item.SUB_STA_NM + ` | ${item.LINE_NUM}`,
    };
  });

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(`handleOnSearch====>`, string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(`handleOnHover=====>`, result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(`handleOnSelect====>`, item);
    const title = document.querySelector('.title');
    title.innerText = item.subName;
    return item;
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item) => {
    return item;
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  };

  return (
    <div className="App">
      <h1 className="title"></h1>
      <header className="App-header">
        <div style={{ width: 600 }}>
          <ReactSearchAutocomplete
            items={SearchJsonData}
            fuseOptions={{ keys: ['subName'] }}
            resultStringKeyName="subName"
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          ></ReactSearchAutocomplete>
        </div>
      </header>
      <main>
        <Chart onSelect={handleOnSelect}></Chart>
      </main>
    </div>
  );
}
export default Search;
