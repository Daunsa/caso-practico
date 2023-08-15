import React from 'react';
import { CharacterClickHandler, NameHandler } from '../types';

interface NavbarProps {
  character: boolean;
  setCharacter: CharacterClickHandler;
  name: string;
  setName: NameHandler;
}

const Navbar: React.FC<NavbarProps> = ({ character, setCharacter, name, setName }) => {

  const handleClick = () => {
    setCharacter(false);
    setName('People of Star Wars');
  }

  return (
    <nav className="bg-black py-4 pl-8">
      <div className="text-white font-bold hidden md:block">
        Ravn Star Wars Registry
      </div>
      <div className="md:hidden flex">
        {character ?
          <svg onClick={handleClick} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" stroke-width="0">
            </g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
            </g>
            <g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            </path>
            </g>
          </svg>
          :
          <></>
        }
        <div className="text-white font-bold block md:hidden mx-auto text-center md:text-left">
          {name}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
