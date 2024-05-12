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
      const ledStateCollectionRef = collection(db, 'ledState');
      const q = query(ledStateCollectionRef, orderBy('timestamp', 'asc'));

      onSnapshot(q, (querySnapshot) => {
        const newData = {
          labels: [] as string[],
          datasets: [{ label: 'Light Bulb Usage', data: [] as boolean[], fill: false, borderColor: 'orange' }],
        };

        querySnapshot.forEach((doc) => {
          const data = doc.data() as { isOn: boolean; timestamp: Timestamp }; // Adjust type to firebase.firestore.Timestamp
          const timestamp = data.timestamp.toDate().getTime(); // Convert Firestore Timestamp to JavaScript Date and extract timestamp value in milliseconds
          console.log("Timestamp:", timestamp); // Log timestamp value
          newData.labels.push(formatDate(timestamp));
          newData.datasets[0].data.push(data.isOn);
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
    return format(new Date(timestamp), 'yyyy-MM-dd'); // Format valid timestamps using date-fns
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
