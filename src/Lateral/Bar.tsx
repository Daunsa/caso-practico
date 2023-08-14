import React, { useState, useEffect } from 'react';
import Card from './Card';
import Loading from './Loading';
import Failed from './Failed';
import axios from 'axios';
import Detail from '../Detail/Detail';
import { CardClickHandler } from '../types';

const Bar: React.FC = () => {

    const [state, setState] = useState(0);
    const [data, setdata] = useState<any[]>([]);
    const [nextPage, setNextPage] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

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

    const handleCardClick: CardClickHandler = (index) => {
        const clickedCharacter = data[index];
        setSelectedCharacter(clickedCharacter);
        console.log('personaje:', clickedCharacter);
      };

    return (
        <div className='flex flex-grow'>
            <div onScroll={handleScroll} className="overflow-y-auto bg-white w-96 border-r border-gray-400 max-h-[calc(100vh-64px)]">
                <Card data={data} onCardClick={handleCardClick} />
                {state === 0 ?
                    <Loading />
                    :
                    state === 1 ?
                        <Failed />
                        :
                        <></>
                }
            </div>
            <Detail />
        </div>
    );
};

export default Bar;
