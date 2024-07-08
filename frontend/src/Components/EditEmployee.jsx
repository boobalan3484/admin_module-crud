import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../api/crud'

const EditEmployee = ({ navigate, employeeData, setEmployeeData, setFetchDataTrigger }) => {

  // // // {employeeData, setEmployeeData, navigate, setFetchDataTrigger, editFormData, handleEditValueChange, handleEditFormSubmit }
  // // // update / Edit data

  const { _id } = useParams();

  const [editFormData, setEditFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    designation: '',
    gender: '',
    course: '',
    avatar: '',
  })

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const response = await api.get(`/getEmployee/${_id}`)
        setEditFormData(response.data.data)
      }
      catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
    getEmployeeData()
  }, [_id])

  const handleEditValueChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const [imagePreview, setImagePreview] = useState(null);

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
      setEditFormData({
        ...editFormData,
        avatar: image
      });
      convertToBase64(image);
    }
  };

  const handleEditFormSubmit = async (e) => {

    e.preventDefault();

    const updateData = {
      name: editFormData.name,
      mobile: editFormData.mobile,
      email: editFormData.email,
      designation: editFormData.designation,
      gender: editFormData.gender,
      course: editFormData.course,
      avatar: editFormData.avatar
    };

    try {
      const response = await api.patch(`/updateEmployee/${_id}`, updateData, { headers: { 'Content-Type': 'multipart/form-data' } });

      // // // Assuming the API response contains the updated employee data
      const updatedEmployee = response.data.data;

      // // // console.log(updatedEmployee);
      // // // setEmployeeData(updatedEmployee)

      // // // Find the index of the updated employee in the employeeData array
      const updatedIndex = employeeData.findIndex(employee => employee._id === _id);

      // // // const updatedIndex = employeeData.find(employee => (employee._id).toString() === _id);
      // // // console.log(updatedIndex);

      // // // Create a copy of the employeeData array
      const updatedEmployeeData = [...employeeData];
      // // // console.log(updatedEmployeeData);

      // // // Replace the old employee data with the updated employee data in the copy
      updatedEmployeeData[updatedIndex] = updatedEmployee;
      // // // console.log(updatedEmployeeData[updatedIndex]);

      // // // Update the state with the modified employeeData array
      setEmployeeData(updatedEmployeeData);

      // used "trigger" - FetchDataTrigger is to fetch updated data - updates/changes  to show in employee list 
      setFetchDataTrigger(prev => prev + 1);

      navigate('/employee')

    }
    catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleEditFormSubmit}
      className='max-w-screen-lg mx-auto px-4 md:px-8' >
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-6 mx-auto ">

          <div className="mt-5 grid grid-cols-2 gap-x-8">
            <div className='py-2'>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-indigo-800">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editFormData.name}
                  onChange={handleEditValueChange}
                  placeholder="Enter Full Name"
                  autoComplete="given-name"
                  pattern="^[A-Za-z\s]{2,}$"
                  required
                  title="First character must be uppercase, minimum 3 characters"
                  className="block w-full rounded-md border-2 px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-incet  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='py-2'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditValueChange}
                  placeholder="Enter Email"
                  autoComplete="email"
                  pattern="[a-z0-9].*"
                  required
                  className="block w-full rounded-md border-2 px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="py-2">
              <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile Number
              </label>
              <div className='mt-2 relative flex items-center'>
                <div className="absolute py-1 px-2 border-r ">
                  <select id='country-code' className="text-sm outline-none rounded-md h-full" required>
                    <option disabled >Code</option>
                    <option value="india">+91</option>
                    {/* <option>MR</option> */}
                  </select>
                </div>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={editFormData.mobile}
                  onChange={handleEditValueChange}
                  autoComplete="number"
                  pattern='[0-9]{10}'
                  required
                  placeholder="10 digit mobile number"
                  className="w-full pl-[5rem] border-2 px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-md"
                />
              </div>

            </div>

            <div className='py-2'>
              <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">
                Designation
              </label>
              <div className="mt-2">
                <select
                  id="designation"
                  name="designation"
                  value={editFormData.designation}
                  onChange={handleEditValueChange}
                  required
                  className="block w-full rounded-md border-2 px-3 py-[8px] text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option disabled >Select option </option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
            </div>

            <div className='py-2'>
              <legend className="block text-sm font-medium leading-6 text-gray-900">
                Gender
              </legend>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={editFormData.gender === 'male'}
                    onChange={handleEditValueChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-900">
                    Male
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={editFormData.gender === 'female'}
                    onChange={handleEditValueChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-900">
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className='py-2'>
              <legend className="block text-sm font-medium leading-6 text-gray-900">
                Course
              </legend>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    id="mca"
                    name="course"
                    value="mca"
                    checked={editFormData.course === 'mca'}
                    onChange={handleEditValueChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="mca" className="block text-sm font-medium leading-6 text-gray-900">
                    MCA
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    id="bca"
                    name="course"
                    value="bca"
                    checked={editFormData.course === 'bca'}
                    onChange={handleEditValueChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="bca" className="block text-sm font-medium leading-6 text-gray-900">
                    BCA
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    id="bsc"
                    name="course"
                    value="bsc"
                    checked={editFormData.course === 'bsc'}
                    onChange={handleEditValueChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="bsc" className="block text-sm font-medium leading-6 text-gray-900">
                    BSC
                  </label>
                </div>
              </div>
            </div>

            <div className='py-2'>

              <legend className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </legend>

              <div className="mt-2 flex justify-evenly items-center rounded-lg border border-dashed border-gray-900/25 px-4 py-4">

                <div className='border-r-2 pr-6'>
                  <span>
                    <img src={imagePreview ? imagePreview : editFormData.avatar} alt="Preview" style={{ width: '100px', height: '75px' }} className='bg-cover rounded-md shadow-md shadow-slate-600' />
                  </span>

                  <p className="text-xs leading-4 mt-3">
                    File successfully uploaded!
                  </p>

                </div>

                <div className="my-10 text-sm leading-6 text-gray-600">

                  <label
                    htmlFor="avatar"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:underline hover:text-indigo-500"
                  >

                    <span>Upload a file</span>

                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleImageChange}
                      // required
                      className="sr-only"
                    />
                  </label>

                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, JPEG upto 10MB</p>

                </div>

              </div>

            </div>

            <div className="mt-6 flex justify-center items-center border-l-2">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm tracking-wide font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      </div >
    </form >
  )
}

export default EditEmployee