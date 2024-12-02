// TODO: pull url from config
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getWeather = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
};