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

  function isRIDE(obj) {
    //1. hasOwnProperty()메서드를 통해 원하는 정보가 담긴 api가 연결 됐는지 확인 + 원하는 api 연결 안되었으면 실패 표시
    let result = {};
    if (obj.hasOwnProperty('EIGHT_RIDE_NUM') === true) {
      //2. Object.keys 를 통해 프로퍼티 객체의 키를 배열로 리턴한다
      const apiData = Object.keys(obj);
      //3. indexOf로 리턴한 apiData 배열 중에 '_RIDE'를 가진 배열만 리턴
      let ridekeys = apiData.filter((x) => {
        return x.indexOf('_RIDE') > -1;
      });
      // 4.obj의 값과 연결
      for (const txt of ridekeys) {
        //txt는 rideKeys의 string 값(key값)
        result[txt] = obj[txt];
      }
      return result;
    } else {
      console.log('API 연결 실패');
    }
  }

  useEffect(() => {
    fetchData();
  }, [subName]);

  const fetchData = async () => {
    try {
      const query1 = subNum;
      const query2 = subName;
      const response = await axios.get(
        `http://openapi.seoul.go.kr:8088/6f71614d4a6a6f6a37376376784869/json/CardSubwayTime/1/608/202106/${query1}/${query2}`,
      );

      // console.log('test=====>', isRIDE(response.data.CardSubwayTime.row[0]));

      setChart({
        labels: Object.keys(isRIDE(response.data.CardSubwayTime.row[0])),
        datasets: [
          {
            label: query2,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            data: Object.values(isRIDE(response.data.CardSubwayTime.row[0])),
          },
        ],
      });
    } catch (error) {
      console.log(error.response);
    }
  };

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
      <main style={{ marginLeft: 40, marginRight: 50 }}>{chart && <Chart data={chart} />}</main>
    </div>
  );
}
export default Search;
