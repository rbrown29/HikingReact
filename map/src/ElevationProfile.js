import React, { useEffect, useRef } from "react";
import "./elevation.css";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const ElevationProfile = ({ elevationData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); 
    }

    if (elevationData.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      const chartWidth = Math.max(1000, elevationData.length * 20); 

      chartRef.current.width = chartWidth;

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: elevationData.map((_, index) => `Point ${index + 1}`), 
          datasets: [
            {
              label: "Elevation (Feet)",
              data: elevationData, 
              borderColor: "#08ff08", 
              backgroundColor: "#08ff08", 
              borderWidth: 2,
              tension: 0.4, 
            },
          ],
        },
        options: {
          responsive: false, 
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Points",
                color: "#e5e4e2", 
              },
              ticks: {
                color: "#e5e4e2", 
              },
            },
            y: {
              title: {
                display: true,
                text: "Elevation (Feet)",
                color: "#e5e4e2", 
              },
              ticks: {
                color: "#e5e4e2", 
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#e5e4e2",
              },
            },
            tooltip: {
              bodyColor: "#333", 
              titleColor: "#333", 
              backgroundColor: "#f9f9f9", 
              borderColor: "#ccc",
              borderWidth: 1,
            },
          },
        },
      });
    }

    return () => {
      // Cleanup on component unmount
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [elevationData]);

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        marginTop: "10px",
        overflowX: "auto", 
        overflowY: "hidden",
      }}
    >
      <canvas
        ref={chartRef}
        style={{
          display: "block",
          height: "100%", 
        }}
      />
    </div>
  );
};

export default ElevationProfile;










