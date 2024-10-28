import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Select } from "antd";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

// Register necessary Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ isDarkMode }) => {
  // Bar chart data
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [400, 700, 720, 500, 700, 720, 700, 500, 430, 580, 720, 740],
        backgroundColor: "#1C4E80",
        borderWidth: 1,
        barPercentage: 0.3,
        categoryPercentage: 0.8,
        borderRadius: 5,
      },
    ],
  };

  // Configuration options with custom grid lines and styling
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 800,
        ticks: {
          stepSize: 200,
          color: isDarkMode ? '#FFFFFF' : '#64748B',
          padding: 0,
          font: {
            size: 7,
            weight: 500, // Set font weight to 500 for Y-axis
          },
        },
        grid: {
          display: true,
          drawBorder: false, // Remove the Y-axis line
          color: function (context) {
            return context.tick.value % 200 === 0 ? "#F1F5F9" : "transparent";
          },
        },
        border: {
          display: false, // Remove the border line for the Y-axis
        },
      },
      x: {
        ticks: {
          padding: 2,
          font: {
            size: 7,
            weight: 500, // Set font weight to 500 for X-axis
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="lg:w-[438px] w-full bg-white rounded-[8px] 2xl:w-full">
      {/* Title Section */}
      <div className="">
        <div className="flex justify-between p-4">
          <div>
            <h2 className="font-medium mb-2 2xl:text-lg">Total income generated</h2>
            <p className="text-gray-500 mb-4 text-[9px] 2xl:text-sm">
              Sorem ipsum dolor sit amet consectetur
            </p>
          </div>
          <Select
            showSearch
            style={{
              width: "97px",
              height: "36px",
              fontSize: "14px",
              paddingLeft: "3px",
            }}
            placeholder={
              <span className="font-normal text-[11px] 2xl:text-sm">
                Today
              </span>
            }
            optionFilterProp="label"
            options={[
              { value: "Entertainment", label: "Entertainment" },
              { value: "Movie", label: "Movie" },
              { value: "Games", label: "Games" },
            ]}
            bordered={false}
            className={`custom-select border rounded-[4px]`}
            dropdownStyle={{
              fontSize: "10px",
            }}
            suffixIcon={
              <ExpandMoreOutlinedIcon
                style={{ fontSize: 14 }}
                className={`mt-[2px] `}
              />
            }
          />
        </div>
        {/* Earnings Info */}
        <div className="flex justify-around mb-4">
          <div className="text-center">
            <h3 className="font-medium 2xl:text-lg">$10,500</h3>
            <p className="text-gray-500 text-[9px] 2xl:text-sm">Earning this month</p>
          </div>
          <div className="text-center">
            <h3 className="font-medium 2xl:text-lg">$140,500</h3>
            <p className="text-gray-500 text-[9px] 2xl:text-sm">Total earnings</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        className="border border-[#F1F5F9] rounded-[5px] 2xl:w-full xl:w-[438px] h-[250px] "
        style={{
          paddingBottom: "20px",
          paddingRight: "30px",
          paddingLeft: "30px",
          paddingTop: "20px",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
