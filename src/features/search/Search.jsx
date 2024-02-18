import React, { useEffect, useRef } from 'react'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchTextsAsync, selectSearchedProducts } from './searchSlice';
import { useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo1.png'
import search from '../../assets/search.png'
import mic from '../../assets/mic.png'
import listen from '../../assets/listen.gif'
import ProductCard1 from '../Product/components/ProductCard1';

export default function Search() {

  const dispatch = useDispatch()
  const SearchedProducts = useSelector(selectSearchedProducts);
  const inputRef = useRef()

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  console.log(SearchedProducts);

  const handleSearch = () => {
    console.log(inputRef.current.value);
    dispatch(fetchSearchTextsAsync(inputRef.current.value))
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
  }
  const handleListenStart = () => {
    SpeechRecognition.startListening({
      continuous: false,
      language: 'en-GB',
    });
  };

  useEffect(() => {
    inputRef.current.value = transcript;
    if (!listening) {
      dispatch(fetchSearchTextsAsync(inputRef.current.value))
    }
  }, [listening]);

  return (
    <div className='w-full min-h-[100vh]'>

      {/* NAVBAR FOR SEARCH */}
      <div className='w-full h-[70px] bg-teal-500 flex items-center gap-10 px-2 md:px-10'>

        <img className='w-10' src={logo1} alt="" srcSet="" />

        <div className='flex items-center gap-1 bg-white p-1 rounded-lg relative'>

          <input className='w-[50vw] outline-none rounded-lg' type="text" ref={inputRef} />
          <img onClick={handleSearch} className='w-6 p-1' src={search} alt="" srcSet="" />
          <img onClick={handleListenStart} className='w-6 p-1' src={mic} alt="" srcSet="" />

        </div>

      </div>




      {/* SEARCHED PRODUCTS */}
      {SearchedProducts && SearchedProducts.length > 0
        ?
        <div className='w-full flex items-start justify-center flex-wrap gap-5 pt-5'>

          {SearchedProducts.map((product) => (<ProductCard1 key={product._id} product={product} />))}

        </div>
        :
        <div className='w-full h-[calc(100vh-70px)] flex items-center justify-center text-2xl'>No Result {transcript}</div>}





      {/* DIV SHOWS WHILE LISTENING */}
      {listening && <div className='fixed top-[0vh] left-0 w-full h-[20vh] bg-teal-700 p-2 flex items-center justify-center gap-5'>
        <div className='flex flex-col'>
          <p>Listening : {listening ? "ON" : "OFF"}</p>
          <p>Text : {transcript}</p>
        </div>
        <img className='w-20' src={listen} alt="" srcSet="" />
      </div>}

    </div>
  )
}
