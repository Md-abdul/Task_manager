import Footer from "./AllRoutes/Footer";
import { MainRoutes } from "./AllRoutes/MainRoutes";
import { Navbar } from "./AllRoutes/Navbar";
import "./App.css";
// import { Sidebar } from "./Sidebar/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      {/* <Sidebar/> */}
     <MainRoutes/>
     <Footer/>
    </>
  );
}

export default App;
