import React from "react";
import "./App.css";
import WorldMap from "./components/Map/WorldMap";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";

import fetch from "./utils/fetch";

function App() {
  const queryCache = new QueryCache();
  const { isLoading, data } = useQuery(
    "issPosition",
    () => fetch("http://api.open-notify.org/iss-now.json"),
    { refetchInterval: 10000 }
  );

  if (isLoading) {
    return <div>loading ...</div>;
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
