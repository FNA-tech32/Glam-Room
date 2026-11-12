import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../Context/AuthContext.jsx'

function Header({ bgImage = "bg-transparent" }) {
    const navigate = useNavigate()

    const { currentUser, isAuthenticated, logout } = useAuth()

    // Step 1: Create state to track if mobile menu is open or closed
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    // Step 2: Function to toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    // Step 3: Function to close mobile menu when a link is clicked
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    // Step 4: Handle scroll to change background
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const headerBg = scrollY > 50 ? 'bg-obsidian/95' : bgImage

    // role helpers derived from accountRole to distinguish clients/staff/admin
    const isAdmin = currentUser?.accountRole === 'admin';
    const isStaff = currentUser?.accountRole === 'staff';
    const isClient = isAuthenticated && !isAdmin && !isStaff;

    // Simple function to navigate to section
    const goToSection = (sectionId) => {
        navigate('/')
        setTimeout(() => {
            const section = document.getElementById(sectionId)
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
            }
        }, 200)
    }

    return (
        <header className={`fixed top-0 left-0 w-full z-50 text-white pb-2 transition-colors duration-300 ${headerBg}`}>
            <nav>
                <div className="flex flex-wrap justify-between items-center py-5.5 pl-6 pr-6 md:pr-13 md:pl-22 relative mt-0.5">
                    <div className="logo">
                        <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-[0.2em] uppercase text-white group-hover:text-champagne transition-colors duration-300">
                                    GLAM<span className="text-champagne font-light tracking-[0.25em] ml-1.5">ROOM</span>
                                </span>
                                <span className="text-[9px] uppercase tracking-[0.35em] text-champagne-muted font-sans font-medium -mt-1 group-hover:text-champagne-light transition-colors duration-300">
                                    Luxury Grooming
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Enhanced Hamburger Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-white focus:outline-none z-50 relative p-2 hover:bg-gray-950 rounded-lg transition-all duration-300"
                        aria-label="Toggle mobile menu"
                    >
                        {/* Animated Hamburger Icon */}
                        <div className="w-7 h-6 flex flex-col justify-between">
                            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                        </div>
                    </button>

                    {/* Desktop Navigation - Hidden on mobile  */}
                    <div className="pages hidden md:flex items-center justify-between mt-4 gap-9">
                        <ul className='flex gap-10 font-semibold text-sm uppercase w-full tracking-widest'>
                            <li>
                                <Link
                                    to="/"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        goToSection('main-hero')
                                    }}
                                    className='text-white hover:text-champagne transition-colors'
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        goToSection('services')
                                    }}
                                    className='text-white hover:text-champagne transition-colors'
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        goToSection('about')
                                    }}
                                    className='text-white hover:text-champagne transition-colors'
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        isActive ? 'text-champagne font-bold' : 'text-white hover:text-champagne transition-colors'
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                        {/* Actions section */}
                        <div className="flex items-center gap-6">
                            {/* Book Appointment Button */}
                            <a
                                href="#services"
                                onClick={(e) => {
                                    e.preventDefault()
                                    goToSection('appointment')
                                }}
                                className="hidden lg:flex bg-champagne text-white px-6 py-2 font-bold uppercase tracking-widest text-xs whitespace-nowrap hover:bg-obsidian hover:border hover:border-champagne transition-colors duration-300 overflow-hidden group"
                            >
                                BOOK APPOINTMENT
                            </a>

                            {/* account section */}
                            <div className="account relative">
                                {isAuthenticated ? (
                                    <div className="relative">
                                        {/* User Icon Button */}
                                        <button
                                            className={`flex items-center gap-2 text-white ${isDropdownOpen ? 'text-champagne' : ''} hover:text-champagne transition-colors group cursor-pointer`}
                                            onMouseEnter={() => setIsDropdownOpen(true)}
                                            onMouseLeave={() => setIsDropdownOpen(true)}
                                        >
                                            <svg className="nav-icon w-5 h-5" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.5 0C2.912 0 0 2.912 0 6.5C0 10.088 2.912 13 6.5 13C10.088 13 13 10.088 13 6.5C13 2.912 10.088 0 6.5 0ZM3.4775 10.725C4.329 10.114 5.369 9.75 6.5 9.75C7.631 9.75 8.671 10.114 9.5225 10.725C8.671 11.336 7.631 11.7 6.5 11.7C5.369 11.7 4.329 11.336 3.4775 10.725ZM10.491 9.828C9.3925 8.97 8.008 8.45 6.5 8.45C4.992 8.45 3.6075 8.97 2.509 9.828C1.755 8.9245 1.3 7.7675 1.3 6.5C1.3 3.627 3.627 1.3 6.5 1.3C9.373 1.3 11.7 3.627 11.7 6.5C11.7 7.7675 11.245 8.9245 10.491 9.828Z" fill="currentColor"></path>
                                                <path d="M6.49961 2.59998C5.24511 2.59998 4.22461 3.62048 4.22461 4.87498C4.22461 6.12948 5.24511 7.14998 6.49961 7.14998C7.75411 7.14998 8.77461 6.12948 8.77461 4.87498C8.77461 3.62048 7.75411 2.59998 6.49961 2.59998ZM6.49961 5.84998C5.96011 5.84998 5.52461 5.41448 5.52461 4.87498C5.52461 4.33548 5.96011 3.89998 6.49961 3.89998C7.03911 3.89998 7.47461 4.33548 7.47461 4.87498C7.47461 5.41448 7.03911 5.84998 6.49961 5.84998Z" fill="currentColor"></path>
                                            </svg>
                                            {/* <span className="text-sm font-medium">{currentUser?.name || 'User'}</span> */}
                                            <i className="fas fa-chevron-down text-xs transition-transform group-hover:rotate-180"></i>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isDropdownOpen && (
                                            <div
                                                className="absolute right-0 top-full mt-6 w-64 bg-obsidian/70 border border-gray-800/80 shadow-2xl rounded-lg z-50 py-2"
                                                onMouseEnter={() => setIsDropdownOpen(true)}
                                                onMouseLeave={() => setIsDropdownOpen(false)}
                                            >
                                                {/* User Info Section */}
                                                <div className="px-4 py-3 border-b border-gray-700">
                                                    <p className="text-champagne font-semibold text-sm uppercase tracking-wide">My Account</p>
                                                    <p className="text-white text-lg font-medium mt-1">{currentUser?.name || 'User'}</p>
                                                    <p className="text-gray-400 text-sm">{currentUser?.email || 'user@example.com'}</p>
                                                </div>

                                                {/* Navigation Section */}
                                                <div className="py-2">
                                                    {isAdmin && (
                                                        // Admin Links
                                                        <Link
                                                            to="/admin/dashboard"
                                                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/3 transition-colors"
                                                        >
                                                            <i className="fas fa-tachometer-alt w-5"></i>
                                                            <span>Admin Dashboard</span>
                                                        </Link>
                                                    )}
                                                    {isStaff && (
                                                        // Staff Links
                                                        <>
                                                            <Link
                                                                to="/staff/dashboard"
                                                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/3 transition-colors"
                                                            >
                                                                <i className="fas fa-tachometer-alt w-5"></i>
                                                                <span>Staff Dashboard</span>
                                                            </Link>
                                                            <Link
                                                                to="/staff/appointments"
                                                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/3 transition-colors"
                                                            >
                                                                <i className="fas fa-calendar-alt w-5"></i>
                                                                <span>My Appointments</span>
                                                            </Link>
                                                            <Link
                                                                to="/staff/profile"
                                                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/3 transition-colors"
                                                            >
                                                                <i className="fas fa-user w-5"></i>
                                                                <span>My Profile</span>
                                                            </Link>
                                                        </>
                                                    )}
                                                    {isClient && (
                                                        // Client/User Links
                                                        <>
                                                            <Link
                                                                to="/account"
                                                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/3 transition-colors"
                                                            >
                                                                <i className="fas fa-user w-5"></i>
                                                                <span>My Profile</span>
                                                            </Link>
                                                            <Link
                                                                to="/account?tab=appointments"
                                                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/3 transition-colors"
                                                            >
                                                                <i className="fas fa-calendar-alt w-5"></i>
                                                                <span>My Appointments</span>
                                                            </Link>
                                                            <a
                                                                href="#services"
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    goToSection('appointment')
                                                                }}
                                                                className='flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/3 transition-colors'
                                                            >
                                                                <i className="fas fa-plus-circle w-5"></i>
                                                                <span>Book Appointment</span>
                                                            </a>
                                                        </>
                                                    )}
                                                    <div className="border-t border-gray-700 mt-2 pt-2">
                                                        <button
                                                            onClick={logout}
                                                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-900/3 transition-colors w-full text-left cursor-pointer"
                                                        >
                                                            <i className="fas fa-sign-out-alt w-5"></i>
                                                            <span>Logout</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link to="/login" className="flex items-center gap-2 border-b border-champagne/80 px-5 py-2 text-white hover:text-champagne hover:border-champagne transition-all duration-300 group">
                                        <i className="fas fa-user text-sm group-hover:text-champagne transition-colors text-champagne"></i>
                                        <span className="text-xs font-bold tracking-widest uppercase">Login</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Mobile Navigation Menu - Premium Salon Design */}
                    <div className={`
                        md:hidden fixed top-0 right-0 h-full w-80 bg-obsidian-card z-40
                        transform transition-transform duration-500 ease-in-out shadow-2xl
                        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    `}>
                        {/* Decorative gold bar at top */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-champagne-dark via-champagne-light to-champagne-dark"></div>

                        {/* Mobile menu content */}
                        <div className="h-full flex flex-col pt-20 px-8 pb-8 overflow-y-auto">
                            {/* Salon Branding */}
                            <div className="mb-10 text-center border-b border-gray-700 pb-6">
                                <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-1 font-serif">
                                    Glam <span className="text-champagne">Room</span>
                                </h2>
                                <p className="text-champagne text-xs uppercase tracking-[0.3em]">Luxury Salon & Grooming</p>
                            </div>

                            {/* Navigation Links with Premium Styling */}
                            <nav className="flex-1">
                                <ul className='flex flex-col gap-4 font-medium text-lg'>
                                    <li>
                                        <a
                                            href="#home"
                                            onClick={closeMobileMenu}
                                            className='block py-4 px-4 uppercase tracking-wide border-l-4 transition-all duration-300 text-gray-300 border-transparent hover:text-champagne hover:border-champagne hover:bg-gray-900/30 hover:translate-x-2'
                                        >
                                            <span className="flex items-center gap-3">
                                                <i className="fas fa-home w-5"></i>
                                                Home
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#services"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                goToSection('services')
                                                closeMobileMenu()
                                            }}
                                            className='block py-4 px-4 uppercase tracking-wide border-l-4 transition-all duration-300 text-gray-300 border-transparent hover:text-champagne hover:border-champagne hover:bg-gray-900/30 hover:translate-x-2'
                                        >
                                            <span className="flex items-center gap-3">
                                                <i className="fas fa-cut w-5"></i>
                                                Services
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#about"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                goToSection('about')
                                                closeMobileMenu()
                                            }}
                                            className='block py-4 px-4 uppercase tracking-wide border-l-4 transition-all duration-300 text-gray-300 border-transparent hover:text-champagne hover:border-champagne hover:bg-gray-900/30 hover:translate-x-2'
                                        >
                                            <span className="flex items-center gap-3">
                                                <i className="fas fa-info-circle w-5"></i>
                                                About
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#services"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                goToSection('appointment')
                                                closeMobileMenu()
                                            }}
                                            className='block py-4 px-4 uppercase tracking-wide border-l-4 transition-all duration-300 text-gray-300 border-transparent hover:text-champagne hover:border-champagne hover:bg-gray-900/30 hover:translate-x-2'
                                        >
                                            <span className="flex items-center gap-3">
                                                <i className="fas fa-plus-circle w-5"></i>
                                                Book Appointment
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            {/* Account Section - Premium Card Style */}
                            <div className="mt-8">
                                <div className="bg-black rounded-lg p-4 border border-gray-900 shadow-lg">
                                    {isAuthenticated ? (
                                        <div>
                                            {/* User Info Section */}
                                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-700">
                                                <div className="flex-1">
                                                    <p className="text-champagne font-semibold text-sm uppercase tracking-wide">My Account</p>
                                                    <p className="text-white text-lg font-medium">{currentUser?.name || 'User'}</p>
                                                    <p className="text-gray-400 text-sm">{currentUser?.email || 'user@example.com'}</p>
                                                </div>
                                            </div>

                                            {/* Navigation Links */}
                                            <div className="space-y-2">
                                                {isAdmin && (
                                                    <Link
                                                        to="/admin/dashboard"
                                                        onClick={closeMobileMenu}
                                                        className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/30 transition-colors rounded-lg"
                                                    >
                                                        <i className="fas fa-tachometer-alt w-5"></i>
                                                        <span>Admin Dashboard</span>
                                                    </Link>
                                                )}
                                                {isStaff && (
                                                    <>
                                                        <Link
                                                            to="/staff/dashboard"
                                                            onClick={closeMobileMenu}
                                                            className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/30 transition-colors rounded-lg"
                                                        >
                                                            <i className="fas fa-tachometer-alt w-5"></i>
                                                            <span>Staff Dashboard</span>
                                                        </Link>
                                                        <Link
                                                            to="/staff/appointments"
                                                            onClick={closeMobileMenu}
                                                            className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/30 transition-colors rounded-lg"
                                                        >
                                                            <i className="fas fa-calendar-alt w-5"></i>
                                                            <span>My Appointments</span>
                                                        </Link>
                                                        <Link
                                                            to="/staff/profile"
                                                            onClick={closeMobileMenu}
                                                            className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/30 transition-colors rounded-lg"
                                                        >
                                                            <i className="fas fa-user w-5"></i>
                                                            <span>My Profile</span>
                                                        </Link>
                                                    </>
                                                )}
                                                {isClient && (
                                                    <>
                                                        <Link
                                                            to="/account"
                                                            onClick={closeMobileMenu}
                                                            className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/30 transition-colors rounded-lg"
                                                        >
                                                            <i className="fas fa-user w-5"></i>
                                                            <span>My Profile</span>
                                                        </Link>
                                                        <Link
                                                            to="/account?tab=appointments"
                                                            onClick={closeMobileMenu}
                                                            className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-champagne hover:bg-gray-900/30 transition-colors rounded-lg"
                                                        >
                                                            <i className="fas fa-calendar-alt w-5"></i>
                                                            <span>My Appointments</span>
                                                        </Link>
                                                    </>
                                                )}
                                                <div className="border-t border-gray-700 pt-2 mt-2">
                                                    <button
                                                        onClick={() => {
                                                            logout()
                                                            closeMobileMenu()
                                                        }}
                                                        className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-900/30 transition-colors rounded-lg w-full text-left"
                                                    >
                                                        <i className="fas fa-sign-out-alt w-5"></i>
                                                        <span>Logout</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/login"
                                            onClick={closeMobileMenu}
                                            className="group block"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-champagne to-champagne-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <svg className="nav-icon" width="20" height="20" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.5 0C2.912 0 0 2.912 0 6.5C0 10.088 2.912 13 6.5 13C10.088 13 13 10.088 13 6.5C13 2.912 10.088 0 6.5 0ZM3.4775 10.725C4.329 10.114 5.369 9.75 6.5 9.75C7.631 9.75 8.671 10.114 9.5225 10.725C8.671 11.336 7.631 11.7 6.5 11.7C5.369 11.7 4.329 11.336 3.4775 10.725ZM10.491 9.828C9.3925 8.97 8.008 8.45 6.5 8.45C4.992 8.45 3.6075 8.97 2.509 9.828C1.755 8.9245 1.3 7.7675 1.3 6.5C1.3 3.627 3.627 1.3 6.5 1.3C9.373 1.3 11.7 3.627 11.7 6.5C11.7 7.7675 11.245 8.9245 10.491 9.828Z" fill="black"></path>
                                                        <path d="M6.49961 2.59998C5.24511 2.59998 4.22461 3.62048 4.22461 4.87498C4.22461 6.12948 5.24511 7.14998 6.49961 7.14998C7.75411 7.14998 8.77461 6.12948 8.77461 4.87498C8.77461 3.62048 7.75411 2.59998 6.49961 2.59998ZM6.49961 5.84998C5.96011 5.84998 5.52461 5.41448 5.52461 4.87498C5.52461 4.33548 5.96011 3.89998 6.49961 3.89998C7.03911 3.89998 7.47461 4.33548 7.47461 4.87498C7.47461 5.41448 7.03911 5.84998 6.49961 5.84998Z" fill="black"></path>
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-semibold text-sm uppercase tracking-wide group-hover:text-champagne transition-colors">My Account</p>
                                                    <p className="text-gray-400 text-xs">Login / Register</p>
                                                </div>
                                                <i className="fas fa-chevron-right text-champagne-muted group-hover:text-champagne group-hover:translate-x-1 transition-all"></i>
                                            </div>
                                        </Link>
                                    )}
                                </div>

                                {/* Contact Info */}
                                <div className="mt-4 pt-4 border-t border-gray-800 text-center">
                                    <p className="text-gray-400 text-xs mb-1 tracking-wider uppercase">Book Appointment</p>
                                    <a href="tel:+923001234567" className="text-champagne font-semibold hover:text-champagne-light transition-colors block text-sm">
                                        +92 300 1234567
                                    </a>
                                    <a href="tel:+923217654321" className="text-champagne-muted text-xs hover:text-champagne transition-colors block mt-0.5">
                                        Alt: +92 321 7654321
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Overlay with Blur Effect */}
                    {isMobileMenuOpen && (
                        <div
                            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30 animate-fadeIn"
                            onClick={closeMobileMenu}
                        ></div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header
