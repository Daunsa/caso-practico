import React, { useState, useEffect } from 'react';
import Card from './Card';
import Loading from './Loading';
import Failed from './Failed';
import axios from 'axios';

const Bar: React.FC = () => {

    const [state, setState] = useState(0);
    const [data, setdata] = useState<any[]>([]);
    const [nextPage, setNextPage] = useState(null);

    const fetchCharacters = (url: string) => {
        axios.get(url)
            .then(response => {
                const newData = response.data.results;
                const newNextPage = response.data.next;
                if (newNextPage === null) {
                    setState(2);
                }
                console.log(newData)

                setdata(prevData => [...prevData, ...newData]);
                setNextPage(newNextPage);

            })
            .catch(error => {
                console.error('Error:', error);
                setState(1);
            });
    };

    useEffect(() => {
        fetchCharacters('https://swapi.dev/api/people/');
    }, []);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight === scrollHeight) {
            if (nextPage) {
                fetchCharacters(nextPage);
            }
        }
    };

    return (
        <div onScroll={handleScroll} className="flex-grow overflow-y-auto bg-white w-96 border-r border-gray-400">
            <Card data={data} />
            {state === 0 ?
                <Loading />
                :
                state === 1 ?
                    <Failed />
                    :
                    <></>
            }
        </div>
    );
};

export default Bar;
