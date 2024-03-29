import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import './Header.css'; // Import your CSS file
import logo from '../../assets/logo.png';
import { useUserContext } from '../../context/UserContext';
import LoginButton from '../Login/Login'
import { GoogleLogout } from 'react-google-login'
import CartIcon from '../CartIcon/CartIcon';
// In your component

const clientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;
const Header = () => {
    const { isSignedIn, logout } = useUserContext();

    const onLogoutSuccess = async () => {
        await logout();
        // Handle logout logic here
    };

    useEffect(() => {
        console.log(clientId)
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: '',
            })
        }
        gapi.load('client:auth2', start)
    }, [clientId])


    return (
        <header className="header">

            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <nav className="nav-menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>

            <div id="signinbutton">
                {!isSignedIn ? (
                    <LoginButton />
                ) : (
                    <GoogleLogout
                        clientId="your-client-id"
                        buttonText="Logout"
                        onLogoutSuccess={onLogoutSuccess}
                    // style={{ backgroundColor: '#000', color: '#fff', border: 'none' }}
                    // You may need to style this button directly or through a custom class
                    />
                )}
            </div>
            <div>
                <CartIcon />
            </div>

        </header>
    );
};

export default Header;