import Header from './components/Header';
import Footer from './components/Footer';
//import Chart from './components/Chart';
import Search from './components/Search';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        'http://openapi.seoul.go.kr:8088/6f71614d4a6a6f6a37376376784869/json/CardSubwayTime/1/30/202005/2호선/서울대입구(관악구청)',
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <Header />

      <Search />
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}

      <Footer />
    </div>
  );
};

export default App;
