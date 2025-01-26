import { format } from 'date-fns';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../styles/styles.css';

const DataAnalytics = () => {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null); // To handle any errors

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const logSnapshot = await getDocs(collection(db, 'logs'));
                const logList = logSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setLogs(logList);
            } catch (error) {
                setError('Failed to fetch logs.');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchLogs();
    }, []);

    if (isLoading) {
        return <p>Loading logs...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="form-container">
            <h2>EV Logs and Analytics</h2>
            <div>
                {logs.length > 0 ? (
                    <div>
                        <h3>Recent EV Logs:</h3>
                        {logs.map((log) => (
                            <div key={log.id} className="card">
                                <h3>{format(new Date(log.date), 'dd/MM/yyyy HH:mm')}</h3> {/* Display formatted date */}
                                <p>Distance: {log.distance} km</p>
                                <p>Energy Consumed: {log.energyConsumed} kWh</p>
                                <p>Cost: ₹{log.cost}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No logs available yet. Start adding some data.</p>
                )}
            </div>
        </div>
    );
};

export default DataAnalytics;
