import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Select } from "antd";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

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

      <div className='mb-4 flex justify-between'>
        <p>Real Time Map</p>
        <Select
                showSearch
                style={{
                  width: "97px",
                  height: "36px",
                  fontSize: "14px",
                  paddingLeft: "3px",
                }}
                placeholder={
                  <span
                    style={{ }}
                    className="font-normal text-[11px]"
                  >
                    Driver
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
                  style={{fontSize: 14}}
                    className={` mt-[2px] `}
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
