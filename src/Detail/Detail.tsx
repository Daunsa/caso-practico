import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface DetailProps {
    data: {
        eye_color: string;
        hair_color: string;
        skin_color: string;
        birth_year: string;
        vehicles: [string];
    } | null;
}

const Detail: React.FC<DetailProps> = ({ data }) => {

    const [vehicles, setVehicles] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (data && data.vehicles) {
            const fetchVehicles = async () => {
                const vehiclePromises = data.vehicles.map(async (vehicle) => {
                    try {
                        const response = await axios.get(vehicle);
                        return (
                            <tr key={response.data.name}>
                                <td className="border-b border-gray-300 py-2 text-gray-500 font-bold w-full">
                                    {response.data.name}
                                </td>
                            </tr>
                        );
                    } catch (error) {
                        console.error(error);
                        return null;
                    }
                });

                const resolvedVehicles = await Promise.all(vehiclePromises);
                setVehicles(resolvedVehicles.filter((vehicle) => vehicle !== null) as JSX.Element[]);
            };

            fetchVehicles();
        }
    }, [data]);

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
            {data !== null ?
                <div className="py-4 md:px-40 pl-2 md:w-full w-96">
                    <div className="py-4">
                        <p className="font-bold">General information</p>
                        <table className="border-collapse border-gray-300 w-full table-auto">
                            <tbody>
                                <tr>
                                    <td className="border-b border-gray-300 py-4 text-gray-500 font-bold w-full">Eye Color</td>
                                    <td className="border-b border-gray-300 py-4 font-bold w-full">{capitalizeFirstLetter(data?.eye_color)}</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-300 py-4 text-gray-500 font-bold w-full">Hair Color</td>
                                    <td className="border-b border-gray-300 py-4 font-bold w-full">{capitalizeFirstLetter(data?.hair_color)}</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-300 py-4 text-gray-500 font-bold w-full">Skin Color</td>
                                    <td className="border-b border-gray-300 py-4 font-bold w-full">{capitalizeFirstLetter(data?.skin_color)}</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-300 py-4 text-gray-500 font-bold w-full">Birth Year</td>
                                    <td className="border-b border-gray-300 py-4 font-bold w-full">{capitalizeFirstLetter(data?.birth_year)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-4">
                        <p className="font-bold">Vehicles</p>
                        <table className="border-collapse border-gray-300 w-full table-auto">
                            <tbody>
                                {vehicles.length > 0 ? vehicles : <tr><td>No vehicles found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <></>
            }
        </>
    );
};

export default Detail;