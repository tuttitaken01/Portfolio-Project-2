import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { Home } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function Nav() {
    const { loggedUser, setLoggedUser } = useContext(UserContext);
    return (
        <nav>
            <Link to='/'><IconButton aria-label="home"><Home /></IconButton></Link>
            <Link to='/reviews'>All Reviews</Link>
            <Link to='/reviews?category=deck-building'>Deck Building</Link>
            <Link to='/reviews?category=dexterity'>Dexterity</Link>
            <Link to='/reviews?category=engine-building'>Engine Building</Link>
            <Link to='/reviews?category=hidden-roles'>Hidden Roles</Link>
            <Link to='/reviews?category=push-your-luck'>Push Your Luck</Link>
            <Link to='/reviews?category=roll-and-write'>Roll and Write</Link>
            <Link to='/reviews?category=strategy'>Strategy</Link>
            <Link to='login'>Login</Link>
            <div className="user-profile">
            <p><strong>{loggedUser?.username}</strong></p>
            <img src={loggedUser?.avatar_url} alt={loggedUser?.username} height="30px" />
            </div>
        </nav>
    )
}