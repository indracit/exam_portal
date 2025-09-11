import styled from "styled-components";
import Button from '@mui/material/Button';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #0e0005ff;
`;


function App() {
  
  return (
    <>
    <Title>Exam easy</Title>
    <Button variant="contained">Hello world</Button>;
    </>
  )
}

export default App
