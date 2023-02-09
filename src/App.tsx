import "./css/App.scss";
import Navbar from "./components/Navbar";
import MainRoutes from "./Routes";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainRoutes />
      <Footer />
    </div>
  );
}

export default App;
