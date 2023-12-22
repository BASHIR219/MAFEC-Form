import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import admitCard from './admit-card-temp.pdf';

const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

export default function GenerateAdmitCard() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [pdfInfo, setPdfInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pdfInfo.length > 0) {
      handleDownload(pdfInfo);
    }
  }, [pdfInfo]);

  const generateAdmitCard = async () => {
    try {
      const [response, paymentDataResponse] = await Promise.all([
        axios.get(`https://mafecbackend-new.onrender.com/api/form/${registrationNumber}`, {
          method: 'GET',
          responseType: 'json',
        }),
        axios.get(`https://mafecbackend-new.onrender.com/api/form/payment/${registrationNumber}`, {
          method: 'GET',
          responseType: 'json',
        }),
      ]);
      if (response.status === 200 && paymentDataResponse.status === 200)
       {
        setRegistrationNumber(null)
        console.log(response);
        const existingPdfBytes = await fetch(admitCard).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        const imageBuffer1 = response.data.image.data; // Assuming image data is in Buffer format
        const uint8Array1 = new Uint8Array(imageBuffer1);
        let binaryString1 = "";
        uint8Array1.forEach((byte) => {
          binaryString1 += String.fromCharCode(byte);
        });
        const imageBase64_1 = btoa(binaryString1);
        const imageBytes1 = Uint8Array.from(atob(imageBase64_1), (c) => c.charCodeAt(0));
        const image = await pdfDoc.embedJpg(imageBytes1);

        const imageBuffer2 = response.data.signature.data; // Assuming image data is in Buffer format
        const uint8Array2 = new Uint8Array(imageBuffer2);
        let binaryString2 = "";
        uint8Array2.forEach((byte) => {
          binaryString2 += String.fromCharCode(byte);
        });
        const imageBase64_2 = btoa(binaryString2);
        const imageBytes2 = Uint8Array.from(atob(imageBase64_2), (c) => c.charCodeAt(0));
        const sign = await pdfDoc.embedJpg(imageBytes2);
        
        let studentName = '';
        let centreName = '';
        let centreName1 = '';
        let centreName2 = '';
        let centreName3 = '';
        let centreName4 = '';
        let centreName5 = '';
        let rollNumber = '';
        const half = response.data.registrationNumber;
        const lastFourDigits = half.slice(-4);
        if (response.data.centerPreference === 'Delhi') {
          centreName1 = "MILLI MODEL SCHOOL, ABUL FAZAL"
          centreName2 = "ENCLAVE, PART-1, BLOCK D,"
          centreName3 = "NEAR AL-SHIFA HOSPITAL, OKHLA,"
          centreName4 = "NEW DELHI– 110025"
          centreName5 = "NEAREST METRO STATION – OKHLA VIHAR";
          rollNumber = "24M5D" + lastFourDigits;
          centreName = "TC-01 Delhi"
        }
        else if (response.data.centerPreference === 'Uttar Pradesh') {
          centreName1 = "AL-HIRA SCHOOL(AL-HIRA TUTORIALS),"
          centreName2 = "IQRA HALL"
          centreName3 = "(OLD GREEN MARRIAGE HALL)"
          centreName4 = "LANDMARK: Madrasa Shamsul Huda"
          centreName5 = "BARI PATH, BHIKNA PAHARI,PATNA-800006"
          rollNumber = "24M5P" + lastFourDigits;
          centreName = "TC-03 Patna"
        }
        else if (response.data.centerPreference === 'Patna') {
          centreName1 = "AIM THE VISION TUTORIAL,"
          centreName2 = "UGF-5 YASH SILVER HEIGHTS,"
          centreName3 = "NEAR BADSHAH NAGAR METRO STATION"
          centreName4 = "(BEHIND THE TEMPLE),"
          centreName5 = "LUCKNOW-226007"
          rollNumber = "24M5L" + lastFourDigits;
          centreName = "TC-02 Lucknow"
        }

        studentName = response.data.firstName +' '+ response.data.lastName

        firstPage.drawImage(image, {
          x: 464,
          y: 447,
          width: 98,
          height: 113, // Height of the image (scaled by 2)
        });

        firstPage.drawImage(sign, {
          x: 60,
          y: 365,
          width: 138,
          height: 54,
        });

        //Draw a string of text diagonally across the first page
        //last name
        //capitalise male female
        //
        firstPage.drawText(studentName, {
          x: 165,
          y: 575,
          size: 11,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
          bold: true,
        })
       
        firstPage.drawText(response.data.registrationNumber, {
          x: 165,
          y: 627,
          size: 11,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
          bold: true,
        })
        firstPage.drawText(rollNumber, {
          x: 452,
          y: 635,
          size: 11,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        })
        firstPage.drawText(response.data.coursePreference, {
          x: 165,
          y: 598,
          size: 11,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        })
        firstPage.drawText(response.data.fatherName, {
          x: 165,
          y: 555,
          size: 11,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        })
        firstPage.drawText(response.data.sex, {
          x: 165,
          y: 531,
          size: 11,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        })
        firstPage.drawText(centreName, {
          x: 165,
          y: 505,
          size: 11,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        })
        firstPage.drawText(centreName1, {
          x: 150,
          y: 485,
          size: 9,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
          lineBreak: true,
        })
        firstPage.drawText(centreName2, {
          x: 150,
          y: 475,
          size: 9,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
          lineBreak: true,
        })
        firstPage.drawText(centreName3, {
          x: 150,
          y: 465,
          size: 9,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
          lineBreak: true,
        })
        firstPage.drawText(centreName4, {
          x: 150,
          y: 455,
          size: 9,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
          lineBreak: true,
        })
        firstPage.drawText(centreName5, {
          x: 150,
          y: 445,
          size: 9,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
          lineBreak: true,
        })

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()
        console.log("pdf is edited and saved");
        return pdfBytes;
      }
    }
    catch (error) {
      setError('User not found or internal server error');
      console.error(error);
      setRegistrationNumber(null)
      throw error; // Re-throw the error to stop the execution    
    };
  }
  const handleDownload = (pdfInfo) => {
    // Assuming pdfInfo contains the PDF response received from the server
    const blob = new Blob([pdfInfo], { type: 'application/pdf' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Admit-card.pdf';
    setSuccess("Admit Card generated and downloaded Successfully")
    document.body.appendChild(a);
    a.click();
    // Clean up
    window.URL.revokeObjectURL(url);
  };

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("handle cliked");
    try {
      console.log("entering into generate admit card");
      const pdfData = await generateAdmitCard();
      console.log("pdf got from generate fun");
      setPdfInfo(pdfData);
      console.log("calling handle download");

    } catch (error) {
      setError("Registration fee not paid. Please complete the payment")

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div>
          <Spinner /> {/* Render spinner if isLoading is true */}
          <p className='text-center fs-2'>Generating your Admit card. Please wait...</p>
        </div>
      )}
      {!loading && (
        <div style={{ backgroundImage: 'linear-gradient(to left, #a9c7ea, #7e96b7, #556886, #2f3e58, #0a182e)', }}>
          <form onSubmit={handleClick} method='GET'>
            <div className='container container-fluid shadow-sm d-flex justify-content-center align-items-center ' style={{ height: '790px', }}>

              <div className="card text-center" style={{ width: '28rem', height: '30rem', backgroundColor: '#0d213f', boxShadow: '-1px 2px 10px rgba(255, 255, 255, 0.8)' }}>

                <div className="card-header border-light" style={{ backgroundColor: '#0a192f', color: 'white', }}>
                  <b>Download your Admit-Card</b>
                </div>
                <div className="card-body mt-3 ml-5 " style={{ color: 'white' }} >
                  <div>
                    <p className='text-info pb-2'>
                      <b>
                      Detailed need to be filled same as in application form, in case of any issue contact the administrator
                      </b>                  
                    </p>
                  </div>
                  <div className='text-left'>
                    <label htmlFor="inputField"><b>Name:</b></label>
                    <br />
                    <input
                      id="inputField"
                      type="text"
                      className="max-w-xs block w-full rounded-md border-1 border-white  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1" placeholder="Enter Name"
                      style={{ backgroundColor: '#0a192f', color: 'white' }}
                      required
                    />
                  </div>
                  <div className='pt-4 text-left'>
                    <label htmlFor="phoneNmber"><b>Mobile Number:</b></label>
                    <br />
                    <input
                      id='phoneNmber'
                      type="text"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className="max-w-xs block w-full rounded-md border-1 border-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1" placeholder="Enter Mobile Number"
                      minLength="10"
                      pattern=".{10,}"
                      title="Minimum length must be 10 characters"
                      required
                      style={{ backgroundColor: '#0a192f', color: 'white' }}
                    />
                  </div>
                  <div >{error && <b><p className="text-red-600 mt-2">{error}</p></b>}</div>
                  <div >{success && <b><p className="text-green-600  mt-2">{success}</p></b>}</div>
                  <button type='submit' className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 position-absolute bottom-5 start-50 translate-middle-x mb-5 " style={{ backgroundColor: '#0a192f', color: 'white', border: '2px solid white' }}  >Generate Admit-Card</button>
                </div>
                <div className="card-footer border-light" style={{ backgroundColor: '#0a192f', color: 'white' }}>
                  Your browser will automatically download the Admit Card
                </div>
              </div>
            </div>
          </form>
        </div>)}
    </>
  );
}
