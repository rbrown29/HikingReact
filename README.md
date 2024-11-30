# Hiking Map Application

A React-based application that visualizes hiking trails using Mapbox GL and GeoJSON data. This app includes features like interactive map controls, dynamic centering based on GeoJSON data, and the ability to add custom map layers and styles. This is add on Map for my Oregon Hikes Project.

### Links To Oregon Hikes project and live Site.
- https://oregon-hikes.onrender.com/
- https://github.com/rbrown29/Oregon-Hikes

## Features

- Interactive map with zoom, rotation, and terrain controls.
- Dynamic centering to fit the map view based on the loaded GeoJSON data.
- Multiple map styles (light, dark, streets, satellite).
- Customizable map controls (fullscreen, scale, navigation).
- Mapbox Draw integration for adding and editing points, lines, and polygons.
- Elevation chart using Chart.js to visualize trail elevation data.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- A Mapbox Access Token – [sign up here](https://account.mapbox.com/auth/signup/) if you don’t have one.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/HikingReact.git
   cd HikingReact

    ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add your Mapbox Access Token
   
   ```bash
    REACT_APP_MAPBOX_ACCESS_TOKEN=your.mapbox.access.token
    ```
4. **Start the development server:**

   ```bash
   npm start
   ```
5. **Open the app:**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure
- src/Map.js – Main map component, configured with Mapbox GL and custom controls.
- public/ – Place any static assets like CascadeHeadHike.geojson here.
- .env – Environment file to store the Mapbox API key.

### Usage
1. View the Hiking Map:

- The map will center automatically based on the loaded GeoJSON file.
2. Change Map Style:

- Use the style buttons in the top-left corner to switch between Light, Dark, Streets, and Satellite views.
3. Toggle Terrain:

- Use the "Enable Terrain" button to add 3D terrain to the map.
3. Mapbox Draw:

- Use the controls to draw and edit points, lines, and polygons on the map.

## Built With
- [React](https://reactjs.org/) – A JavaScript library for building user interfaces.
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) – A JavaScript library for interactive, customizable vector maps.
- [Mapbox Draw](https://docs.mapbox.com/mapbox-gl-js/api/#draw) – A JavaScript library for adding drawing tools to Mapbox GL JS.
- [GeoJSON](https://geojson.org/) – An open standard format for encoding a variety of geographic data structures.
- [turf/bbox](https://turfjs.org/docs/#bbox) – A JavaScript library for geospatial analysis.
- [Chart.js](https://www.chartjs.org/) – A JavaScript library for creating charts and graphs.

### Preview
[Hiking Map](https://jazzy-cheesecake-12788a.netlify.app/)

![Hiking Map](HikingMap.png)

![Hiking Map](ElevationChart.png)

![Hiking Map](Terrian.png) 
