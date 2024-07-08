import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Header from '../Components/Header'
import SectionTitle from '../Components/SectionTitle'
import Content from '../Components/Content'

import { content } from '../Utils/Content'
import api from '../api/crud'

const Layout = () => {

  const navigate = useNavigate()

  const location = useLocation()

  // // ================= Admin Login - State Management ====================

  const { navigation } = content

  const [loginLogs, setLoginLogs] = useState([])

  const [logData, setLogData] = useState({
    username: '',
    password: ''
  })

  const [loggerInfo, setLoggerInfo] = useState('')

  const handleLogValueChange = (e) => {
    setLogData({
      ...logData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {

    e.preventDefault();

    const loginData = {
      username: logData.username,
      password: logData.password
    }

    try {
      const response = await api.post('/login', loginData)

      console.log(loginData);

      const final = response.data.data;

      // console.log(final);

      // const newLog = [...loginLogs, response.data]

      // setLoginLogs(newLog)


      if (response.data.message === 'Login successfull') {

        navigate('/home')
        // Redirect to the dashboard or home page

      } else {
        console.log('Invalid username or password');
      }

      localStorage.setItem('username', JSON.stringify(loginData.username))
      setLoggerInfo(JSON.parse(localStorage.getItem('username')) || [])

      setLogData('')

    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  // // Logout 
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('username')
    setLoggerInfo('Login')
    navigate('/')
  }
  // // ===========================================================================


  // // ================== Employee - State Management ===================

  const [employeeData, setEmployeeData] = useState([])

  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);

  // const [fetchError, setFetchError] = useState(null)

  // const [isLoading, setIsLoading] = useState(true)

  // const [image, setImage] = useState(null);


  // // ======== Fetch Employee Data from DB / collection:employeecollection ========

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await api.get('/getAllEmployee')

        const newList = response.data.data

        setEmployeeData(newList)

        // setFetchError(null)
        // setIsLoading(false)

      } catch (err) {
        // setFetchError(err.message)
        console.error(`Error: ${err.message}`);
      }
    }
    // fetchData()
    // setTimeout(() => {
    (async () => await fetchData())()
    // }, 2000);
  }, [fetchDataTrigger])

  // // I used 'fetchDataTriger' state 
  // // When I update data (Edit Employee Data) I used setFetchTrigger() to triger fetchData(). It helps to change state of updated data.
  // // // whatever changes made in 'employeeData' it render 'fetchData()' everytime to 'fetch/update or set' data from db  

  // // ======== Filter or Search employee data ========

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    const filterResult = employeeData.filter((empData) =>
      empData._id.toString().includes(search)
      || empData.name.toLowerCase().includes(search.toLowerCase())
      || empData.email.toLowerCase().includes(search.toLowerCase())
      // || (empData.createdAt && new Date(empData.createdAt).toDateString().includes(search))
    )
    setSearchResult(filterResult)
  }, [employeeData, search])


  // // ===========================================================================

  // // ============ Create New Employee - Form Input - State Management ==================

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    designation: '',
    gender: '',
    course: '',
    avatar: null,
  })

  // // ======= Create New Employee - Form - ValueChange function ======== 

  const handleNewValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // // ======= Create New Employee - Form - Image upload function ======== 

  const [imagePreview, setImagePreview] = useState(null);

  // // convertToBase64-- Function to convert image to webp to preview image in browser window

  // // uses the FileReader API to read the file as a Data URL (Base64 string) and sets the result to the imagePreview state.

  const convertToBase64 = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (image) {
      setFormData({
        ...formData,
        avatar: image
      });
      convertToBase64(image);
    }
  };

  // const [imagePreview, setImagePreview] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     convertToBase64(file);
  //   }
  // };

  // const convertToBase64 = (image) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(image);
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };
  // };


  // // ======== Create New Employee - Form - submit function ======== 

  const handleFormSubmit = async (e) => {

    e.preventDefault();

    const empData = {
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email, 
      designation: formData.designation,
      gender: formData.gender,
      course: formData.course,
      avatar: formData.avatar
    };

    try {
      const response = await api.post('/addEmployee', empData, { headers: { 'Content-Type': 'multipart/form-data' } });

      const newList = [...employeeData, response.data.data];

      setEmployeeData(newList)
      setFormData('')

      setImagePreview(null);
      e.target.reset();

      // setFetchDataTrigger(prev => prev + 1);

      navigate('/employee')

    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // // ======== Employee List - Delete Employee function ======== 

  const handleDeleteEmployee = async (_id) => {
    try {
      await api.delete(`/deleteEmployee/${_id}`)
      setEmployeeData(employeeData.filter(employee => employee._id !== _id));

      // const response = await api.delete(`/deleteEmployee/${id}`)
      // setFetchDataTrigger(prev => prev + 1)
    }
    catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  // // // ======== Employee List - Edit Employee ===========


  return (
    <>
      <Header
        loggerInfo={loggerInfo}

        handleLogOut={handleLogOut}
        navigation={navigation}
        location={location}
      />
      <SectionTitle
        location={location}
      />
      <Content
        // Authentication
        logData={logData}
        handleLogValueChange={handleLogValueChange}
        handleLoginSubmit={handleLoginSubmit}
        // navigate
        navigate={navigate}
        // filter
        search={search}
        setSearch={setSearch}

        employeeData={employeeData}
        setEmployeeData={setEmployeeData}

        searchResult={searchResult}

        setFetchDataTrigger={setFetchDataTrigger}

        // CreateEmployee
        formData={formData}
        handleNewValueChange={handleNewValueChange}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        handleFormSubmit={handleFormSubmit}

        handleDeleteEmployee={handleDeleteEmployee}

      />
    </>
  )
}

export default Layout