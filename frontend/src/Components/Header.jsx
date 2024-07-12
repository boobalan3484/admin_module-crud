import React from 'react'
import { useState } from 'react'
import Logo from './Logo'
import NavBar from './NavBar'
import { useAppContext } from '../Utils/Context'

const Header = () => {

  const { location, navigation, loggerInfo, handleLogOut } = useAppContext();

  const [state, setState] = useState(false)

  return (
    <nav className="bg-white w-full top-0 z-20 mt-6">
      <div className="px-4 max-w-screen-xl mx-auto md:px-8 ">
        <div className="flex items-center justify-between py-3 md:py-4 md:block">
          <a href="">
            <Logo />
          </a>
          <div className="md:hidden">
            {location.pathname !== '/' &&
              <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                {
                  state ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  )
                }
              </button>}
          </div>
        </div>

        <NavBar
          state={state}
          loggerInfo={loggerInfo}
          handleLogOut={handleLogOut}
          navigation={navigation}
          location={location}
        />

      </div>
    </nav>
  )
}

export default Header