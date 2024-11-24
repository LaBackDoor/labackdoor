import { Route, Routes } from 'react-router-dom';

import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import Navbar from './components/Navbar';
import { About } from './pages/About';
import { Group } from './pages/Group';
import { Home } from './pages/Home';


function App() {

  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Group' element={<Group />} />
          <Route path='/Projects' element={<Projects />} />
        </Routes>

      </div>
    </>
  )
}

export default App;
