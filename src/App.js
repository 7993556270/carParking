import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home.js';
import ParkkAllocations from './pages/parkAllocations.js';

function App() {
  return (
    <BrowserRouter data-testid='BrowserRouter'>
      <Routes data-testid='Routing'>
        <Route data-testid='Home' path='/' element={ <Home/>}/>
        <Route data-testid='Allocation' path='/allocate' element={ <ParkkAllocations/>}/>
        {/* <Route path="/parked" element={<ParkedFetails/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
