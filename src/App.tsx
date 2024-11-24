import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import Navbar from './components/Navbar';
import { About } from './pages/About';
import { Group } from './pages/Group';
import { Home } from './pages/Home';


function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break
    case "/About":
      component = <About />;
      break
    case "/Contact":
      component = <Contact />;
      break
    case "/Group":
      component = <Group />;
      break
    case "/Projects":
      component = <Projects />;
      break
    default:
      component = <div>404: Page Not Found</div>;
      break;
  }

  return (
    <>
      <Navbar />
      {component}
    </>
  )
}

export default App;
