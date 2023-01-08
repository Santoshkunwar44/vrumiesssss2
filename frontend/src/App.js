import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { Route, Routes } from "react-router-dom"
import Signup from './pages/auth/Signup';
import AppCategory from './pages/Category/AppCategory';
import CreatePost from './pages/createPost/CreatePost';
import OrderTokens from './pages/order/OrderTokens';
import Category from './category/Category';
import { useSelector, useDispatch } from "react-redux"
import SinglePost from './pages/singlePost/SinglePost';
import { useEffect } from 'react';
import { getUserById } from './utils/apis/user/userApi';
import { setUserData } from './redux/actions/userAction';
import NotifyToast from './components/notifyToast/NotifyToast';

function App() {


  const dispatch = useDispatch()
  const { toastifyInfo, refresh } = useSelector((state) => state.otherReducer)
  useEffect(() => {
    fetchCuurentUser()
  }, [refresh])
  const fetchCuurentUser = async () => {
    try {
      const { data } = await getUserById("63b3f63a1c784ae54e5a91e5")
      dispatch(setUserData(data.message))
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App">
      {
        toastifyInfo && <NotifyToast />

      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/category" element={<Category />} />
        <Route path='/category/:catName' element={<AppCategory />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/ordertokens" element={<OrderTokens />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>

    </div>
  );
}

export default App;