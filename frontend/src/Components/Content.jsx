import React from 'react'
import PageRoutes from '../Utils/PageRoutes'

const Content = ({ logData, handleLogValueChange, handleLoginSubmit, navigate, search, setSearch, employeeData, setEmployeeData, searchResult, formData, handleNewValueChange, imagePreview, handleImageChange, handleFormSubmit, handleDeleteEmployee, setFetchDataTrigger }) => {
    return (
        <main className='flex-grow'>
            <PageRoutes
                logData={logData}
                handleLogValueChange={handleLogValueChange}
                handleLoginSubmit={handleLoginSubmit}

                navigate={navigate}

                search={search}
                setSearch={setSearch}

                employeeData={employeeData}
                setEmployeeData={setEmployeeData}

                searchResult={searchResult}
                setFetchDataTrigger={setFetchDataTrigger}

                formData={formData}
                handleNewValueChange={handleNewValueChange}
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                handleFormSubmit={handleFormSubmit}

                handleDeleteEmployee={handleDeleteEmployee}
            />
        </main>
    )
}

export default Content