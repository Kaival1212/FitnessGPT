import React from 'react'
import "./Popup.css"


function Popup({ children, activate}) {

    return (
      <>
      <div className='PopupBackground'></div>
      {children}
      </>
    )
  }

export default Popup