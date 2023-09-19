import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLoadData } from '../../hooks/useLoadData';
import { setSelectedChain } from '../../redux/slices/blockchainSlice';
import { RootState } from '../../redux/store';
import Dropdown, { DropdownOptionType } from '../form/Dropdown';
import { useNavigate } from 'react-router-dom';

interface INavBarProps {
  menuButtonToggled: () => void;
}

const NavBar: React.FC<INavBarProps> = ({ menuButtonToggled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chains = useSelector((state: RootState) => state.blockchain.chains);
  const selectedChain = useSelector((state: RootState) => state.blockchain.selectedChain);
  const [chainOptions, setChainOptions] = useState<DropdownOptionType[]>([]);
  
  useLoadData();

  useEffect(() => {
    if (chains?.length > 0) {
      setChainOptions(chains.map(chain => {
        return {
          label: chain.name,
          key: chain.chainId.toString()
        }
      }));
    }
  }, [chains])

   const handleDropdownChange = (key: string) => {
    dispatch(setSelectedChain(chains.find(x => x.chainId.toString() === key)))
  };

  return (
    <div className='flex flex-row justify-between w-full py-3 px-6 bg-white shadow-slate-200 text-xl text-slate-800 border-b-gray-200 border-b'>
      <button onClick={menuButtonToggled} aria-label="Toggle Menu">
        <img src={`${process.env.PUBLIC_URL}/icons/icons8-hamburger-menu-50.png`} alt="Menu Icon" className='h-[25px] hover:cursor-pointer' />
      </button>
      <Dropdown options={chainOptions} onChange={handleDropdownChange} selectedKey={selectedChain?.chainId.toString()}/>
    </div>
  )
}

export default NavBar