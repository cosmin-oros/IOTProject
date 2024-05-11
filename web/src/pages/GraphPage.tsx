import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../routes/PageRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { format } from 'date-fns';

Chart.register(...registerables);

type ChartInstance = Chart<'line', any>;

const GraphPage = () => {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<ChartInstance | null>(null);
  const [data, setData] = useState<any>({ labels: [], datasets: [{ label: 'Light Bulb Usage', data: [], fill: false, borderColor: 'orange' }] });

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const ledStateCollectionRef = collection(db, 'ledState');
      const q = query(ledStateCollectionRef, orderBy('timestamp', 'asc'));

      onSnapshot(q, (querySnapshot) => {
        const newData = {
          labels: [] as string[], // Explicit type annotation for labels as an array of strings
          datasets: [{ label: 'Light Bulb Usage', data: [] as boolean[], fill: false, borderColor: 'orange' }],
        };

        querySnapshot.forEach((doc) => {
          const data = doc.data() as { isOn: boolean, timestamp: number }; // Explicit type annotation for the data object
          newData.labels.push(formatDate(data.timestamp)); // Format timestamp
          newData.datasets[0].data.push(data.isOn); 
        });

        setData(newData);
      });
    };

    fetchData();

    return () => {
      // Cleanup (optional)
    };
  }, []);


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

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [data]);

  const handleBack = () => {
    navigate(PageRoutes.Main);
  };

  // Function to format timestamp using date-fns
  const formatDate = (timestamp: number): string => {
    return format(new Date(timestamp), 'yyyy-MM-dd'); // Format timestamp using date-fns
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
