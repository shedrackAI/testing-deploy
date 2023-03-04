import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';
import Footer from './Footer'
import PageNav from './PageNav'
import MainNav from './MainNav'
import Popup from './Popup';
import Settings from './Settings';

function Layout({ children }) {
  const { currentPage } = useContext(AppContext);
  return (
    <div className='w-full relative flex flex-col overflow-x-hidden'>
        
      {currentPage === "landingPage" ? (
          <MainNav />
        ):(
          <PageNav />
      )}
           {children}
        <Footer />
    </div>
  )
}

export default Layout