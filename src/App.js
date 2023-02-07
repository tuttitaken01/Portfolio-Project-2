import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Reviews from './components/Reviews';
import SingleRev from './components/ReviewCard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route path="/reviews" element={<Reviews />}></Route>
          <Route path="/reviews/:reviewId" element={<SingleRev />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;