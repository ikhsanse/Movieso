import React from 'react'
import WatchLater from '../components/MyShow/WatchLater';
import wallpaper from '../assets/wallpaper.jpg';
import { useSelector } from 'react-redux';
import { selectWatchLater } from '../reducers/acountSlice';


const MyShow = () => {  
    const watchLater = useSelector(selectWatchLater)
    // const watchLater = JSON.parse(localStorage.getItem('watchLater'))
    return (
      <div className='bg-black'>
        <div className='w-full text-white'>
          <img
            className='w-full h-[400px] object-cover'
            src={wallpaper}
            alt='/'
          />
          {/* <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div> */}
          <div className='absolute top-[20%] p-4 md:p-8'>
            <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
          </div>
        </div>
        {watchLater?.movies?.length === 0 && 
        <span className='text-white font-bold'>Tidak ada movie yang ditampilkan...</span>}
        <WatchLater movie={watchLater} />
      </div>
    );
}

export default MyShow