import React, { useState } from 'react';
import Card from './Card';
import Loading from './Loading';
import Failed from './Failed';

const Bar: React.FC = () => {

    const [state, setState] = useState(0);

    return (
        <div className="flex-grow overflow-y-auto bg-white w-96 border-r border-gray-400">
            <Card />
            <Loading />
            <Failed />
        </div>
    );
};

export default Bar;
