import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Highlights from "./components/Highlights.jsx";
import Model from "./components/Model.jsx";

function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
    </main>
  );
}

export default App;
