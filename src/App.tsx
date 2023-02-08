import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>toss payments</h1>
      <div>{process.env.REACT_APP_CLIENT_KEY}</div>
      <div>{process.env.REACT_APP_SECRET_KEY}</div>
    </div>
  );
}

export default App;
