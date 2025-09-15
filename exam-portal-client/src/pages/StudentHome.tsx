import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function StudentHome() {
	return (
		<Box sx={{ p: 4, minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			<Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#1976d2' }}>
				Welcome, Student!
			</Typography>
			<Typography variant="body1" sx={{ mb: 2, color: '#424345' }}>
				This is your home page. Here you can view and attempt available exams, check your results, and more.
			</Typography>
			{/* Add more student features here */}
		</Box>
	);
}

