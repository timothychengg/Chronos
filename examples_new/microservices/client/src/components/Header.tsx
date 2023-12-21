import { Link, useLocation } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import { useAppContext } from '../context/appContext';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  const { logoutUser } = useAppContext();

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-2">
      <Link
        to="/"
        className={`rounded-full p-2 text-2xl border-2
        ${pathname === '/' ? 'border-light' : 'bg-light text-dark shadow-insetLight border-dark'}`}
      >
        <AiFillHome />
      </Link>
      <div>
        <div
          className={`text-2xl rounded-sm ${
            showMenu ? 'bg-light text-dark border-2 border-light' : ''
          }`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <FiMenu />
        </div>
        {showMenu && (
          <div
            className="bg-white/40 rounded-md p-6 absolute top-14 right-4
            flex flex-col justify-center items-center text-center min-w-[150px]"
          >
            {pathname !== '/my-store' ? (
              <Link
                className="w-full px-4 py-2 bg-blue-400 rounded-md"
                to="/my-store"
                onClick={() => setShowMenu(false)}
              >
                My Store
              </Link>
            ) : (
              <Link
                className="w-full px-4 py-2 bg-blue-400 rounded-md"
                to="/"
                onClick={() => setShowMenu(false)}
              >
                Home
              </Link>
            )}
            <button className="w-full px-4 py-2 bg-blue-400 rounded-md mt-4" onClick={logoutUser}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
