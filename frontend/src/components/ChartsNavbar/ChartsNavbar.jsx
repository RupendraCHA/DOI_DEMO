import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';

import "./ChartsNavbar.css"

const ChartsNavbar = () => {
  return (
    <div className='charts-navbar-container'>
        <div className='search-container'>
            <input type='search' placeholder="Search..."/>
            <SearchIcon className='icon'/>
        </div>
        <div>
            <InfoIcon className='info icon'/>
        </div>
    </div>
  )
}

export default ChartsNavbar