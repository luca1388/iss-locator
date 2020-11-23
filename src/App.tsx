import React, { useState } from "react";
import "./App.css";
import WorldMap from "./components/Map/WorldMap";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";

import fetch from "./utils/fetch";
import Loader from "./components/UI/Loader/Loader";

type centerType = {
  lat: number,
  lng: number
} | undefined;

function App() {
  const [ defaultCenter, setDefaultCenter ] = useState<centerType>();
  const queryCache = new QueryCache();
  const { isLoading, data } = useQuery(
    "issPosition",
    () => fetch("http://api.open-notify.org/iss-now.json"),
    { refetchInterval: 10000 }
  );

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size={80} width={12} />
      </div>
    );
  }

  if (!defaultCenter) {
    setDefaultCenter({
      lat: data.iss_position.latitude,
      lng: data.iss_position.longitude
    });
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <div className="App">
        <WorldMap
          zoom={2}
          center={{
            lat: defaultCenter?.lat ?? 0,
            lng: defaultCenter?.lng ?? 0,
          }}
          marker={{
            lat: data.iss_position.latitude,
            lng: data.iss_position.longitude,
          }}
        />
      </div>
    </ReactQueryCacheProvider>
  );
}

export default App;