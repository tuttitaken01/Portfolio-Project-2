import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Reviews from './components/Reviews';
import SingleRev from './components/ReviewCard';
import Login from './components/LogPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import ErrorPage from './components/ErrorPg';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:reviewId" element={<SingleRev />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;