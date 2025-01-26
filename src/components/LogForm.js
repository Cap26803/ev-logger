import { addDoc, collection } from "firebase/firestore"; // Firestore methods
import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore from firebase.js

function LogForm() {
    const [formData, setFormData] = useState({
        date: "",
        distance: "",
        energyConsumed: "",
        cost: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);

    // Constants for Vehicle Powertrain Info
    const vehicleRange = 70; // km per full charge
    const batteryCapacity = 1.68; // kWh
    const electricityCostMin = 4.75; // ₹ per kWh
    const electricityCostMax = 7; // ₹ per kWh

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Calculate energy consumed and cost
    const calculateEnergyAndCost = (distance) => {
        if (!distance) return;

        // Calculate energy consumption based on distance
        const energyConsumed = (distance / vehicleRange) * batteryCapacity;

        // Calculate cost based on the energy consumed and the two electricity rates
        const costMin = energyConsumed * electricityCostMin;
        const costMax = energyConsumed * electricityCostMax;

        setFormData({
            ...formData,
            energyConsumed: energyConsumed.toFixed(2), // Keep 2 decimal places
            cost: `₹${costMin.toFixed(2)} - ₹${costMax.toFixed(2)}`, // Show both cost ranges
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Submit data to Firestore
        try {
            await addDoc(collection(db, "logs"), {
                date: formData.date,
                distance: formData.distance,
                energyConsumed: formData.energyConsumed,
                cost: formData.cost,
            });

            setIsSuccess(true);  // Show success message
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

    // Automatically calculate when distance is changed
    React.useEffect(() => {
        if (formData.distance) {
            calculateEnergyAndCost(formData.distance);
        }
    }, [formData.distance]);

    return (
        <div className="form-container">
            <h2>Log Your Ride</h2>
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
        </div>
    );
}

export default LogForm;
