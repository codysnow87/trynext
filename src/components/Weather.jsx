'use client'; 

import { useEffect, useState } from 'react';
import { getWeather } from '../app/api/weatherService';

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchWeather = async () => {
            const data = await getWeather();
            if (data) {
                setWeatherData(data);
            }
        };

        fetchWeather();
    }, []);

    return (
        <div>
            <h2>5-Day Weather Forecast</h2>
            {weatherData.length > 0 ? (
                <div>
                    {weatherData.map((day, index) => (
                        <p key={index}>
                            <strong>Date:</strong> {new Date(day.date).toLocaleDateString()} <br />
                            <strong>Temperature (C):</strong> {day.temperatureC}°C <br />
                            <strong>Temperature (F):</strong> {day.temperatureF}°F <br />
                            <strong>Summary:</strong> {day.summary}
                        </p>
                    ))}
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default Weather;
