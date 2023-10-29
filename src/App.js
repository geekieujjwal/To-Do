import "./App.css";
import Todo from "./Components/Todo";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <p className="greeting">Hello, darlinn</p>
      <Todo />
    </div>
  );
}

export default App;
