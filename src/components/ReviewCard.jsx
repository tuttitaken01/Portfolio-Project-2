import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import VoteUpDown from './Votes';

export default function SingleRev() {
    const [ review, setReview ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const { reviewId } = useParams();

    useEffect(() => {
        const fetchReview = async () => {
            setLoading(true);
            try {
                const revRes = await axios.get(`https://gameview.onrender.com/api/reviews/${reviewId}`);
                let rev = revRes.data.review;
                rev.created_at = (new Date(rev.created_at)).toUTCString();
                setReview(rev);
            } finally {
                setLoading(false);
            }
        }
        fetchReview();
    }, [reviewId]);


    return (
        <div>
            {loading && <div className="loading">Loading...⏳</div>}
            <h1>{review.title}</h1>
            <h5>{review.category}</h5>
            <h5>{review.created_at}</h5>
            <img src={review.review_img_url} alt="game" width="600px"/>
            <p>{review.review_body}</p>
            <VoteUpDown /> 
            <Comments />            
        </div>
        
    )
}