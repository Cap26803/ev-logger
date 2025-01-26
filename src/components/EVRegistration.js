// src/components/EVRegistration.js
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import '../styles/styles.css';

const EVRegistration = () => {
    const [evModel, setEvModel] = useState('');
    const [batteryCapacity, setBatteryCapacity] = useState('');
    const [range, setRange] = useState('');
    const [motorPower, setMotorPower] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'evs'), {
                evModel,
                batteryCapacity,
                range,
                motorPower,
            });
            navigate('/ev-selection');
        } catch (error) {
            console.error("Error adding EV details: ", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Register Your EV</h2>
            <form onSubmit={handleRegister}>
                <label>EV Model</label>
                <input type="text" value={evModel} onChange={(e) => setEvModel(e.target.value)} required />
                <label>Battery Capacity (kWh)</label>
                <input type="text" value={batteryCapacity} onChange={(e) => setBatteryCapacity(e.target.value)} required />
                <label>Range (km)</label>
                <input type="text" value={range} onChange={(e) => setRange(e.target.value)} required />
                <label>Motor Power (W)</label>
                <input type="text" value={motorPower} onChange={(e) => setMotorPower(e.target.value)} required />
                <button type="submit">Register EV</button>
            </form>
        </div>
    );
};

export default EVRegistration;
