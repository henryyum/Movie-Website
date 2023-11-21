import React, {useEffect, useState} from 'react'

export default function SectionHeader(props) {

  return(
    <div className="Section-wrapper">
      <h3>{props.title}</h3>
        <div className="SectionHeader-btn-wrapper">
          <button style={props.styleLeft} onClick={props.handleBtnLeft} className="sectionbtn sectionbtn-one">{props.buttonTitleLeft}</button>
          <button style={props.styleRight} onClick={props.handleBtnRight} className="sectionbtn sectionbtn-two">{props.buttonTitleRight}</button>
        </div>
    </div>
  )
}