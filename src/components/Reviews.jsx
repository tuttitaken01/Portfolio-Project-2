import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ThumbDown, ThumbUp } from '@mui/icons-material';


export default function Reviews() {
    const [ reviews, setReviews ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ selCat, setSelCat ] = useState ('All')

    useEffect(() => {
        const getAllRev = async () => {
            setLoading(true);
            try {
                const [ allRev, allCat ] = await Promise.all([
                    axios.get('https://gameview.onrender.com/api/reviews'),
                    axios.get('https://gameview.onrender.com/api/categories'),
                ]);
                let revs = allRev.data.reviews;
                let cats = allCat.data.categories.map(category => category.slug);
                setReviews(revs);
                setCategories(['All', ...cats]);
            } finally {
                setLoading(false);
            }
        }
        getAllRev();
    }, []);

        /*axios.get('https://gameview.onrender.com/api/reviews')
        .then(({data: {reviews}}) => {
            setReviews(reviews)
        });
    }, []);

    useEffect(() => {
        axios.get('https://gameview.onrender.com/api/categories')
        .then(res => {
            let getCats = res.data.categories.map(category => category.slug)
            setCategories(['All', ...getCats]);
        });
    }, []); */

    const filteredReviews = selCat === 'All' ? reviews : reviews.filter( review => review.category === selCat);

    return (
        <section>
            {loading && <div className="loading">Loading...⏳</div>}
            <select value={selCat} onChange={e => setSelCat(e.target.value)}>
                {categories.map(category => (
                    <option value={category}>{category}</option>
                ))}
            </select>

            <div className="grid-container">
                {filteredReviews.map((review) => {
                    return (
                        <div key={review.review_id} className="grid-item">
                            <Link key={review.review_id} to={`/reviews/${review.review_id}`}><h4>{review.title}</h4>
                            <img src={review.review_img_url} height='200px' alt={review.review_id} /> </Link>
                            <p><IconButton aria-label='up'><ThumbUp fontSize='small' color='success' /></IconButton>{review.votes}<IconButton aria-label="down"><ThumbDown fontSize='small' color='error' /></IconButton></p> 
                            <p><Link key={review.review_id} to={`/reviews/${review.review_id}/comments`}>Comments count: {review.comment_count}</Link></p>

                        </div>
                    )
                })}
            </div>
        </section>
    )
}