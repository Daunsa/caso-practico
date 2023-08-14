import React from 'react';

const Detail: React.FC = () => {

    return (
        <div className='flex-grow'>
            <div className="py-4 px-40 w-full">

                <div className="py-4">
                    <p className="font-bold">General information</p>
                    <table className="border-collapse border-gray-300 w-full table-auto">
                        <tbody>
                            <tr>
                                <td className="border-b border-gray-300 py-4 text-gray-400 font-bold w-full">Eye Color</td>
                                <td className="border-b border-gray-300 py-4 font-bold w-full">Dato2</td>
                            </tr>
                            <tr>
                                <td className="border-b border-gray-300 py-4 text-gray-400 font-bold w-full">Hair Color</td>
                                <td className="border-b border-gray-300 py-4 font-bold w-full">Dato2</td>
                            </tr>
                            <tr>
                                <td className="border-b border-gray-300 py-4 text-gray-400 font-bold w-full">Skin Color</td>
                                <td className="border-b border-gray-300 py-4 font-bold w-full">Dato2</td>
                            </tr>
                            <tr>
                                <td className="border-b border-gray-300 py-4 text-gray-400 font-bold w-full">Birth Year</td>
                                <td className="border-b border-gray-300 py-4 font-bold w-full">Dato2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="pt-4">
                    <p className="font-bold">Vehicles</p>
                    <table className="border-collapse border-gray-300 w-full table-auto">
                        <tbody>
                            <tr>
                                <td className="border-b border-gray-300 py-2 text-gray-400 font-bold w-full">Dato 1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default Detail;
