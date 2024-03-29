import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ThumbUp, Comment } from '@mui/icons-material';


export default function Reviews() {
    const [ reviews, setReviews ] = useState([]);
    const [ sortBy, setSortBy ] = useState('created_at');
    const [ order, setOrder ] = useState('DESC');
    const location = useLocation();
    const [ loading, setLoading ] = useState(false);


    useEffect(() => {
        const getReviews = async () => {
            setLoading(true);
            try {
                let url = 'https://gameview.onrender.com/api/reviews';
                const params = new URLSearchParams(location.search);
                const category = params.get('category');
                if(category) {
                    url += `?category=${category}&sortBy=${sortBy}&order=${order}`;
                } else {
                    url += `?sortBy=${sortBy}&order=${order}`;
                }
                const response = await axios.get(url);
                let reviews = response.data.reviews;
                reviews.map(review => (
                    Math.floor(parseInt(review.comment_count))
                ))
                setReviews(reviews);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getReviews();
    }, [location.search, sortBy, order]);

    return (
        <section>
            <p className='sortby'>Sort by:
            <div className="radio">
            <label>
                <input type="radio" name="sortBy" value="created_at" checked={sortBy === 'created_at'} onChange={e => setSortBy(e.target.value)} />date
            </label>
            <label>
                <input type="radio" name="sortBy" value="votes" checked={sortBy === 'votes'} onChange={e => setSortBy(e.target.value)} />votes
            </label>
            <label>
                <input type="radio" name="sortBy" value="comment_count" checked={sortBy === 'comment_count'} onChange={e => setSortBy(e.target.value)} />comment count
            </label>
            <label>
                <input type="radio" name="order" value="ASC" checked={order === 'ASC'} onChange={e => setOrder(e.target.value)} />UP
            </label>
            <label>
                <input type="radio" name="order" value="DESC" checked={order === 'DESC'} onChange={e => setOrder(e.target.value)} />DOWN
            </label>
                </div>
                </p>
                
            <div className="grid-container">
                {reviews.map((review) => {
                    return (
                        <div key={review.review_id} className="grid-item">
                            <Link key={review.review_id} to={`/reviews/${review.review_id}`}><h4>{review.title}</h4>
                            <img src={review.review_img_url} height='200px' alt={review.review_id} /> </Link>
                            <p>{review.votes}<IconButton aria-label='up'><ThumbUp fontSize='small' color='success' /></IconButton>  {review.comment_count}<IconButton aria-label='balloon'><Comment fontSize='small' color='primary' /></IconButton></p> 
                        </div>
                    )
                })}
            </div>
            {loading && <div className="loading">Loading...⏳</div>}
        </section>
    )
}