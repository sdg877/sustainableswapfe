import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoginSignupPage from '../Pages/LoginSignupPage.jsx';
import ItemCreate from '../Components/ItemCreate.jsx';
import ItemList from '../Pages/ItemList.jsx';
import ItemViewPage from '../Components/ItemViewPage.jsx';
import Logout from '../Components/Logout.jsx';
import Menu from '../Components/Menu.jsx';
import ProfilePage from '../Pages/ProfilePage.jsx';
import AboutMe from '../Pages/AboutMe.jsx'
import './App.css';


function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = getUserId(); 
    setUserId(user);
  }, []);

  const getUserId = () => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : null;
  };
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <header>
          <Menu />
          <br></br>
        </header>

        <div>
            <Routes>
              <Route path='/login' element={<LoginSignupPage />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/items/:itemId' element={<ItemViewPage />} />
              <Route path='/items/create' element={<ItemCreate userId={userId} />} />
              <Route path='/profile/:userId/items/' element={<ProfilePage />} />
              <Route path='/about' element={<AboutMe />} />
              <Route path='/' element={<ItemList />} />
            </Routes>
        </div>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
