import React, { useEffect, useState } from 'react';
import "./app.css";
import Card from './Card';

export default function App() {

    const [searchValue, setSearchValue] = useState("hyderabad");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=<API_KEY>`;
            
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            
            const { temp, humidity, pressure } = data.main;
            const { main:weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeather = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeather);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);

    return (
        <>
        <div className="wrap">
            <div className="search">
                <input
                    className="searchTerm"
                    type="search"
                    placeholder="Search..."
                    autoFocus
                        id="seach"
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)}
                />
                <button className="searchButton" type="button" onClick={getWeatherInfo}>
                    Search
                </button>
            </div>
        </div>
            <Card tempInfo={ tempInfo }/>
        </>
    )
}
