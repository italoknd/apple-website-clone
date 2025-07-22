import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Highlights from "./components/Highlights.jsx";

function App() {
  return (
    <main className="bg-black">
      <Navbar></Navbar>
      <Hero></Hero>
      <Highlights></Highlights>
    </main>
  );
}

export default App;
