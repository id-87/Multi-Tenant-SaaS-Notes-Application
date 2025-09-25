import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './assets/Components/Home';
import Navbar from './assets/Components/Navbar';
import Signup from './assets/Components/Signup'
import Login from './assets/Components/Login'
import CreateNotes from './assets/Components/CreateNotes';
import UpdateNotes from './assets/Components/UpdateNotes';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update" element={<UpdateNotes />} />
        <Route path="/create" element={<CreateNotes />} />
      </Routes>
    </Router>
  )
}

export default App