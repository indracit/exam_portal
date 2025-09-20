
import { Routes, Route, useNavigate } from "react-router";
import Login from "./pages/Login";
import LoadingPage from "./pages/LoadingPage";
import NotFound from "./pages/NotFound";
import Protected from "./components/Protected";
import StudentHome from "./pages/StudentHome";
import {useAuth} from "./hooks/useAuth";
import { useEffect } from "react";
import { refreshToken } from "./apis/auth";
import Exams from "./pages/Exams";
import Results from "./pages/Results";
import Blog from "./pages/Blog";  
import  Dashboard from "./pages/Dashboard";

function App() {

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRefreshToken() {
      try {
        const response = await refreshToken();

        if (response && response.user.name && response.user.role && response.accessToken) {
          auth?.login({ name: response.user.name, role: response.user.role }, response.accessToken);
          navigate('/home/dashboard');
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
  },[]);

  return (
    <>
    <style>{`
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f5f5f5;
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
    `}
    </style>
      <Routes>
        <Route  path='/login' element={<Login />} />
  <Route index path='/' element={<LoadingPage />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<StudentHome />} >
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="exams" element={<Exams />} />
            <Route path="results" element={<Results />} />
            <Route path="blog" element={<Blog />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
