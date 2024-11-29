import React, { useEffect, useRef } from "react";
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

// Register required Chart.js components
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
      chartInstanceRef.current.destroy(); // Cleanup previous Chart instance
    }

    if (elevationData.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      // Calculate chart width dynamically based on the number of points
      const chartWidth = Math.max(1000, elevationData.length * 20); // 20px per point

      // Set the canvas width dynamically
      chartRef.current.width = chartWidth;

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: elevationData.map((_, index) => `Point ${index + 1}`), // X-axis labels
          datasets: [
            {
              label: "Elevation (Feet)",
              data: elevationData, // Y-axis data
              borderColor: "#08ff08", // Line color
              backgroundColor: "#08ff08", // Fill under line
              borderWidth: 2,
              tension: 0.4, // Smooth the line
            },
          ],
        },
        options: {
          responsive: false, // Disable Chart.js responsiveness to enable custom size
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Points",
                color: "#e5e4e2", // X-axis title color
              },
              ticks: {
                color: "#e5e4e2", // X-axis label color
              },
            },
            y: {
              title: {
                display: true,
                text: "Elevation (Feet)",
                color: "#e5e4e2", // Y-axis title color
              },
              ticks: {
                color: "#e5e4e2", // Y-axis label color
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#e5e4e2", // Legend text color
              },
            },
            tooltip: {
              bodyColor: "#333", // Tooltip text color
              titleColor: "#333", // Tooltip title color
              backgroundColor: "#f9f9f9", // Tooltip background color
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
        overflowX: "auto", // Enable horizontal scrolling
        overflowY: "hidden",
      }}
    >
      <canvas
        ref={chartRef}
        style={{
          display: "block",
          height: "100%", // Allow full height scaling
        }}
      />
    </div>
  );
};

export default ElevationProfile;










