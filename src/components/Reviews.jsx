import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';


export default function Reviews() {
    const [ reviews, setReviews ] = useState([]);
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
                    url += `?category=${category}`;
                }
                const response = await axios.get(url);
                setReviews(response.data.reviews);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getReviews();
    }, [location.search]);

    return (
        <section>
            <div className="grid-container">
                {reviews.map((review) => {
                    return (
                        <div key={review.review_id} className="grid-item">
                            <Link key={review.review_id} to={`/reviews/${review.review_id}`}><h4>{review.title}</h4>
                            <img src={review.review_img_url} height='200px' alt={review.review_id} /> </Link>
                            <p>{review.votes}<IconButton aria-label='up'><ThumbUp fontSize='small' color='success' /></IconButton></p> 
                        </div>
                    )
                })}
            </div>
            {loading && <div className="loading">Loading...⏳</div>}
        </section>
    )
}