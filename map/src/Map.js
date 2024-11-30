import React, { useEffect, useState} from "react";
import MapGL, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import bbox from "@turf/bbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import ElevationProfile from "./ElevationProfile";

const Map = () => {
  const isMobile = window.innerWidth < 768;
  const [viewState, setViewState] = useState({
    latitude: 45.04962,
    longitude: -123.99459,
    zoom: isMobile ? 12.68 : 13.5,
    bearing: isMobile ? 120 : 65,
    pitch: isMobile ? 50 : 60,
  });

  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v12"
  );
  const [showTerrain, setShowTerrain] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [geojson, setGeojson] = useState(null);
  const [elevationData, setElevationData] = useState([]); // For elevation profile
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    fetch("/SmithRock.geojson")
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
          zoom: isMobile ? 13 : 14.9,
          bearing: isMobile ? 120 : 0,
          pitch: isMobile ? 50 : 50,
        }));
  
        // Extract elevation data
        const elevations = data.features
          .filter((feature) => feature.geometry.type === "Point")
          .map((feature) => parseFloat(feature.properties.Elevation || 0));
        setElevationData(elevations);
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
  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
    setMapStyle(
      isLightMode
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/light-v10"
    );
  };

  const getCircleColor = () => {
    if (showTerrain) return "#28282B"; 
    if (isLightMode) return "#28282B"; 
    return "#08ff08"; 
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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Map Container */}
      <div style={{ flex: 1, height: "70%" }}>
        <MapGL
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          width="100%"
          height="100%"
          mapStyle={mapStyle}
          terrain={{ source: "mapbox-dem", exaggeration: showTerrain ? 1.5 : 0 }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          scrollZoom={false}
          dragPan={false}
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
              style={{
                backgroundColor: "#08ff08",
                color: "#333",
                margin: "5px",
              }}
              onClick={toggleLightMode}
            >
                {isLightMode ? "Disable Light Mode" : "Enable Light Mode"}
            </button>
            <button
              style={{
                backgroundColor: "#08ff08",
                color: "#333",
                margin: "5px",
              }}
              onClick={() => setMapStyle("mapbox://styles/mapbox/dark-v10")}
            >
              Dark
            </button>
            <button
              style={{
                backgroundColor: "#08ff08",
                color: "#333",
                margin: "5px",
              }}
              onClick={() =>
                setMapStyle("mapbox://styles/mapbox/satellite-streets-v12")
              }
            >
              Satellite
            </button>
            <button
              style={{
                backgroundColor: "#08ff08",
                color: "#333",
                margin: "5px",
              }}
              onClick={toggleTerrain}
            >
              {showTerrain ? "Disable Terrain" : "Enable Terrain"}
            </button>
          </div>

          {geojson && (
            <Source id="my-data" type="geojson" data={geojson}>
              <Layer
                id="point-data"
                type="circle"
                paint={{
                  "circle-radius": isMobile ? 1 : 2.5,
                  "circle-color": getCircleColor(),
                }}
              />
            </Source>
          )}
        </MapGL>
      </div>

      {/* Elevation Profile */}
      <div
        style={{
          height: "30%",
          backgroundColor: "#2b2b2b",
          borderTop: "1px solid #ccc",
          overflow: "hidden",
        }}
      >
        <ElevationProfile elevationData={elevationData} />
      </div>
    </div>
  );
};

export default Map;

