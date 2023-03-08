import React from 'react'
import "./profile.css"
import profile from "../../images/profileIcon.png"
import {BsFillPlusCircleFill} from "react-icons/bs"
function Profile() {
    
  return (
    <div className='profile'>
    <h1>Who's Wacthing ?</h1>
    <div className='profile_section'>
        {["subhan","Me","Home"].map(val=>(
             <div className='profile_inner'>
             <img src="https://occ-0-5092-58.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZBe7K0DPia9LvzIkQ4yzqX9NocZlAjS1MOyEuBQD1WmFuLKZwvq0bxc4n4_EV73khqgwed0PYLNml0V8LCymt31e7x-8jQ.png?r=229"></img>
              <h3 className='profile_inner_title'>{val}</h3>
        </div>
        ))}
 <div className='profile_inner'>
         <div className='add_icon_div'>    <BsFillPlusCircleFill style={{fontSize:"7rem",justifySelf:"center"}} /></div>
              <h3 className='profile_inner_title'>Add Profile</h3>
        </div>
    </div>
    <button className='manage_profile'>Manage Profile</button>
    </div>
  )
}

export default Profile