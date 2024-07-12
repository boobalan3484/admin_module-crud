import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Authentication from '../Pages/Authentication'
import Dashboard from '../Components/Dashboard'
import EmployeeList from '../Components/EmployeeList'
import CreateEmployee from '../Components/CreateEmployee'
import EditEmployee from '../Components/EditEmployee'
import NotFoundPage from '../Pages/NotFoundPage'

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/"
                element={<Authentication />}
            />

            <Route path="/home"
                element={<Dashboard />}
            />

            <Route path="/employee">

                <Route index
                    element={<EmployeeList />}
                />

                <Route path="/employee/add"
                    element={<CreateEmployee />}
                />

                <Route path="/employee/edit/:_id"
                    element={<EditEmployee />}
                />

            </Route>

            <Route path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    )
}

export default PageRoutes