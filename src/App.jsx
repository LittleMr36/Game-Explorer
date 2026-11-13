// import router components
import { HashRouter, Routes, Route } from "react-router-dom";

// import shared components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import page components
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import GameDetails from "./pages/GameDetails";

// main app component
function App() {
  return (
    // set up page navigation
    <HashRouter>
      <div className="flex min-h-screen flex-col">

        {/* display the navigation bar */}
        <Navbar />

        {/* display the selected page */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </div>

        {/* display the footer */}
        <Footer />

      </div>
    </HashRouter>
  );
}

// export the app component
export default App;