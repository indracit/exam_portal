
import { Routes, Route, useNavigate } from "react-router";
import Login from "./pages/Login";
import LoadingPage from "./pages/LoadingPage";
import NotFound from "./pages/NotFound";
import Protected from "./components/Protected";
import StudentHome from "./pages/StudentHome";
import {useAuth} from "./hooks/useAuth";
import { useEffect } from "react";
import { refreshToken } from "./apis/auth";

function App() {

   const auth = useAuth();
   const navigate = useNavigate();

  useEffect(() => {
    async function fetchRefreshToken() {
      try {
        const response = await refreshToken();

        if (response && response.user.name && response.user.role && response.accessToken) {
          auth?.login({ name: response.user.name, role: response.user.role }, response.accessToken);
          navigate('/home');
        }
        else {
         console.log(response);
         navigate('/login');
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        navigate('/login');
      }
    }
    fetchRefreshToken();
  }, []);

  return (
    <>
      <Routes>
        <Route  path='/login' element={<Login />} />
  <Route index path='/' element={<LoadingPage />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<StudentHome />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
