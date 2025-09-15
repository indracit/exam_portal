import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function LoadingPage() {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f5f7fa',
    }}>
      <CircularProgress size={80} thickness={5} sx={{ color: '#1976d2', mb: 3, animation: 'spin 1.5s linear infinite' }} />
      <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 700, mb: 1 }}>
        Loading...
      </Typography>
      <Typography variant="body1" sx={{ color: '#424345' }}>
        Please wait while we prepare your exam portal.
      </Typography>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}
