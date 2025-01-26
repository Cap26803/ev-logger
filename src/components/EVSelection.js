import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import firebase config
import '../styles/styles.css';

const EVSelection = () => {
    const [evList, setEvList] = useState([]);
    const [selectedEV, setSelectedEV] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEVs = async () => {
            try {
                // Fetch all documents from the 'evs' collection
                const evsSnapshot = await getDocs(collection(db, "evs"));
                const evs = [];

                console.log("EVs Snapshot Docs:", evsSnapshot.docs.length);  // Log how many documents we have

                // For each document in the 'evs' collection, get its data
                evsSnapshot.forEach((doc) => {
                    console.log("Found EV:", doc.data()); // Log the data inside each document

                    // Push the document data to the evs list
                    evs.push({
                        id: doc.id,
                        evModel: doc.data().evModel,
                        range: doc.data().range,
                        batteryCapacity: doc.data().batteryCapacity,
                    });
                });

                if (evs.length > 0) {
                    console.log("Fetched EVs:", evs); // Log the fetched data before updating the state
                    setEvList(evs);
                } else {
                    console.log("No EVs found.");
                }
            } catch (error) {
                console.error("Error fetching EVs:", error);
            }
        };

        fetchEVs();
    }, []);

    const handleSelectEV = () => {
        if (!selectedEV) {
            alert("Please select an EV to proceed.");
            return;
        }
        navigate(`/log-form/${selectedEV}`);
    };

    const handleAddEV = () => {
        navigate('/ev-registration');
    };

    return (
        <div className="app-container">
            <main>
                <div className="form-container">
                    <h2>Select Your EV</h2>
                    {evList.length === 0 ? (
                        <div>
                            <p>No EVs available. Please add an EV.</p>
                            <button onClick={handleAddEV}>Register New EV</button> {/* Updated button text */}
                        </div>
                    ) : (
                        <>
                            <select value={selectedEV} onChange={(e) => setSelectedEV(e.target.value)}>
                                <option value="">-- Select EV --</option>
                                {evList.map((ev) => (
                                    <option key={ev.id} value={ev.id}>
                                        {ev.evModel} - {ev.range} km/charge
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleSelectEV}>Proceed to Log</button>
                            <p>
                                <button onClick={handleAddEV}>Register New EV</button> {/* Added Register New EV link */}
                            </p>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EVSelection;
