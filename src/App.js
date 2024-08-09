import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import './App.css';
import Order from './components/Order';

const App = () => {

  const [loaded, setLoaded] = useState(false);
  const [child, setChild] = useState(<h3>App is loading</h3>)
  const [showInfo, setShowInfo] = useState("");

  const infoRef = useRef();

  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = '{{{appclient}}}';
    script.addEventListener('load', () => setLoaded(true));
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  const handleOnShowInfo = (msg) => {
    try {
      console.log({msg})
      setShowInfo(msg)
    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    if (!loaded) return
    app.initialized().then((client) => {
      setChild((<Order client={client} handleOnShowInfo = {handleOnShowInfo} />))
    })
  }, [loaded])

  return (
    <div className='app-main-layer'>
      {child}
      {showInfo ? <div className='info' ref={infoRef}>{showInfo}</div> : null}
    </div>
  )
}

export default App;
