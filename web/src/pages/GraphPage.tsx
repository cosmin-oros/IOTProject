import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../routes/PageRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

type ChartInstance = Chart<'line', any>;

const GraphPage = () => {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<ChartInstance | null>(null);
  const [data, setData] = useState<{ labels: string[]; datasets: { label: string; data: any[]; fill: boolean; borderColor: string; }[] }>({ labels: [], datasets: [{ label: 'Light Bulb Usage', data: [], fill: false, borderColor: 'orange' }] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const ledStateCollectionRef = collection(db, 'ledStates');
        const q = query(ledStateCollectionRef, orderBy('timestamp', 'asc'));

        onSnapshot(q, (querySnapshot) => {
          const newData = {
            labels: [] as string[],
            datasets: [{ label: 'Light Bulb Usage', data: [] as number[], fill: false, borderColor: 'orange' }],
          };

          querySnapshot.forEach((doc) => {
            const data = doc.data() as { isOn: boolean; timestamp: Timestamp }; // Adjust type to firebase.firestore.Timestamp
            const timestamp = data.timestamp.toDate().getTime(); // Convert Firestore Timestamp to JavaScript Date and extract timestamp value in milliseconds
            newData.labels.push(formatDate(timestamp));
            newData.datasets[0].data.push(data.isOn ? 1 : 0); // Convert boolean to 0 or 1
          });

          setData(newData);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup (optional)
    };
  }, []);

  useEffect(() => {
    if (!loading && chartRef.current && data.labels.length > 0) {
      if (chartInstance) {
        chartInstance.data.labels = data.labels;
        chartInstance.data.datasets[0].data = data.datasets[0].data;
        chartInstance.update();
      } else {
        const newChartInstance = new Chart(chartRef.current, {
          type: 'line',
          data: data,
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
              },
            },
          },
        });
        setChartInstance(newChartInstance);
      }
    }
  }, [loading, data, chartInstance]);

  const handleBack = () => {
    navigate(PageRoutes.Main);
  };

  // Function to format timestamp using date-fns
  const formatDate = (timestamp: number): string => {
    if (isNaN(timestamp) || timestamp < 0) {
      return ''; // Return an empty string for invalid timestamps
    }
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);
    const hours = `0${date.getUTCHours()}`.slice(-2);
    const minutes = `0${date.getUTCMinutes()}`.slice(-2);
    const seconds = `0${date.getUTCSeconds()}`.slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <canvas ref={chartRef} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
