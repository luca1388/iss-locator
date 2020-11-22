import React from "react";
import "./App.css";
import WorldMap from "./components/Map/WorldMap";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";

import fetch from "./utils/fetch";
import Loader from "./components/UI/Loader/Loader";

function App() {
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

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <div className="App">
        <WorldMap
          zoom={2}
          center={{
            lat: data.iss_position.latitude,
            lng: data.iss_position.longitude,
          }}
        />
      </div>
    </ReactQueryCacheProvider>
  );
}

export default App;