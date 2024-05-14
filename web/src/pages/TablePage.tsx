import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../routes/PageRoutes';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

type TableDataRow = {
  timestamp: string;
  isOn: string;
};

const TablePage: React.FC = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableDataRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const ledStateCollectionRef = collection(db, 'ledStates');
        const q = query(ledStateCollectionRef, orderBy('timestamp', 'desc'), limit(20));

        onSnapshot(q, (querySnapshot) => {
          const newData: TableDataRow[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as { isOn: boolean; timestamp: Timestamp };
            newData.push({
              timestamp: formatDate(data.timestamp.toDate().getTime()),
              isOn: data.isOn ? 'On' : 'Off',
            });
          });
          setTableData(newData.reverse());
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate(PageRoutes.Main);
  };

  // Function to format timestamp using date-fns
  const formatDate = (timestamp: number): string => {
    if (isNaN(timestamp) || timestamp < 0) {
      return ''; // Return an empty string for invalid timestamps
    }
    return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss'); // Format valid timestamps using date-fns
  };

  return (
    <div className='main-container'>
      <div className='main-header'>
        <button className='back-btn' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <div className='content'>
        <div className='table-container'>
          <table className='grid-table'>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.timestamp}</td>
                  <td>{row.isOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
