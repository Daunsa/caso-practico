import React, { useState, useEffect } from 'react';
import Card from './Card';
import Loading from './Loading';
import Failed from './Failed';
import axios from 'axios';
import Detail from '../Detail/Detail';
import { CardClickHandler, CharacterClickHandler, NameHandler } from '../types';

interface BarProps {
    character: boolean;
    setCharacter: CharacterClickHandler;
    setName: NameHandler;
}

const Bar: React.FC<BarProps> = ({ character, setCharacter, setName }) => {

    const [state, setState] = useState(0);
    const [data, setdata] = useState<any[]>([]);
    const [nextPage, setNextPage] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    const fetchCharacters = (url: string) => {
        axios.get(url)
            .then(response => {
                const newData = response.data.results;
                const newNextPage = response.data.next;

                setdata(prevData => [...prevData, ...newData]);
                setNextPage(newNextPage);

                if (newNextPage === null) {
                    setState(2);
                } else {
                    if (isMobile) {
                        if (newNextPage) {
                            fetchCharacters(newNextPage);
                        }
                    }
                }
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
        setCharacter(true);
        setName(data[index].name);
    };

    return (
        <div className='flex flex-grow'>
            <div onScroll={handleScroll} className={`md:overflow-y-auto bg-white w-96 md:border-r border-neutral-400 md:max-h-[calc(100vh-64px)] ${isMobile ? (character ? "hidden" : "") : ""}`}>
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
            <div className={`flex-grow ${isMobile ? (character ? "" : "hidden") : ""}`}>
                <Detail data={selectedCharacter} />
            </div>
        </div>
    );
};

export default Bar;
