import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';

import { CONTACT_PAGE, HOME_PAGE, MRNS_PAGE } from './resources/paths';
import { LayoutProvider } from './contexts/LayoutContext';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import MRNsPage from './pages/projects/MRNsPage';
import Layout from './layouts';


function App() {

  return (
    <>
      <LayoutProvider>
        <Layout>
          <Routes>
            <Route path={HOME_PAGE} element={<Home />} />
            {/* <Route path={ABOUT_OVERLAY} element={<AboutOverlay />} /> */}
            <Route path={CONTACT_PAGE} element={<Contact />} />
            <Route path={MRNS_PAGE} element={<MRNsPage />} />
          </Routes>
        </Layout>
      </LayoutProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
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
