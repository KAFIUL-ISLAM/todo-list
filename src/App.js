import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Register from './Components/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RequiredAuth from './Components/RequiredAuth';

function App() {
  return (
    <div >
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path='/' element={<RequiredAuth>
          <Homepage></Homepage>
        </RequiredAuth>}>
        </Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
     </Routes>
    </div>
  );
}

export default App;
