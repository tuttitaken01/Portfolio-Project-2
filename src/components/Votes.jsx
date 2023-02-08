import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ThumbDown, ThumbUp } from '@mui/icons-material';


export default function VoteUpDown() {
    const [ votes, setVotes ] = useState(0);
    const [ err, setErr ] = useState(null);
    const { reviewId } = useParams();

    useEffect(() => {
        axios.get(`https://gameview.onrender.com/api/reviews/${reviewId}`)
        .then(({data: {review}}) => {
            setVotes(review.votes);
        })        
    }, [reviewId]);

    const handleInc = () => {
        setVotes((currentCount) => currentCount + 1);
        axios.patch(`https://gameview.onrender.com/api/reviews/${reviewId}`, {
            inc_votes : 1
        })
        .catch(err => {
            console.log(err);
            setErr('something went wrong')
        })
    }
    const handleDec = () => {
        setVotes((currentCount) => currentCount - 1);
        axios.patch(`https://gameview.onrender.com/api/reviews/${reviewId}`, {
            inc_votes : -1 
        })
        .catch(err => {
            console.log(err)
            setErr('something went wrong')
        })
    }

    return (
        <section>
            {err ? <p style={{ color: 'red' }}>{err}</p> : null}
            <p><IconButton aria-label='up' onClick={() => handleInc()}>
                <ThumbUp fontSize='small' color='success'/>
                </IconButton>{votes}<IconButton aria-label="down" onClick={() => handleDec()}>
                <ThumbDown fontSize='small' color='error' />
                </IconButton>
            </p> 
        </section>
    )
}