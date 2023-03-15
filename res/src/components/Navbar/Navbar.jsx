import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../app/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAdd, MdLogout, MdOutlineRestaurantMenu } from "react-icons/md";
import { motion } from "framer-motion";
import images from "../../constants/images";
import Avatar from "../../assets/avatar.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [isMenu, setIsMenu] = React.useState(false);
  const user = useSelector((state) => state.user.current);

  const logout = () => {
    dispatch(setCurrentUser(null));
    navigate("/LogIn");
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.gericht} alt="app__logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="p__opensans">
          <Link to={"/Menu"}>Menu</Link>
        </li>
        {user ? (
          <>
            {user.isAdmin === 1 ? (
              <li className="p__opensans">
                <Link to={"/Payment"}>Payment</Link>
              </li>
            ) : (
              <>
                <li className="p__opensans">
                  <Link to={"/Booking"}>Booking Table</Link>
                </li>
                <li className="p__opensans">
                  <Link to={"/Order"}>Order</Link>
                </li>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </ul>

      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li onClick={() => setToggleMenu(false)}>
                <Link to={"/"}>Home</Link>
              </li>
              <li onClick={() => setToggleMenu(false)}>
                <Link to={"/Menu"}>Menu</Link>
              </li>
              {user?.isAdmin === 1 ? (
                <li className="p__opensans">
                  <Link to={"/Booking"}>Payment</Link>
                </li>
              ) : (
                <>
                  {user ? (
                    <>
                      <li className="p__opensans">
                        <Link to={"/Booking"}>Booking Table</Link>
                      </li>
                      <li className="p__opensans">
                        <Link to={"/Order"}>Order</Link>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {user ? (
        <>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user?.photoURL ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={() => setIsMenu(!isMenu)}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.isAdmin === 1 && (
                  <>
                    <Link to={"/AddFood"}>
                      <p
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={() => setIsMenu(false)}
                      >
                        New Item <MdAdd />
                      </p>
                    </Link>
                  </>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </>
      ) : (
        <p
          className="p__opensans px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
          onClick={() => navigate("/LogIn")}
        >
          LogIn
        </p>
      )}
    </nav>
  );
};

export default Navbar;
