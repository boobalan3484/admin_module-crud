import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Authentication from '../Pages/Authentication'
import Dashboard from '../Components/Dashboard'
import EmployeeList from '../Components/EmployeeList'
import CreateEmployee from '../Components/CreateEmployee'
import EditEmployee from '../Components/EditEmployee'
import NotFoundPage from '../Pages/NotFoundPage'

const PageRoutes = ({ logData, handleLogValueChange, handleLoginSubmit, navigate, search, setSearch, employeeData, setEmployeeData, searchResult, formData, handleNewValueChange, imagePreview, handleImageChange, handleFormSubmit, handleDeleteEmployee, setFetchDataTrigger }) => {
    return (
        <Routes>
            <Route path="/"
                element={
                    <Authentication
                        logData={logData}
                        handleLogValueChange={handleLogValueChange}
                        handleLoginSubmit={handleLoginSubmit}
                    />}
            />

            <Route path="/home"
                element={<Dashboard />}
            />

            <Route path="/employee">

                <Route index
                    element={<EmployeeList
                        search={search}
                        setSearch={setSearch}

                        employeeData={searchResult}

                        handleDeleteEmployee={handleDeleteEmployee}
                    />}
                />

                <Route path="/employee/add"
                    element={<CreateEmployee
                        formData={formData}
                        handleNewValueChange={handleNewValueChange}
                        imagePreview={imagePreview}
                        handleImageChange={handleImageChange}
                        handleFormSubmit={handleFormSubmit}
                    />}
                />

                <Route path="/employee/edit/:_id"
                    element={<EditEmployee
                        employeeData={employeeData}
                        setEmployeeData={setEmployeeData}
                        setFetchDataTrigger={setFetchDataTrigger}

                        navigate={navigate}
                    />}
                />

            </Route>

            <Route path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    )
}

export default PageRoutes