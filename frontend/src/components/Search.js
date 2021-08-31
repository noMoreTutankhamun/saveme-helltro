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
    let result = {};
    if (obj.hasOwnProperty('EIGHT_RIDE_NUM') === true) {
      const apiData = Object.keys(obj);
      let ridekeys = apiData.filter((x) => {
        return x.indexOf('_RIDE') > -1;
      });
      for (const txt of ridekeys) {
        //txt는 rideKeys의 string 값 (key값)
        result[txt] = obj[txt];
      }
      let datas = {};
      datas['04시-05시'] = result['FOUR_RIDE_NUM'];
      datas['05시-06시'] = result['FIVE_RIDE_NUM'];
      datas['06시-07시'] = result['SIX_RIDE_NUM'];
      datas['07시-08시'] = result['SEVEN_RIDE_NUM'];
      datas['08시-09시'] = result['EIGHT_RIDE_NUM'];
      datas['09시-10시'] = result['NINE_RIDE_NUM'];
      datas['10시-11시'] = result['TEN_RIDE_NUM'];
      datas['11시-12시'] = result['ELEVEN_RIDE_NUM'];
      datas['12시-13시'] = result['TWELVE_RIDE_NUM'];
      datas['13시-14시'] = result['THIRTEEN_RIDE_NUM'];
      datas['14시-15시'] = result['FOURTEEN_RIDE_NUM'];
      datas['15시-16시'] = result['FIFTEEN_RIDE_NUM'];
      datas['16시-17시'] = result['SIXTEEN_RIDE_NUM'];
      datas['17시-18시'] = result['SEVENTEEN_RIDE_NUM'];
      datas['18시-19시'] = result['EIGHTEEN_RIDE_NUM'];
      datas['19시-20시'] = result['NINETEEN_RIDE_NUM'];
      datas['20시-21시'] = result['TWENTY_RIDE_NUM'];
      datas['21시-22시'] = result['TWENTY_ONE_RIDE_NUM'];
      datas['22시-23시'] = result['TWENTY_TWO_RIDE_NUM'];
      datas['23시-24시'] = result['TWENTY_THREE_RIDE_NUM'];
      datas['00시-01시'] = result['MIDNIGHT_RIDE_NUM'];
      datas['01시-02시'] = result['ONE_RIDE_NUM'];
      datas['02시-03시'] = result['TWO_RIDE_NUM'];
      datas['03시-04시'] = result['THREE_RIDE_NUM'];
      result = null;
      return datas;
    } else {
      console.log('API 연결 실패');
    }
  }

  function isALIGHT(obj) {
    let result = {};
    if (obj.hasOwnProperty('EIGHT_ALIGHT_NUM') === true) {
      const apiData = Object.keys(obj);
      let ridekeys = apiData.filter((x) => {
        return x.indexOf('_ALIGHT') > -1;
      });
      for (const txt of ridekeys) {
        //txt는 rideKeys의 string 값 (key값)
        result[txt] = obj[txt];
      }
      let datas = {};
      datas['04시-05시'] = result['FOUR_ALIGHT_NUM'];
      datas['05시-06시'] = result['FIVE_ALIGHT_NUM'];
      datas['06시-07시'] = result['SIX_ALIGHT_NUM'];
      datas['07시-08시'] = result['SEVEN_ALIGHT_NUM'];
      datas['08시-09시'] = result['EIGHT_ALIGHT_NUM'];
      datas['09시-10시'] = result['NINE_ALIGHT_NUM'];
      datas['10시-11시'] = result['TEN_ALIGHT_NUM'];
      datas['11시-12시'] = result['ELEVEN_ALIGHT_NUM'];
      datas['12시-13시'] = result['TWELVE_ALIGHT_NUM'];
      datas['13시-14시'] = result['THIRTEEN_ALIGHT_NUM'];
      datas['14시-15시'] = result['FOURTEEN_ALIGHT_NUM'];
      datas['15시-16시'] = result['FIFTEEN_ALIGHT_NUM'];
      datas['16시-17시'] = result['SIXTEEN_ALIGHT_NUM'];
      datas['17시-18시'] = result['SEVENTEEN_ALIGHT_NUM'];
      datas['18시-19시'] = result['EIGHTEEN_ALIGHT_NUM'];
      datas['19시-20시'] = result['NINETEEN_ALIGHT_NUM'];
      datas['20시-21시'] = result['TWENTY_ALIGHT_NUM'];
      datas['21시-22시'] = result['TWENTY_ONE_ALIGHT_NUM'];
      datas['22시-23시'] = result['TWENTY_TWO_ALIGHT_NUM'];
      datas['23시-24시'] = result['TWENTY_THREE_ALIGHT_NUM'];
      datas['00시-01시'] = result['MIDNIGHT_ALIGHT_NUM'];
      datas['01시-02시'] = result['ONE_ALIGHT_NUM'];
      datas['02시-03시'] = result['TWO_ALIGHT_NUM'];
      datas['03시-04시'] = result['THREE_ALIGHT_NUM'];
      result = null;
      return datas;
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

      console.log('test=====>', isRIDE(response.data.CardSubwayTime.row[0]));

      setChart({
        labels: Object.keys(isRIDE(response.data.CardSubwayTime.row[0])),
        datasets: [
          {
            label: `${query2} 승차인원`,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            data: Object.values(isRIDE(response.data.CardSubwayTime.row[0])),
          },
          {
            label: `${query2} 하차인원`,
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
            data: Object.values(isALIGHT(response.data.CardSubwayTime.row[0])),
          },
        ],
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="search">
      <h1 style={{ margin: 30 }}>
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
      <main style={{ marginLeft: 40, marginRight: 50 }}>
        {chart.labels && <Chart data={chart} />}
      </main>
    </div>
  );
}
export default Search;
