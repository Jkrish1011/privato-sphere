import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Auth from '@/pages/auth'
import Chat from '@/pages/chat'
import Profile from '@/pages/profile'
import { useAppStore } from "@/store"
import { useEffect, useState } from "react"
import { GET_USER_INFO } from "./utils/constants"
import { apiClient } from "@/lib/api-client"

/*
  If the userInfo is present, isAuthenticated is true. 
  If it's true, we will render the page to be routed to, else the user should be navigated to the authentication page.
*/
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;

  return isAuthenticated ? children : <Navigate to="/auth" />;
}

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;

  return isAuthenticated ? <Navigate to="/chat" /> : children;
}

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try{
        const response = await apiClient.get(GET_USER_INFO, {withCredentials: true});
        if(response.status == 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
        console.log(response);
      }catch(err){
        setUserInfo(undefined);
        console.error({err});
      }finally{
        setLoading(false);
      }
    }

    if(!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }

  }, [userInfo, setUserInfo]);

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>}/>
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
        <Route path="*" element={<Navigate to="/auth" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
