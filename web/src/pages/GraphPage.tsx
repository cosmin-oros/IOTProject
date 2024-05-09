import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../routes/PageRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

Chart.register(...registerables);

type ChartInstance = Chart<'line', any>;

const GraphPage = () => {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<ChartInstance | null>(null);

  // ! replace mock data with data from firestore

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Light Bulb Usage',
        data: [12, 19, 3, 5, 2, 3, 20],
        fill: false,
        borderColor: 'orange',
      },
    ],
  };

  useEffect(() => {
    let newChartInstance: ChartInstance | null = null;

    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      newChartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: data,
        options: {
          scales: {
            x: {
              type: 'category',
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [data]);

  const handleBack = () => {
    navigate(PageRoutes.Main);
  };

  return (
    <div className='main-container'>
      <div className='main-header'>
        <button className='back-btn' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <div className='content'>
        <div className='graph-container'>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
