import React from 'react'
import "./index.css"
import Spinner from './Spinner';
import { useState, useEffect } from 'react';


export default function Form() {

  const [firstImage, setfirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [submitmsgFail, setSubmitmsgFail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitmsgSuccess, setSubmitmsgSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [uniqueErr, setUniqueErr] = useState(null);

  const [userData, setUserData] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      fatherName: '',
      motherName: '',
      address: '',
      state: '',
      postalCode: '',
      centerPreference: 'Delhi',
      class12Percentage: '',
      stream: 'Science',
      phoneNumber: '',

    });

  useEffect(() => {
    console.log("formSubmitted:", formSubmitted);
    console.log("submitmsgSuccess:", submitmsgSuccess);
    let timeout;
    if (formSubmitted && submitmsgSuccess) {
      timeout = setTimeout(() => {
        console.log("inside setTimeout");
        console.log(timeout)
        handlePayment();

      }, 2000);

    }
    return () => {
      clearTimeout(timeout);
    };
  }, [formSubmitted, submitmsgSuccess]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFirstImage = (event) => {
    const file = event.target.files[0]; // Get the selected file

    const maxSize = 100 * 1024; // 100KB in bytes
    if (file && file.size > maxSize) {
      setErrorMessage1('Image size exceeds the limit. Choose a smaller size(max 100KB).');
      return;
    }
    console.log("image file ", file)
    setfirstImage(file);
    setErrorMessage1('');
  };

  const handleSecondImage = (event) => {
    const file = event.target.files[0];
    const maxSize = 100 * 1024; // 100KB in bytes

    if (file && file.size > maxSize) {
      setErrorMessage2('Image size exceeds the limit. Choose a smaller size(max 100KB).');
      return;
    }
    console.log("signature file ", file)
    setSecondImage(file);
    setErrorMessage2('');
  };

  const handleThirdImage = (event) => {
    const file = event.target.files[0];
    const maxSize = 100 * 1024; // 100KB in bytes

    if (file && file.size > maxSize) {
      setErrorMessage3('Image size exceeds the limit. Choose a smaller size(max 100KB).');
      return;
    }
    console.log("identityProof file ", file)
    setThirdImage(file);
    setErrorMessage3('');
  };

  //handle payment
  const handlePayment = () => {
    try {
      const razorpayPaymentLink = 'https://rzp.io/l/Mafecdelhi2024-25';
      const paymentWindow = window.open(razorpayPaymentLink, '_blank');

      if (paymentWindow) {
        // If the window is successfully opened, focus on it
        paymentWindow.focus();
      } else {
        // If the window fails to open, log an error message
        console.error('Failed to open payment window.');
      }
    } catch (error) {
      // Catch any errors that occur during the process
      console.error('Error while opening payment window:', error);
    }
  };



  //send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData();

    // Append form data fields to the FormData object
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    formData.append('fatherName', userData.fatherName);
    formData.append('motherName', userData.motherName);
    formData.append('sex', userData.sex);
    formData.append('address', userData.address);
    formData.append('state', userData.state);
    formData.append('postalCode', userData.postalCode);
    formData.append('centerPreference', userData.centerPreference);
    formData.append('class12Percentage', userData.class12Percentage);
    formData.append('stream', userData.stream);
    formData.append('coursePreference', userData.coursePreference);
    formData.append('phoneNumber', userData.phoneNumber);

    // Append the image file to the FormData object
    formData.append('image', firstImage);
    formData.append('signature', secondImage);
    formData.append('identityProof', thirdImage);
    try {
      const response = await fetch('https://mafecbackend-new.onrender.com/api/form', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitmsgSuccess('Thank you for submitting the form! We have received your information.')
        setFormSubmitted(true);
        setfirstImage(null);
        setSecondImage(null);
        setThirdImage(null);
        setLoading(false);
        setSubmitmsgFail(null)

        setUserData({
          // Reset your form fields here
          firstName: '',
          lastName: '',
          email: '',
          fatherName: '',
          motherName: '',
          sex: '',
          address: '',
          state: '',
          postalCode: '',
          centerPreference: 'Delhi',
          coursePreference:'',
          class12Percentage: '',
          stream: 'Science',
          phoneNumber: ''
        });


      } else {
        console.error(response.status);
        const data = await response.json();
        console.log('Data received:', data);
        if (data.error) {
          // Display the error message to the user
          if (data.error) {
            setUniqueErr(data.error)
            // Display the error message to the user
          }
          console.log("uniqueErr is now ", uniqueErr);
        }
        setSubmitmsgFail('Failed to Submit Form')
        setLoading(false)
        
      }
    } catch (error) {
      console.error('Error occurred while saving form data and image:', error.message);
      setSubmitmsgFail('Failed to Submit Form: Unexpected error occurred.')
      setLoading(false)
    }

  };

  return (
    <>
      <h2 className="text-4xl font-bold p-4 mx-auto max-w-screen-xl " style={{ marginLeft: "360px" }}>MAFEC 5.0 Entrance Application Form (2024-25)</h2>
      <div className='mx-auto p-4 max-w-screen-xl'>
        {loading && (
          <div>
            <Spinner /> {/* Render spinner if isLoading is true */}
            <p className='text-center'>Submitting your form. This may take a moment....</p>
          </div>
        )}
        {!loading && (<form onSubmit={handleSubmit} method='POST'>
          <div className="space-y-12 mx-auto my-auto">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900"> It is a platform that provides coaching for BA.LLB + B.A (All courses) Entrance preparation for JMI + AMU & other universities.</h2>
              <h2 className="mt-1 text-sm leading-6 text-gray-900">Free SUPER-30 (For BA.LLB Batch) & Free SUPER-10 (For B.A Batch). For more information and details regarding entrance examination, visit our PROSPECTUS (MAFEC 5.0) on our website <a className='text-primary' href='https://www.mafecdelhi.org' target="_blank" rel="noopener noreferrer" >www.mafecdelhi.org.</a></h2>

              <div className='mt-5 bg-danger bg-opacity-10 border-2 border-danger border rounded'>
              <p className='text-red-500 ml-4 fs-2'>
                <b>The deadline for form submissions has passed. Thank you for your interest.</b>
              </p>
              </div>
              
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleInputChange}
                      id="last-name"
                      autoComplete="family-name"
                      style={{
                        borderWidth: '3px',
                      }}
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"


                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="father-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Father Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="fatherName"
                      value={userData.fatherName}
                      onChange={handleInputChange}
                      id="father-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="mother-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Mother Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="motherName"
                      value={userData.motherName}
                      onChange={handleInputChange}
                      id="mother-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label className='text-sm font-medium'>Sex:</label>
                  <div className="flex items-center mt-2">
                    <input
                      type="radio"
                      id="male"
                      name="sex"
                      value="Male"
                      checked={userData.sex === "Male"}
                      onChange={handleInputChange}
                      className="mr-2"
                      required
                    />
                    <label htmlFor="male" className="text-sm mr-4">Male</label>
                    <input
                      type="radio"
                      id="female"
                      name="sex"
                      value="Female"
                      checked={userData.sex === "Female"}
                      onChange={handleInputChange}
                      className="mr-2"
                      required
                    />
                    <label htmlFor="female" className="text-sm mr-4">Female</label>
                  </div>
                </div>


                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      value={userData.address}
                      onChange={handleInputChange}
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="state"
                      value={userData.state}
                      onChange={handleInputChange}
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postalCode"
                      value={userData.postalCode}
                      onChange={handleInputChange}
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                    Mobile No.:
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleInputChange}
                      id="phoneNumber"
                      autoComplete="tel"
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                      maxLength="10"
                      required
                    />
                    <p className='text-red-500'><b>{uniqueErr}</b></p>
                  </div>
                </div>

               

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="class12Percentage" className="block text-sm font-medium leading-6 text-gray-900">
                    Class 12th Percentage(%):
                  </label> <p className='text-sm'>(If appearing, write NA)</p>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="class12Percentage"
                      value={userData.class12Percentage}
                      onChange={handleInputChange}
                      id="class12Percentage"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="stream" className='text-sm font-medium'>Stream:</label>
                  <select
                    id="stream"
                    name="stream"
                    className="m-2 text-sm border-1 border-black rounded"
                    onChange={handleInputChange}
                    value={userData.stream} // Set the initial value here
                    required
                  >
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Art">Art/Humanities</option>
                  </select>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label className='text-sm font-medium'>Course Preference:</label>
                  <div >
                    <input
                      type="radio"
                      id="baLLB"
                      name="coursePreference"
                      value="BA.LLB"
                      checked={userData.coursePreference === "BA.LLB"}
                      onChange={handleInputChange}
                      className="mr-2"
                      required
                    />
                    <label htmlFor="baLLB" className="text-sm mr-4">BA.LLB</label>   
                    <br />              
                    <input
                      type="radio"
                      id="baAllCourses"
                      name="coursePreference"
                      value="B.A. (All Courses)"
                      checked={userData.coursePreference === "B.A. (All Courses)"}
                      onChange={handleInputChange}
                      className="mr-2"
                      required
                    />
                     
                    <label htmlFor="baAllCourses" className="text-sm mr-4">B.A. (All Courses)</label>
                    <br />
                    <input
                      type="radio"
                      id="both"
                      name="coursePreference"
                      value="Both (BA.LLB + B.A.)"
                      checked={userData.coursePreference === "Both (BA.LLB + B.A.)"}
                      onChange={handleInputChange}
                      className="mr-2"
                      required
                    />
                    <label htmlFor="both" className="text-sm">Both (BA.LLB + B.A.)</label>
                    
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="centerPreference" className='text-sm font-medium'>
                    Center Prefrence:
                  </label>
                  <select
                    id="centerPreference"
                    name="centerPreference"
                    value={userData.centerPreference}
                    onChange={handleInputChange}
                    className="m-2 text-sm border-1 border-black rounded"
                    required
                  >
                    <option value="TC-01 Delhi">TC-1 (DELHI)</option>                                     
                    <option value="TC-02 Lucknow">TC-2 (LUCKNOW)</option>  
                    <option value="TC-03 Patna">TC-3 (PATNA)</option> 
                  </select>
                </div>              
              </div>         
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <div className="mb-4">
                      <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                        Upload Image(only jpg/jpeg) <p className='text-blue-500'>Max size 100kb</p>
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFirstImage}
                        accept="image/jpeg"
                        className="mt-1 p-2 border border-gray-300 rounded"
                        required
                      />
                      {errorMessage1 && <p className="text-red-500 mt-2">{errorMessage1}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="signature" className="block text-sm font-medium text-gray-600">
                        Upload Signature(only jpg/jpeg)<p className='text-blue-500'>Max size 100kb</p>
                      </label>
                      <input
                        type="file"
                        name="signature"
                        onChange={handleSecondImage}
                        id="signature"
                        accept="image/jpeg"
                        className="mt-1 p-2 border border-gray-300 rounded"
                        required
                      />
                      {errorMessage2 && <p className="text-red-500 mt-2">{errorMessage2}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="identityProof" className="block text-sm font-medium text-gray-600">
                        Upload ID proof(Driver license/ Adhar or any Gov. ID)
                        <p>(only jpg/jpeg)</p>
                        <p className='text-blue-500'>Max size 100kb</p>
                      </label>
                      <input
                        type="file"
                        name="identityProof"
                        onChange={handleThirdImage}
                        id="identityProof"
                        accept="image/jpeg"
                        className="mt-1 p-2 border border-gray-300 rounded"
                        required
                      />
                      {errorMessage3 && <p className="text-red-500 mt-2">{errorMessage3}</p>}
                    </div>
                  </div>
                </div>
              </div>
            

              <div className="mt-2 flex-direction-row items-center justify-end gap-x-6">
                <div> {submitmsgFail && <h2 className="text-red-500 fs-4 mb-2"><b>{submitmsgFail}</b></h2>}</div>
                <div> {submitmsgSuccess && formSubmitted && <h2 className="text-green-500 fs-1 mb-2"><b>{submitmsgSuccess}</b></h2>}</div>

                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Submit Form
                </button>
                <p className='mt-4'>
                  Already Submitted form?{" "}Click to Pay
                  <a className="text-primary" href="https://rzp.io/l/Mafecdelhi2024-25" target="_blank" rel="noopener noreferrer">
                    Click to Pay
                  </a>
                </p>

              </div>
            </div>
          </div>
        </form>)}
      </div>
    </>
  )
}