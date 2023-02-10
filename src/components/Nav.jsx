import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { Home } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function Nav() {
    const { loggedUser } = useContext(UserContext);
    return (
        <nav>
            <Link to='/' className="home"><IconButton aria-label="home"><Home /></IconButton></Link>
            <Link to='/reviews' className='nav-links'>All Reviews</Link>
            <Link to='/reviews?category=deck-building' className='nav-links'>Deck Building</Link>
            <Link to='/reviews?category=dexterity' className='nav-links'>Dexterity</Link>
            <Link to='/reviews?category=engine-building' className='nav-links'>Engine Building</Link>
            <Link to='/reviews?category=hidden-roles' className='nav-links'>Hidden Roles</Link>
            <Link to='/reviews?category=push-your-luck' className='nav-links'>Push Your Luck</Link>
            <Link to='/reviews?category=roll-and-write' className='nav-links'>Roll and Write</Link>
            <Link to='/reviews?category=strategy' className='nav-links'>Strategy</Link>
            <Link to='login' className='nav-links'>Login</Link>
            <div className="user-profile">
            <img src={loggedUser?.avatar_url} alt={loggedUser?.username} height="30px" />
            <p><strong>{loggedUser?.username}</strong></p>
            </div>
        </nav>
    )
}