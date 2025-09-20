import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './pages.css'

export default function Dashboard() {

  

  return <>

    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 3 , width: '90%'}}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        My Exams
      </Typography>
      <Button variant="outlined" >
        See all Results
      </Button>
    </Box>



    <table
      className="table-container"
    >
      <thead>
        <tr className='table-row' >
          <th className='table-header' >EXAM NAME</th>
          <th className='table-header'>STATUS</th>
          <th className='table-header'>ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='table-data'>Math Exam</td>
          <td className='table-data'>
            <p className='status-completed' >Completed</p>
          </td>
          <td className='table-data'>
            <Button variant="contained" size="small">Start Exam</Button>
          </td>
        </tr>
        <tr>
          <td className='table-data'>Science Exam</td>
          <td className='table-data'>
            <p className='status-completed' >Completed</p>
          </td>
          <td className='table-data'>
            <Button variant="outlined" size="small">View Results</Button>
          </td>
        </tr>
      </tbody>
    </table>
  </>
}