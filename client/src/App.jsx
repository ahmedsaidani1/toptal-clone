import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Header from './components/Header';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import CompanyInfo from './pages/CompanyInfo';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './App.css'; 
import LinkedInCallback from './components/LinkedInCallback';
import HiringForm from './components/Hiring';
import FeedbackPage from './components/FeedbackPage';
import Talent from './pages/Talent';
import Form from './pages/Form';
import PrivateRoute from './components/PrivateRoute';
import Nav from './components/Nav';
import Schedule from './pages/Schedule';
import Appointment from './pages/Appointment';
import UserPage from './pages/UserPage';




const App = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/sign-in' || location.pathname === '/sign-up' || location.pathname === '/forgot-password' || location.pathname === '/company-info' || location.pathname === '/hiring-form' || location.pathname === '/talent' || location.pathname === '/feedback' || location.pathname === '/form'||location.pathname === '/schedule';
  const showNav = location.pathname !== '/';

  return (
    <>
      {!hideHeader && <Header />}
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/company-info" element={<CompanyInfo />} />
        <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hiring-form" element={<HiringForm />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/talent" element={<Talent />} />
        <Route path="/form" element={<Form />} />
        <Route path="/schedule" element={< Schedule/>} />
        
        <Route path="appointment" element={< Appointment/>} />
      </Routes>
     <Footer />
    </>
  );
};

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
