import React from "react"
import Navbar from "./components/Navbar"


const Homepage = ()=>{
    return (
      <>
      <Navbar/>
      <p>Homepage</p>
      </>
    )
}

export default React.memo(Homepage)