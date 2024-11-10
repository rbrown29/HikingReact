import React, { useEffect, useState } from "react";
import MapGL, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import bbox from "@turf/bbox"; // Add this line
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const Map = () => {
  const isMobile = window.innerWidth < 768;
  const [viewState, setViewState] = useState({
    latitude: 45.04962,
    longitude: -123.99459,
    zoom: isMobile ? 12.68 : 15,
    bearing: isMobile ? 120 : 60,
    pitch: isMobile ? 50 : 50,
  });

  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v12"
  );
  const [showTerrain, setShowTerrain] = useState(false);
  const [geojson, setGeojson] = useState(null);
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    fetch("/BattleAxLoopHike.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setGeojson(data);

        // Calculate bounding box and update view state to fit bounds
        const [minLng, minLat, maxLng, maxLat] = bbox(data);
        setViewState((prevState) => ({
          ...prevState,
          longitude: (minLng + maxLng) / 2,
          latitude: (minLat + maxLat) / 2,
          zoom: isMobile ? 12 : 13.5, // Adjust zoom level
        }));
      })
      .catch((error) =>
        console.error("Error fetching the GeoJSON file:", error)
      );
  }, [draw, isMobile]);

  const toggleTerrain = () => {
    setShowTerrain(!showTerrain);
    setMapStyle(
      showTerrain
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/outdoors-v12"
    );
  };

  useEffect(() => {
    if (!draw) {
      const newDraw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          point: true,
          line_string: true,
          polygon: true,
          trash: true,
        },
      });
      setDraw(newDraw);
    }
  }, [draw]);

  return (
    <MapGL
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      width="100%"
      height="100vh"
      mapStyle={mapStyle}
      terrain={{ source: "mapbox-dem", exaggeration: showTerrain ? 1.5 : 0 }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onLoad={(e) => e.target.addControl(draw)}
    >
      <NavigationControl
        style={{ backgroundColor: "#08ff08", color: "#333", margin: "5px" }}
        showZoom
        position="top-right"
      />
      <ScaleControl
        style={{ backgroundColor: "#08ff08", color: "#333", margin: "5px" }}
        maxWidth={100}
        unit="imperial"
        position="bottom-right"
      />
      <GeolocateControl
        style={{ backgroundColor: "#08ff08", color: "#333", margin: "5px" }}
        position="top-right"
        trackUserLocation
      />
      <FullscreenControl
        style={{ backgroundColor: "#08ff08", color: "#333", margin: "5px" }}
        position="top-right"
      />

      {/* Layer Selector */}
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
        <button
          style={{ backgroundColor: "#08ff08", color: "#333", margin: "5px" }}
          onClick={() => setMapStyle("mapbox://styles/mapbox/light-v10")}
        >
          Light
        </button>
        <button
          style={{ backgroundColor: "#08ff08", color: "#333", margin: "5px" }}
          onClick={() => setMapStyle("mapbox://styles/mapbox/dark-v10")}
        >
          Dark
        </button>
        <button
          style={{ backgroundColor: "#08ff08", color: "#333", margin: "5px" }}
          onClick={() =>
            setMapStyle("mapbox://styles/mapbox/satellite-streets-v12")
          }
        >
          Satellite
        </button>
        <button
          style={{ backgroundColor: "#08ff08", color: "#333", margin: "5px" }}
          onClick={toggleTerrain}
        >
          {showTerrain ? "Disable Terrain" : "Enable Terrain"}
        </button>
      </div>

      {geojson && (
        <Source id="my-data" type="geojson" data={geojson}>
          {/* Line Layer */}
          <Layer
            id="point-data"
            type="circle"
            paint={{
              "circle-radius": isMobile ? 1 : 2.5,
              "circle-color": "#08ff08",
            }}
          />
        </Source>
      )}
    </MapGL>
  );
};

export default Map;
