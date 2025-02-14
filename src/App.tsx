import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';

import { CONTACT_PAGE, HOME_PAGE, GROUP_PAGE, MRNS_PAGE } from './resources/paths';
import { LayoutProvider } from './contexts/LayoutContext';
import MRNsPage from './pages/projects/MRNsPage';
import { Contact } from './pages/Contact';
// import Projects from './pages/Projects';
import Group from './pages/Group';
import { Home } from './pages/Home';
import Layout from './layouts';


function App() {


  return (
    <>
      <LayoutProvider>
        <Layout>
          <Routes>
            <Route path={HOME_PAGE} element={<Home />} />
            <Route path={MRNS_PAGE} element={<MRNsPage />} />
            <Route path={GROUP_PAGE} element={<Group />} />
            {/* <Route path={PROJECTS_PAGE} element={<Projects />} /> */}
            <Route path={CONTACT_PAGE} element={<Contact />} />
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
