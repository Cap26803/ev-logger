import React, { useState } from "react";

function LogForm() {
    const [formData, setFormData] = useState({
        date: "",
        distance: "",
        energyConsumed: "",
        cost: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

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
                    onChange={handleChange}
                    required
                />

                <label htmlFor="cost">Cost (₹)</label>
                <input
                    type="number"
                    id="cost"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LogForm;
