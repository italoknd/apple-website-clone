import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Highlights from "./components/Highlights.jsx";
import Model from "./components/Model.jsx";
import Features from "./components/Features.jsx";

function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
    </main>
  );
}

export default App;
