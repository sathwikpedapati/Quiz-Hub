import './App.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import QuizApp from './Pages/QuizApp';
import { useState } from 'react';
import RefreshHandler from './Pages/RefreshHandler';
import Home from './Pages/Home';
function App() {
  const[isAuthenticated,setIsAuthenticated]=useState("");
  const PrivateRoute=({element})=>{
    return isAuthenticated ? element:<Navigate to="/login"/>
  }
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
    <Route path="/" element={<Navigate to="/login"/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/quiz' element={<PrivateRoute element={<QuizApp/>}/>}/>
    </Routes>
    </div>
  );
}

export default App;