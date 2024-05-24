import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Components/Home";
import { CountryDetails } from "./Components/CountryDetails";

function App() {
  return (
    <div className="App" data-testid="app-component-test-id">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:name" element={<CountryDetails />} />
          <Route path="*" element={<p>404 Page Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
