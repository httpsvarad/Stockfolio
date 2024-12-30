import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userpng from '../assets/user.png';
import useStore from '../store/useStore';

const Header = ({ handleSearch, setSearchQuery }) => {

    const { navigate } = useNavigate();

    const { logout } = useStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className='mr-3 ml-3 h-20 items-center flex'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className="text-xl font-semibold my-auto">📈</h1><span className='text-xl ml-2 font-semibold my-auto hidden md:block'>Stockfolio</span>
                </div>
                <div className="flex-none gap-3">
                    <form onSubmit={handleSearch}>
                        <div className="flex relative">
                            <input
                                onChange={(e) => setSearchQuery(e.target.value)}
                                type="text"
                                placeholder="Search Stock"
                                className="input rounded-full input-bordered w-44"
                            />
                            <button type="submit" className="btn btn-primary absolute right-0 rounded-full">
                                Go
                            </button>
                        </div>
                    </form>
                    <Link to="/portfolio" className='my-auto'>
                        <h3 className="my-auto btn bg-green-500 text-white hover:bg-green-600 rounded-full">
                            My Stocks
                        </h3>
                    </Link>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-14 rounded-full">
                                <img
                                    alt="Profile"
                                    src={userpng}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li onClick={() => {
                                handleLogout();
                            }}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
