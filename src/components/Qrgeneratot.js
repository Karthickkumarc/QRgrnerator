import "./Qrgenerator.css";
import {useState} from 'react';
import React from 'react'

 function Qrgeneratot() {
  const [img,setimg]=useState("")
  const[loading,setloading]=useState(false);
  const[qrdata,setqrdata]=useState("https://karthick.com/")
  const[size,setsize]=useState(150)
 async  function genarate(){
    setloading(true)
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`;
      console.log(qrdata);
      setimg(url);
    }
    catch(error)
    {
      console.log("source not found")
    }
    finally{
      setloading(false)
    }

     
  }
  function downloadqr()
  {
    fetch(img)
    .then((res)=>res.blob())
    .then((blob)=>
    {
      const link=document.createElement('a')
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    })
  }
return (
<>
<div className='container'>
 { loading &&<p>please wait ......</p>}
{img && <img src= {img}alt="pic" />}
<div >
<h1>QR CODE GENERATOR</h1>
<label htmlFor="inputname" className='label-input'>enter your qrcode name :</label>
<input type="text" className="input-qrcode" value={qrdata} onChange={(e)=>{setqrdata(e.target.value)}} ></input>
<label htmlFor="inputsize" className='label-input'>  enter your qrcode size :</label>
<input type="number" className="input-qrsize" value={size} onChange={(e)=>setsize(e.target.value)}></input>
<button className="generate-button"  onClick={genarate}>generate QR code </button>
 <button className="download-button"onClick={downloadqr} >Download QR code </button>
</div>
</div>
</>
)
}
export default Qrgeneratot;
