import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: [
    '04시~05시',
    '05시~06시',
    '06시~07시',
    '07시~08시',
    '08시~09시',
    '09시~10시',
    '10시~11시',
    '11시~12시',
    '12시~13시',
    '13시~14시',
    '14시~15시',
    '15시~16시',
    '16시~17시',
    '17시~18시',
    '18시~19시',
    '19시~20시',
    '20시~21시',
    '21시~22시',
    '22시~23시',
    '23시~24시',
    '00시~01시',
    '01시~02시',
    '02시~03시',
    '03시~04시',
  ],
  datasets: [
    {
      label: '서울대입구(관악구청)',
      data: [
        3483.0, 27115.0, 39350.0, 1.1, 2.3, 162572.0, 162572.0, 162572.0, 162572.0, 162572.0,
        162572.0, 162572.0, 162572.0, 69839.0, 69839.0, 69839.0, 162572.0, 162572.0, 55494.0,
        162572.0, 162572.0, 55494.0, 6395.0,
      ],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: '을지로입구',
      data: [
        162572.0, 162572.0, 162572.0, 3, 483.0, 27115.0, 53730, 162572.0, 162572.0, 162572.0,
        162572.0, 61880.0, 61880.0, 73120, 73120, 73120, 73120, 55252, 46269.0, 46269.0, 46269.0,
        46269.0, 46269.0, 46269.0, 46269.0, 46269.0, 46269,
      ],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
};

const options = {
  maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.

  scales: {
    xAxes: [
      {
        //   position: "top", //default는 bottom
        display: true,
        scaleLabel: {
          display: true,
          labelString: '시간(Hour)',
          fontFamily: 'Noto Sans KR',
          fontColor: 'black',
        },
        ticks: {
          // beginAtZero: true,
          maxTicksLimit: 10, //x축에 표시할 최대 눈금 수
        },
      },
    ],
    yAxes: [
      { labelString: '명' },
      {
        ticks: {
          min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
          stepSize: 1, // 스케일에 대한 사용자 고정 정의 값
        },
      },
    ],
  },
};

const Chart = () => {
  return (
    <div>
      <Line data={data} width={500} height={300} options={options} />
    </div>
  );
};

export default Chart;
