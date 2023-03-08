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
import { useEffect, useState } from 'react';
import { getLoggedInUser, logoutApi } from './utils/apis/user/userApi';
import { logoutUser, setUserData } from './redux/actions/userAction';
import NotifyToast from './components/notifyToast/NotifyToast';
import PaymentComplete from './pages/paymentComplete/PaymentComplete';
import { setSessionExpired } from './redux/actions/otherAction';
import NewSession from './components/modal/sessionCompleted/SessionCompleted';
import ProfilePost from './pages/singlePost/profilePost/ProfilePost';
import Transaction from './pages/profile/Trasaction/Transaction';
import Initial from './pages/profile/Initial/Initial';
import AllPost from './pages/profile/AllPost/AllPost';
import Contents from './pages/profile/Contents/Contents';
import Chat from './pages/chat/Chat';
import StartMessageBox from './components/Message/StartMessageBox/StartMessageBox';
import MessageBox from './Layouts/MessageBox/MessageBox';
import Content from './pages/Content/Content';

function App() {


  const { toastifyInfo, refresh, sessionExpired } = useSelector((state) => state.otherReducer)
  const { userData } = useSelector((state) => state.userReducer)
  const [intevalIdArr, setIntervalId] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    fetchCuurentUser()
  }, [refresh])

  useEffect(() => {
    if (!userData) return
    const { lastLoggedIn } = userData;
    const sessionExpirationTimeInMS = lastLoggedIn + 31556952000;
    const currentTime = Date.now()
    if (sessionExpirationTimeInMS <= currentTime || !userData?.username || intevalIdArr.length > 0) return
    handleSessionExpirationCheck(sessionExpirationTimeInMS)
  }, [userData])




  const handleSessionExpirationCheck = (sessionEndTime) => {
    let intervalId = setInterval(async () => {
      let currentTime = Date.now();
      const remainingSeconds = Math.floor((sessionEndTime - currentTime) / 1000);
      if (remainingSeconds <= 20) {
        clearInterval(intervalId)
        await logoutApi()
        dispatch(logoutUser())
        dispatch(setSessionExpired())
      }
    }, 1000);
    setIntervalId((prev) => {
      return [...prev, intervalId]
    })
  }

  const fetchCuurentUser = async () => {
    try {
      const res = await getLoggedInUser()
      if (res && res?.data?.success) {
        const { data: { message } } = res;

        dispatch(setUserData(message))
      } else {
        dispatch(setUserData(null))
      }


    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }


  return (
    <div className="App">
      {
        toastifyInfo && <NotifyToast />
      }
      {
        sessionExpired && <NewSession />
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<Content />} >


        </Route>
        <Route path='/chat' element={<Chat />} >
          <Route path=':chatId' element={<MessageBox />} />
          <Route path='user/:userId' element={<MessageBox />} />
          <Route path='' index element={<StartMessageBox />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='profile/:userId' element={<Profile />} >
          <Route path='' index element={<Initial />} />
          <Route path='post/:postId' element={<ProfilePost />} />
          <Route path='transactions' element={<Transaction />} />
          <Route path='content' element={<Contents />} />
        </Route>
        <Route path="/category" element={<Category />} />
        <Route path='/category/:catName' element={<AppCategory />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createpost" element={<ProtectedRoute> <CreatePost /> </ProtectedRoute>} />
        <Route path="/ordertokens" element={<ProtectedRoute> <OrderTokens /> </ProtectedRoute>} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path='/completion' element={<PaymentComplete />} />
      </Routes>





    </div >
  );
}

const ProtectedRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.userReducer)
  if (userData) {
    return children
  } else {
    return <Signup />
  }
}

export default App;