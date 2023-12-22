import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from './Form';
import NavBar from './NavBar';
import Footer from './Footer';
import GenerateAdmitCard from './GenerateAdmitCard';
// import AdmitCardGenerate from './AdmitCardGenerate';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
           <Route path="/home" element={<Form />} />
           <Route path="/" element={<GenerateAdmitCard />} />
        </Routes>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
