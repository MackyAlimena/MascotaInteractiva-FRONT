import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Login/Login.css';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const serverUrl = 'http://34.201.99.170:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/pets`);
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching pets data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container my-5">
            <h1 className="mb-4">Pets Collection</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Response Time</th>
                    <th scope="col">Type</th>
                    <th scope="col">Date Time</th>
                </tr>
                </thead>
                <tbody>
                {pets.map(pet => (
                    <tr key={pet._id}>
                        <td>{pet._id}</td>
                        <td>{pet.Name}</td>
                        <td>{pet.ResponseTime}</td>
                        <td>{pet.Type}</td>
                        <td>{new Date(pet.DateTime).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pets;

