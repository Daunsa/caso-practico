import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SpeciesCache {
    [key: string]: any;
}

interface PlanetCache {
    [key: string]: any;
}

const Card: React.FC<{ data: any[] }> = ({ data }) => {

    const [speciesCache, setSpeciesCache] = useState<SpeciesCache>({});
    const [planetCache, setPlanetCache] = useState<PlanetCache>({});

    useEffect(() => {
        const fetchPlanet = async (planetUrl: string) => {
            if (!planetCache[planetUrl]) {
                const response = await axios.get(planetUrl);
                const planetData = response.data;

                setPlanetCache(prevCache => ({
                    ...prevCache,
                    [planetUrl]: planetData,
                }));
            }
        };

        const fetchSpecies = async (speciesUrl: string) => {
            if (!speciesCache[speciesUrl]) {
                const response = await axios.get(speciesUrl);
                const speciesData = response.data;

                setSpeciesCache(prevCache => ({
                    ...prevCache,
                    [speciesUrl]: speciesData,
                }));
            }
        };

        data.forEach(character => {
            fetchPlanet(character.homeworld);
            if (character.species.length > 0) {
                fetchSpecies(character.species[0]);
            }
        });
    }, [data, planetCache, speciesCache]);

    return (
        <>
            {data.map((character, index) => {
                const speciesData = speciesCache[character.species[0]];
                const planetData = planetCache[character.homeworld];
                return (
                    <div className="pl-4">
                        <div key={index} className="border-b border-gray-400 py-4 flex">
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold">{character.name}</h2>
                                <p className="text-sm">{speciesData ? speciesData.name : 'unknown'} from{' '}
                                    {planetData ? planetData.name : 'Loading planet...'}</p>
                            </div>
                            <div className="flex-none flex items-center">
                                <div className="flex items-center p-2">
                                    <svg
                                        className="w-6 h-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                                            fill="#0F0F0F"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default Card;
