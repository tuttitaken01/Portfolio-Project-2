import axios from 'axios';
import { useState } from 'react';
import { UNSPLASH_API_URL, UNSPLASH_API_KEY } from './api';

export default function ErrorPage() {
    /*const [ img, setImg ] = useState([]);
    
    let randNum = Math.floor(Math.random() * 10);

    axios.get(`${UNSPLASH_API_URL}topic=nature&page=${randNum}&orientation=landscape&client_id=${UNSPLASH_API_KEY}`)
    .then(res => res.json())
    .then(
        data => {
            console.log(data.results[randNum].urls.small)
            setImg(data.results[randNum].urls.small)
        }
    )
    setImg('')*/

    return (
        <section className="Error">
            <h1 className="err-msg">Uh-oh.. Looks like the page you're looking for doesn't exist.</h1>
            <h3 className="err-msg2">But here's a nice picture for you :)</h3>
            <img src="https://api.lorem.space/image/burger?w=600&h=400" alt="pizza" />
        </section>
    )
}