import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore"; // Firestore methods
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate for navigation and useParams for route params
import { db } from "../firebase"; // Import Firestore from firebase.js
import '../styles/styles.css';
import DataAnalytics from './DataAnalytics'; // Import DataAnalytics component
import './LogForm.css';

function LogForm() {
    const [formData, setFormData] = useState({
        date: "",
        distance: "",
        energyConsumed: "",
        cost: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false); // State to toggle between form and analytics
    const [lastDistance, setLastDistance] = useState(null); // State to store the last logged distance

    const { selectedEV } = useParams(); // Get selected EV from URL params
    const navigate = useNavigate(); // Use navigate hook

    // Constants for Vehicle Powertrain Info
    const vehicleRange = 70; // km per full charge
    const batteryCapacity = 1.68; // kWh
    const electricityCostMin = 4.75; // ₹ per kWh
    const electricityCostMax = 7; // ₹ per kWh

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateEnergyAndCost = (distance) => {
        if (!distance || !lastDistance) return;

        // Calculate the difference between the current and last distance
        const distanceDifference = distance - lastDistance;
        
        const energyConsumed = (distanceDifference / vehicleRange) * batteryCapacity;
        const costMin = energyConsumed * electricityCostMin;
        const costMax = energyConsumed * electricityCostMax;

        setFormData({
            ...formData,
            energyConsumed: energyConsumed.toFixed(2),
            cost: `₹${costMin.toFixed(2)} - ₹${costMax.toFixed(2)}`,
        });
    };

    useEffect(() => {
        // Fetch the last log for the selected EV
        const fetchLastLog = async () => {
            try {
                const logsRef = collection(db, "logs");
                const q = query(
                    logsRef,
                    orderBy("date", "desc"),
                    limit(1) // Get the latest log
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const latestLog = querySnapshot.docs[0].data();
                    setLastDistance(latestLog.distance); // Store the last logged distance
                    console.log("Last Distance:", latestLog.distance); // Log for debugging
                }
            } catch (error) {
                console.error("Error fetching last log:", error);
            }
        };

        fetchLastLog(); // Call the function to fetch the last log when component loads
    }, [selectedEV]); // Re-fetch when the selected EV changes

    useEffect(() => {
        if (formData.distance) {
            calculateEnergyAndCost(formData.distance);
        }
    }, [formData.distance, lastDistance]); // Recalculate whenever distance or lastDistance changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "logs"), {
                date: formData.date,
                distance: formData.distance,
                energyConsumed: formData.energyConsumed,
                cost: formData.cost,
            });

            setIsSuccess(true);
            setFormData({
                date: "",
                distance: "",
                energyConsumed: "",
                cost: "",
            });
        } catch (error) {
            console.error("Error adding document: ", error);
            setIsSuccess(false);
        }
    };

    const toggleAnalyticsView = () => {
        setShowAnalytics(!showAnalytics); // Toggle between form and analytics
    };

    return (
        <div className="form-container">
            {showAnalytics ? (
                // Show Analytics view
                <div>
                    <DataAnalytics />
                    <button onClick={toggleAnalyticsView}>Back to Log Form</button>
                </div>
            ) : (
                // Show Log Form
                <div>
                    <h2>Log Your Ride for {selectedEV}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="distance">Distance (km)</label>
                        <input
                            type="number"
                            id="distance"
                            name="distance"
                            value={formData.distance}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="energyConsumed">Energy Consumed (kWh)</label>
                        <input
                            type="number"
                            id="energyConsumed"
                            name="energyConsumed"
                            value={formData.energyConsumed}
                            readOnly
                        />

                        <label htmlFor="cost">Cost (₹)</label>
                        <input
                            type="text"
                            id="cost"
                            name="cost"
                            value={formData.cost}
                            readOnly
                        />

                        <button type="submit">Submit</button>
                    </form>

                    {isSuccess && <p className="success-message">Log added successfully!</p>}

                    <button onClick={toggleAnalyticsView} className="analytics-btn">
                        Go to Analytics
                    </button>
                </div>
            )}
        </div>
    );
}

export default LogForm;
