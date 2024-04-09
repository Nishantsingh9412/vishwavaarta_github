import { Button } from '@chakra-ui/react';
import {Routes,Route} from 'react-router-dom';  

import './App.css';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import Landing from './components/Landing/Landing';
import NewSignup from './components/Authentication/NewSignup';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<HomePage />} exact   />
        <Route path='/landing' element={<Landing />}   />
        <Route path='/chats' element={<ChatPage />}  />
        {/* <Route path='/newSignup' element={<NewSignup />}  /> */}

      </Routes>
      {/* <Button colorScheme='blue'>Button</Button> */}
      {/* <h2> Hello </h2> */}
    </div>
  );
}

export default App;
