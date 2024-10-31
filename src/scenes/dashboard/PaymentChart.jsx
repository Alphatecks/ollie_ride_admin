import React, { useEffect } from "react";
import * as d3 from "d3";
import { Select } from "antd";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const PaymentModesChart = () => {
  useEffect(() => {
    // Set up dimensions and SVG canvas
    const width = 423;
    const height = 220;
    const svg = d3
      .select("#paymentModesChart")
      .attr("width", width)
      .attr("height", height);

    // Clear previous content
    svg.selectAll("*").remove();

    // Payment data
    const paymentModes = [
      { mode: "Debit Card", percentage: 50, color: "#DD1D1D", amount: 4070 },
      { mode: "Bank Transfer", percentage: 30, color: "#1D85E4", amount: 2680 },
      { mode: "Cash", percentage: 20, color: "#0C3569", amount: 2470 },
    ];

    // Define positions for the shapes
    const positions = [
      { x: width / 3, y: height / 2 },
      { x: width / 1.7, y: height / 3.2 + 0 }, // Moved down to avoid overlap
      { x: (2 * width) / 2.7, y: height / 1.9 - 0 }, // Moved up to avoid overlap
    ];

    // Draw Debit Card Circle
    svg
      .append("circle")
      .attr("cx", positions[0].x)
      .attr("cy", positions[0].y)
      .attr("r", 90) // Radius to make it visible
      .style("fill", paymentModes[0].color);

    svg
      .append("text")
      .attr("x", positions[0].x - 16)
      .attr("y", positions[0].y - 10) // Adjusted position for text
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "20px") // Font size
      .style("font-weight", "semi-bold")
      .text(`${paymentModes[0].percentage}%`);

    svg
      .append("text")
      .attr("x", positions[0].x)
      .attr("y", positions[0].y + 15) // Adjusted position for text
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "15px")
      .text(paymentModes[0].mode);

    // Draw Bank Transfer Heptagon
    const heptagonPoints = d3.range(7).map((i) => {
      const angle = (i * 2 * Math.PI) / 7;
      return [
        positions[1].x + 70 * Math.cos(angle), // Radius to make it visible
        positions[1].y + 70 * Math.sin(angle), // Radius to make it visible
      ];
    });

    svg
      .append("polygon")
      .attr("points", heptagonPoints.map((d) => d.join(",")).join(" "))
      .style("fill", paymentModes[1].color);

    svg
      .append("text")
      .attr("x", positions[1].x)
      .attr("y", positions[1].y - 20) // Adjusted position for text
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "20px") // Font size
      .style("font-weight", "semi-bold")
      .text(`${paymentModes[1].percentage}%`);

    svg
      .append("text")
      .attr("x", positions[1].x)
      .attr("y", positions[1].y + 0) // Adjusted position for text
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "8px")
      .text(paymentModes[1].mode);

    // Draw Cash Octagon
    const octagonPoints = d3.range(8).map((i) => {
      const angle = (i * 2 * Math.PI) / 8;
      return [
        positions[2].x + 60 * Math.cos(angle), // Radius to make it visible
        positions[2].y + 60 * Math.sin(angle), // Radius to make it visible
      ];
    });

    svg
      .append("polygon")
      .attr("points", octagonPoints.map((d) => d.join(",")).join(" "))
      .style("fill", paymentModes[2].color);

    svg
      .append("text")
      .attr("x", positions[2].x)
      .attr("y", positions[2].y - 10) // Adjusted position for text
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "16px") // Font size
      .style("font-weight", "bold")
      .text(`${paymentModes[2].percentage}%`);

    svg
      .append("text")
      .attr("x", positions[2].x)
      .attr("y", positions[2].y + 10) // Adjusted position for text
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "8px")
      .text(paymentModes[2].mode);

    // Legend
    const legend = d3.select("#legend");
    legend.selectAll("*").remove(); // Clear previous legend items

    paymentModes.forEach((mode) => {
      legend
        .append("div")
        .style("display", "flex")
        .style("align-items", "center")
        .style("margin-top", "5px")
        .html(
          `<span style="color: ${mode.color}">●</span> ${mode.mode} $${mode.amount}`
        );
    });
  }, []);

  return (
    <div className="bg-white px-4 rounded-[8px] py-6 w-full lg:max-w-md 2xl:w-full">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold">Most used mode of payment</h2>
          <p className="text-[9px] text-[#8095B2]">
            Sorem ipsum dolor sit amet consectetur
          </p>
        </div>
        <Select
          showSearch
          style={{
            width: "97px",
            height: "32px",
            fontSize: "14px",
            paddingLeft: "3px",
          }}
          placeholder={<span className="font-normal text-[11px]">Monthly</span>}
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

      {/* Chart Container */}
      <svg id="paymentModesChart" style={{ marginTop: "20px" }}></svg>

      {/* Legend */}
      <div id="legend" style={{ fontSize: "8px" }}></div>
    </div>
  );
};

export default PaymentModesChart;
