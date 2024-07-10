import React from 'react'
import { Link } from 'react-router-dom'
import Alert from './Alert'

const EmployeeList = ({ search, setSearch, employeeData, handleDeleteEmployee }) => {

    const table = ['S.No.', 'ID', 'Profile', 'Username', 'Email', 'Mobile No.', 'Position', 'Course', 'Gender', 'Created At', 'Action']

    return (

        <section className="max-w-screen-xl mx-auto px-4 md:px-8 mb-10">

            <div className='md:flex justify-end gap-x-6 items-center mb-16'>

                <div className="mt-6 md:mt-0 ">
                    <Link to="/employee/add" className="inline-flex w-full items-center justify-center gap-1 py-2 px-3 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                        New member
                    </Link>
                </div>

                <div className="mt-6 md:mt-0">
                    <div className="relative ">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 rounded-lg "
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                    </div>
                </div>

                <span className='hidden w-px h-6 bg-gray-300 md:block'></span>

                <div className="mt-6 md:mt-0">
                    <p className=" cursor-default py-3 text-center text-gray-600 block md:inline">
                        Total Count: {employeeData.length}
                    </p>
                </div>

            </div>

            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                
                <table className="w-full table-auto text-sm text-left">
                
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            {table.map((item, idx) => (
                                <th className="py-3 px-4" key={idx}>{item}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 divide-y">
                        {employeeData.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span>{idx + 1}</span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span>{item.id}</span>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    <img src={`${item.avatar}`} className="w-[50px] h-[50px] rounded-full shadow-md shadow-slate-400 bg-center bg-cover" alt='Img preview' />
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap capitalize">{item.name}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{item.email}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{item.mobile}</td>
                                <td className="px-4 py-4 whitespace-nowrap capitalize">{item.designation}</td>
                                <td className="px-4 py-4 whitespace-nowrap uppercase">{item.course}</td>
                                <td className="px-4 py-4 whitespace-nowrap capitalize">{item.gender}</td>
                                <td className="px-4 py-4 whitespace-nowrap capitalize">{`${item.updatedAt.slice(0, 10)}`}</td>
                                <td className="py-4 whitespace-nowrap">
                                    <Link to={`/employee/edit/${item._id}`}
                                        className="py-2 px-4 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDeleteEmployee(item._id)}
                                        className="py-2 leading-none px-4 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-red-50 rounded-lg">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                
                </table>

                {!employeeData.length && <Alert />}

            </div>

        </section>
    )
}

export default EmployeeList