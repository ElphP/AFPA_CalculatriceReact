import React from 'react';
import "./Touche.css";


function Bouton({childToParent,...props}) {
  
  
  return (
    
    <button onClick={() => childToParent(props.value)} value={props.value}>{props.children}</button>
  )
}

export default Bouton