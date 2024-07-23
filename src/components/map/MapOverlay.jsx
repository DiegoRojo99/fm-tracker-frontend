import { useState, useEffect } from "react";
import CrossIcon from './../../img/Cross.svg';
import TrophyIcon from './../../img/Trophy.svg';

export default function MapOverlay({competitions}){

  const [showing, setShowing] = useState(!!competitions.length);

  useEffect(() => {
    setShowing(!!competitions.length);
  }, [competitions]);

  if(!showing){
    return <></>
  }
  return (
    <div className='map-overlay' >
      <div className='map-overlay-top' >
        <img src={CrossIcon} className="map-overlay-cross white-image" onClick={() => setShowing(false)} />
      </div>
      {competitions && competitions.length ? 
        <>
          {competitions.map(l => <MapOverlayRow competition={l} />)}
        </> : 
      <></>}
    </div>
  )
}

function MapOverlayRow({competition, achieved = false}){

  return (
    <div className="map-row">
      <p>{competition.name}</p>
      <img className={achieved ? "trophy-icon white-image" : "trophy-icon"} src={TrophyIcon} />
    </div>
  )
}