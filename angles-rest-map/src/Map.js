import React, { useEffect, useState } from 'react';
import MapGL, { Source, Layer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
   const isMobile = window.innerWidth < 768;
    const [viewport, setViewport] = useState({
        latitude: 44.3118,
        longitude:  -122.02616,
        zoom: isMobile ? 12.68 : 14.20,
        bearing: isMobile ? 120 : 100,
        pitch: isMobile ? 50 : 50,
    });

    const [geojson, setGeojson] = useState(null);

    useEffect(() => {
        fetch('/TamolitchPoolHike.geojson')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => setGeojson(data))
            .catch((error) => console.error('Error fetching the GeoJSON file:', error));
    }, []);
    console.log(geojson);
    const mapStyle = 'mapbox://styles/digit9/clxi9m3kh005u01pugx4x23n6';

    return (
        <MapGL
            {...viewport}
            width="100%"
            height="100vh"
            mapStyle={mapStyle}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
            {geojson && (
                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer
                        id="point-data"
                        type="circle"
                        paint={{
                            'circle-radius': isMobile ? 1 : 2.5,
                            'circle-color': '#9C9177',
                        }}
                    />
                </Source>
            )}
        </MapGL>
    );
};

export default Map;





