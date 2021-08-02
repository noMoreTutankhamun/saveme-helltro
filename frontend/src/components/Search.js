// 추천 검색어와 검색결과 차트 컴포넌트
import React, { useState } from 'react';
import Chart from './Chart';
import { CardSubwayTime } from '../assets/subData.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const row = CardSubwayTime.row;

function Search() {
  const [subData, setSubData] = useState(null);
  const SearchJsonData = row.map((item, index) => {
    return {
      id: index,
      subName: item.SUB_STA_NM + ` | ${item.LINE_NUM}`,
      subNum: item.LINE_NUM,
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
    setSubData(item.subName);
    return item;
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item) => {
    return item;
  };

  return (
    <div className="search">
      <h1 style={{ margin: 20 }}>
        🚎 {subData ? `${subData}` : `지난 달 우리 역은 얼마나 많은 사람이 이용했을까?`}
      </h1>
      <div style={{ margin: 20 }}>
        <div style={{ width: '80vw' }}>
          <ReactSearchAutocomplete
            items={SearchJsonData}
            fuseOptions={{ keys: ['subName', 'subNum'] }}
            placeholder="찾고싶은 역을 검색하세요"
            resultStringKeyName="subName"
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          ></ReactSearchAutocomplete>
        </div>
      </div>
      <main style={{ marginLeft: 40, marginRight: 50 }}>
        <Chart></Chart>
      </main>
    </div>
  );
}
export default Search;
