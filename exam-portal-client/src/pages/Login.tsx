
import Box from '@mui/material/Box';
import { Link ,useNavigate} from 'react-router';
import logimg from '../assets/react.png';
import  Typography  from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { login } from '../apis/auth';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [userPass, setUserPass] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserPass((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response: { name?: string; role?: string; accessToken?: string; message?: string } = await login(userPass.username, userPass.password);
      if (!response.name || !response.role || !response.accessToken) {
        setError(response.message || 'Invalid credentials. Please try again.');
        return;
      }
      auth?.login({ name: response.name, role: response.role }, response.accessToken);
      
      setUserPass({ username: '', password: '' });
      navigate('/home/dashboard');
    } catch(error) {
      console.log(error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
      <Box
        component="section"
        sx={{
          p: 2,
          boxShadow: 3,
          width: { xs: '90vw', sm: 300, md: 350 },
          height: { xs: 'auto', sm: 400, md: 450 },
          minHeight: { xs: 300, sm: 400 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          maxWidth: 500,
          maxHeight: 600,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          <Box component="img" src={logimg} alt="Login" sx={{ height: 80, width: 80 }} />
          <Typography variant="h1" component="span" style={{ margin: 0, fontWeight: 600, fontSize: '2rem', color: '#1D3E72', textAlign: 'center' }}>
            Exam Easy
          </Typography>
        </Box>
        <Typography component="p" sx={{ textAlign: 'center', color: '#424345ff' }}>
          Welcome Back! Please login to your account.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Username"
            size="small"
            required
            name="username"
            value={userPass.username}
            onChange={handleInputChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            sx={{ minHeight: 40, height: 40, fontSize: '1rem' }}
          />
          <TextField
            label="Password"
            size="small"
            required
            type="password"
            name="password"
            value={userPass.password}
            onChange={handleInputChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            sx={{ minHeight: 40, height: 40, fontSize: '1rem', mb: 1 }}
          />
          <Button variant="contained" type="submit">
            Login <LoginIcon fontSize="small" />
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 1, textAlign: 'center', fontSize: '0.95rem' }}>{error}</Typography>
          )}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
}



