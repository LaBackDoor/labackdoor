import { Route, Routes } from 'react-router-dom';

import { CONTACT_PAGE, HOME_PAGE } from './resources/paths';
import { LayoutProvider } from './contexts/LayoutContext';
import { Contact } from './pages/Contact';
// import { AboutOverlay } from './pages/About';
import { Home } from './pages/Home';
import Layout from './layouts';


function App() {

  return (
    <LayoutProvider>
      <Layout>
        <Routes>
          <Route path={HOME_PAGE} element={<Home />} />
          {/* <Route path={ABOUT_OVERLAY} element={<AboutOverlay />} /> */}
          <Route path={CONTACT_PAGE} element={<Contact />} />
        </Routes>
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
