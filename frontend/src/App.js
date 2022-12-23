import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { Route, Routes } from "react-router-dom"
import Signup from './pages/auth/Signup';
import AppCategory from './pages/Category/AppCategory';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/category/:catName' element={<AppCategory />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </div>
  );
}

export default App;
