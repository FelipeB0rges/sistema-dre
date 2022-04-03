import React, { useState } from "react";
import "./Home.scss";
import { useHistory } from "react-router-dom";



const Home = () => {
  let history = useHistory()

  console.log(history)
 
  return (
    <>
      <div className="view-home">
        <button type="button" onClick={()=>{
          history.goBack()
        }}>Voltar</button>
      </div>
    </>
  );
};

export default Home;
