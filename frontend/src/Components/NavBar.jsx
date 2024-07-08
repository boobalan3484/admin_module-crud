import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ state, location, navigation, loggerInfo, handleLogOut }) => {
    return (

        <div className={`flex-1 justify-between items-center flex-row-reverse md:overflow-visible md:flex md:pb-6 md:pr-0 md:h-auto ${state ? 'h-full pb-10 overflow-auto pr-4' : 'hidden'} border-b`}>
            {location.pathname !== '/' &&
                <>
                    <ul className="flex items-center flex-col space-x-0 md:space-x-6 md:flex-row ">
                        <li className="mt-4 md:mt-0">
                            <p className="py-2 px-4 text-center text-gray-600 hover:text-indigo-600 font-medium rounded-md block md:inline cursor-default">
                                {loggerInfo}
                            </p>
                        </li>
                        <li className="mt-6 md:mt-0 pb-8 md:pb-0 ">
                            <button onClick={handleLogOut} className="py-2 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-md shadow block md:inline">
                                Log out
                            </button>
                        </li>
                    </ul>

                    <div className="flex-1">
                        <ul className="justify-center items-center space-y-8 md:flex md:space-x-10 md:space-y-0">
                            {navigation.map((item, i) => {
                                return (
                                    <li key={i} className="text-gray-600 hover:text-indigo-600 capitalize">
                                        <Link to={item.path}>
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </>}
        </div>
    )
}

export default NavBar