// 추천 검색어와 검색결과 차트 컴포넌트
import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import { DATA } from '../assets/subData.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import axios from 'axios';

function Search() {
  const [subName, setSubName] = useState(null);
  const [subNum, setSubNum] = useState(null);
  const SearchJsonData = DATA.map((item, index) => {
    return {
      id: index,
      subName: item.sub_sta_nm,
      subNum: item.line_num,
    };
  });

  const handleOnSelect = (item) => {
    // the item selected
    console.log(`handleOnSelect====>`, item);
    setSubName(item.subName);
    setSubNum(item.subNum);
    return item;
  };

  const formatResult = (item) => {
    return item;
  };

  // chart.js
  const [chart, setChart] = useState({});

  function isRIDE(key) {
    if (key.includes('RIDE') === true) {
      return key;
    }
  }

  useEffect(() => {
    fetchData();
  }, [SearchJsonData]);

  const fetchData = async () => {
    try {
      const query1 = subNum;
      const query2 = subName;
      const response = await axios.get(
        `http://openapi.seoul.go.kr:8088/6f71614d4a6a6f6a37376376784869/json/CardSubwayTime/1/608/202106/${query1}/${query2}`,
      );

      console.log('응답테스트========>', response);
      console.log('test=====>', Array.isArray(response.data.CardSubwayTime.row));

      setChart({
        labels: [Object.keys(response.data.CardSubwayTime.row.filter(isRIDE))],
        datasets: [
          {
            label: '테스트',
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            data: Object.values(response.data.CardSubwayTime.row),
          },
        ],
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  console.log('차트가있어???=====>', chart);
  return (
    <div className="search">
      <h1 style={{ margin: 20 }}>
        🚎 {subName ? `${subName}|${subNum}` : `지난 달 우리 역은 얼마나 많은 사람이 이용했을까?`}
      </h1>
      <div style={{ margin: 20 }}>
        <div style={{ width: '80vw' }}>
          <ReactSearchAutocomplete
            items={SearchJsonData}
            fuseOptions={{ keys: ['subName', 'subNum'] }}
            placeholder="찾고싶은 역을 검색하세요"
            resultStringKeyName="subName"
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
          ></ReactSearchAutocomplete>
        </div>
      </div>
      <main style={{ marginLeft: 40, marginRight: 50 }}>{chart ? <Chart data={chart} /> : ''}</main>
    </div>
  );
}
export default Search;
