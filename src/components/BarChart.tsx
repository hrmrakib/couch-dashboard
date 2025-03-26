"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function BarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Monthly data
    const monthlyData = [
      { month: "Jan", value: 3 },
      { month: "Feb", value: 2 },
      { month: "Mar", value: 6 },
      { month: "Apr", value: 7 },
      { month: "May", value: 6 },
      { month: "Jun", value: 6 },
      { month: "Jul", value: 7 },
      { month: "Aug", value: 4 },
      { month: "Sep", value: 2 },
      { month: "Oct", value: 7 },
      { month: "Nov", value: 8 },
      { month: "Dec", value: 7 },
    ];

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthlyData.map((item) => item.month),
        datasets: [
          {
            label: "Earnings",
            data: monthlyData.map((item) => item.value),
            backgroundColor: "#111",
            borderRadius: 0,
            barThickness: 20,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 2,
              callback: (value) => value + "k",
            },
            grid: {
              drawOnChartArea: false,
            },
          },
          x: {
            grid: {
              display: false,
              drawOnChartArea: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => `$${context.raw}k`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
}
