// import { Route, Routes } from 'react-router-dom';

import { LayoutProvider } from './contexts/LayoutContext';
// import LayoutSwitcher from './components/LayoutSwitcher';
import { Home } from './pages/Home';
import Layout from './layouts';


function App() {

  return (
    <LayoutProvider>
      <Layout>
        <Home />
      </Layout>
    </LayoutProvider>
  )
}

export default App;




// PLEASE DO NOT REMOVE ANY OF THESE. THEY'RE BEING SAVED FOR LATER <3
{/*<Routes>
  <Route path='/' element={<Home />} />
</Routes> */}


{/*
  <Route path='/About' element={<About />} />
  <Route path='/Contact' element={<Contact />} />
  <Route path='/Group' element={<Group />} />
  <Route path='/Projects' element={<Projects />} />
*/}


{/*
  <LayoutProvider>
      <Layout>
        <LayoutSwitcher />
        <h1 className="p-4">Welcome to the Dynamic Layout App</h1>
      </Layout>
    </LayoutProvider>
  */}
