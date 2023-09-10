


import React from "react";
import Chart from "react-apexcharts";

const PieChartDemo = () => {
  const progress = 50; // Set the progress value to 80 (80% out of 100)

  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: "22px",
            color: "#fff",
            offsetY: 8,
            formatter: function (val) {
              return `${val}%`; // Format the value as a percentage with a % symbol
            },
          },
        },
      },
    },
    labels: ["Progress"],
  };

  const series = [progress];

  return (
    <div className="pie-chart">
      <div className="percentage-text">Chart</div>
      <Chart options={options} series={series} type="radialBar" width={300} height={350} />
    </div>
  );
};

export default PieChartDemo;




