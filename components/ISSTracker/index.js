import useSWR from "swr";
import Controls from "../Controls/index";
import Map from "../Map/index";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";
const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function ISSTracker() {
  const {
    data: issPosition,
    error,
    isLoading,
    mutate,
  } = useSWR(URL, fetcher, { refreshInterval: 5000 });

  if (isLoading) {
    return <h1>...loading...</h1>;
  }

  if (error) {
    return <h1>ISS position cannot be found: {error.message}</h1>;
  }

  return (
    <main>
      <Map longitude={issPosition.longitude} latitude={issPosition.latitude} />
      <Controls
        longitude={issPosition.longitude}
        latitude={issPosition.latitude}
        onRefresh={() => mutate()}
      />
    </main>
  );
}
