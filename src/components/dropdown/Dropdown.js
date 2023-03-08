import React,{useState,useEffect,useRef} from 'react'
import "./style.css"
import {BiChevronDown} from "react-icons/bi"
function DropDown({children,name1,name2,name3,setSelectEelement,blockContent,setBlockContent}) {

  const ref=useRef(null)
  const [count,setCount]=useState(0)
  let counter=0
  const onClickDroprDown=(name)=>{
    // debugger;
 
    counter=0
setCount(0)
    setSelectEelement(name);
    setBlockContent(!blockContent)
  }
  const onClickDroprDown1=()=>{
    // debugger;
    console.log("11")
    // alert("sjs")
    counter =1
    setBlockContent(!blockContent)
    setCount(prev=>prev+1)
  }

  return (
    <div className="dropdown">
  <div onClick={()=>{onClickDroprDown1()}}>{children?children: <BiChevronDown style={{fontSize:"1.3rem",color:"white"}} />}</div>
   
    <div ref={ref} className={`dropdown-content ${blockContent?"drop_block":""}`} >
      <a   onClick={()=>{onClickDroprDown(name1)}}>{name1?name1:"Sign Out"}</a>
     
      <a  onClick={()=>{onClickDroprDown(name2)}}>{name1?name2:"Details"}</a>
      <a onClick={()=>{onClickDroprDown(name3)
      }}>{name1?name3:"Contact US"}</a>
    </div>
  </div>
  )
}

export default DropDown