import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/reviews'>All Reviews</Link>
            <Link to='/reviews?category=deck-building'>Deck Building</Link>
            <Link to='/reviews?category=dexterity'>Dexterity</Link>
            <Link to='/reviews?category=engine-building'>Engine Building</Link>
            <Link to='/reviews?category=hidden-roles'>Hidden Roles</Link>
            <Link to='/reviews?category=push-your-luck'>Push Your Luck</Link>
            <Link to='/reviews?category=roll-and-write'>Roll and Write</Link>
            <Link to='/reviews?category=strategy'>Strategy</Link>
        </nav>
    )
}