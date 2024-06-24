import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Login/Login.css';

const Statistics = () => {
    const [statistics, setStatistics] = useState([]);
    const serverUrl = 'http://54.163.210.212:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/login`);
                console.log(response.data);
                setStatistics(response.data);
            } catch (error) {
                console.error("Error fetching statistics data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container my-5">
            <h1 className="mb-4">Statistics Collection</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Media</th>
                    <th scope="col">Level</th>
                </tr>
                </thead>
                <tbody>
                {statistics.map(stat => (
                    <tr key={stat._id}>
                        <td>{stat.Id}</td>
                        <td>{stat.Media}</td>
                        <td>{stat.Puntaje}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Statistics;

