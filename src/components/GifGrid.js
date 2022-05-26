import React, { useEffect, useState } from 'react'
import { GifGridElement } from './GifGridElement';

export const GifGrid = ({category}) => {

    const [images, setImages] = useState([])

    useEffect( () => {
        getGifts();
    }, [])
    

    const getGifts = async () => {
        const url = `https://api.giphy.com/v1/gifs/search?q=${ encodeURI(category) }&limit=10&api_key=aYiXJbkJ6i3hcxnq7i8bH6lvqRTg8uex`
        const resp = await fetch(url);
        const {data} = await resp.json();
        
        const gifs = data.map(({id, title, images}) => {
            return {
                id: id,
                title: title,
                url: images?.downsized_medium.url
            }
        })

        setImages(gifs)
    }

  return (
    <div >

        <h3>{category}</h3>
        <div className='card-grid'>
            {
                images.map(img => (
                     <GifGridElement 
                        key={img.id}
                        {...img}
                     />
                ))
            }
        </div>
       
    </div>
  )
}
