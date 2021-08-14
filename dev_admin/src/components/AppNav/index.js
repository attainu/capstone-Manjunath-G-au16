import  { Link } from 'react-router-dom';

const AppNav = () => {
    return(
        <>
        <header>
            <Link className='homebutton' to="/">Home</Link>
            <Link className='homebutton' to="/signup">Sign Up</Link>
            <Link className='homebutton' to="/login">Login</Link>
        </header>
        </>
    );
};

export default AppNav;
