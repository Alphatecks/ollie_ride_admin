import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Select } from "antd";

// Define the container style for the map
const containerStyle = {
  width: '100%',
  height: '400px',
};

// Set the coordinates for Ikeja, Lagos
const center = {
    lat: 6.6018,
    lng: 3.3515,
  };

function RealTimeMap() {
  const [location, setLocation] = useState(center);

  return (
    <div className='mt-9 bg-white pt-[51px] pb-[34px] px-7'>

      <div className='mb-4'>
        <p>Real Time Map</p>
        <Select
                showSearch
                style={{
                  width: "140px",
                  height: "36px",
                  fontSize: "14px",
                  paddingLeft: "3px",
                  backgroundColor: isDarkMode ? "#484554" : "white",
                }}
                placeholder={
                  <span
                    style={{ color: isDarkMode ? "white" : "#334155" }}
                    className="font-normal text-[14px]"
                  >
                    Most Recent
                  </span>
                }
                optionFilterProp="label"
                options={[
                  { value: "Entertainment", label: "Entertainment" },
                  { value: "Movie", label: "Movie" },
                  { value: "Games", label: "Games" },
                ]}
                bordered={false}
                className={`custom-select ${
                  isDarkMode ? "border-none" : "border"
                }`}
                dropdownStyle={{
                  fontSize: "10px",
                }}
                suffixIcon={
                  <ChevronDown
                    className={`ml-[-16px] mt-[2px] w-3 h-3 ${
                      isDarkMode ? "text-white" : "text-black "
                    }`}
                  />
                }
              />
      </div>
    <LoadScript googleMapsApiKey="AIzaSyCwiyu1HxfDQFf5A9U4g_m4YLI21EzVuLg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
      >
        {/* Add a marker to the center location */}
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
    </div>
  );
}

export default RealTimeMap;
