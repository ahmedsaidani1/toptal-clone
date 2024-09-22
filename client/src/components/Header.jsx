import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { logout } from "../redux/user/userSlice";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector((state) => state.theme);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    toast.warning("You just logged out!");

    // Reload the landing page
    setTimeout(() => {
      window.location.reload();
    }, 6000); // Delay to allow the toast to be seen
  };

  return (
    <>
      <Navbar className="fixed top-0 w-full bg-white dark:bg-gray-800 z-50 flex justify-between items-center border-b-2 px-4 py-2">
        <div onClick={scrollToTop} className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center cursor-pointer">
          <Link to='/'>
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Brain
            </span>
            Supply
          </Link>
        </div>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
          {currentUser ? (
            <Dropdown 
              arrowIcon={false} 
              inline 
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <Link to="/sign-up">
                <Button gradientDuoTone="purpleToBlue">
                  Sign Up
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Log In
                </Button>
              </Link>
            </>
          )}
          <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
          <Navbar.Link as={'div'}>
            <ScrollLink to="home" smooth={true} duration={500} offset={0}>Home</ScrollLink>
          </Navbar.Link>
          <Navbar.Link as={'div'}>
            <ScrollLink to ="courses" smooth={true} duration={500} offset={0}>Courses</ScrollLink>
          </Navbar.Link>
          <Navbar.Link as={'div'}>
            <ScrollLink to="achievement" smooth={true} duration={1000} offset={0}>Features</ScrollLink>
          </Navbar.Link>
          <Navbar.Link as={'div'}>
            <ScrollLink to="categories" smooth={true} duration={1000} offset={0}>Categories</ScrollLink>
          </Navbar.Link>
          <Navbar.Link as={'div'}>
            <ScrollLink to="feedback" smooth={true} duration={1000} offset={0}>Feedback</ScrollLink>
          </Navbar.Link>
          <Navbar.Link as={'div'}>
            <ScrollLink to="cta" smooth={true} duration={1000} offset={0}>CTA</ScrollLink>
          </Navbar.Link>
          <Navbar.Link as={'div'}>
            <ScrollLink to="price" smooth={true} duration={1000} offset={0}>Pricing</ScrollLink>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <ToastContainer />
    </>
  );
}
