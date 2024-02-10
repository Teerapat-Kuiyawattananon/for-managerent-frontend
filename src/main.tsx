// import React from 'react'
// import ReactDOM from 'react-dom'
// import Navbar from './navbar.tsx'
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from './components/login/Login.tsx';
// import Register from './components/register/Register.tsx'
// import './index.css'


// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         {/* <Route path="/test" element={<Navbar />} /> */}
//       </Routes>
//     </Router>
    
//   </React.StrictMode>,
//   document.getElementById('root')
// )

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Navbar />
//   </React.StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './navbar.tsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login/Login.tsx';
import Register from './components/register/Register.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    {
      localStorage.getItem('user') ? <Navbar /> : null
    }
  </React.StrictMode>,
)
