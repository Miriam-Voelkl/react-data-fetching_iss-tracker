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
  } = useSWR(URL, fetcher, { refreshInterval: 5000 });

  if (isLoading) {
    return <h1>...loading...</h1>;
  }

  if (error) {
    return <h1>ISS position cannot be found: {error.message}</h1>;
  }

  /* const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });

  async function getISSCoords() {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        setCoords({ longitude: data.longitude, latitude: data.latitude });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getISSCoords();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []); 
  */

  return (
    <main>
      <Map longitude={issPosition.longitude} latitude={issPosition.latitude} />
      <Controls
        longitude={issPosition.longitude}
        latitude={issPosition.latitude}
        // onRefresh={getISSCoords}
      />
    </main>
  );
}
