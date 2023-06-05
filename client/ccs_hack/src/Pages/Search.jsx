import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from "../Components/Table"

const Search = () => {

  const [rid,setRid]= useState("")
  const [card, setCard] = useState({show:false, data:false})

  const noID=()=>toast("Enter the value of Request ID");

  const unvalid = () =>toast("Your Request ID is not valid");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(rid==""){
      noID();
      return
    }
    let response = await fetch(`http://127.0.0.1:5000/getOne/${rid}`)
    let json  = await response.json();
    if(json["response"]==null){
      unvalid();
      return;
    }
    setRid("")
    setCard({...card,data:json, show:true})
  }
   return (
    <div className="flex flex-col space-y-10 items-center justify-center h-[90vh]">
      <ToastContainer/>
      <div className="flex flex-col items-center justify-center  md:w-[60vw] space-y-8 border-2 shadow-[5px_5px_0px_0px_rgba(2,129,116,1)] rounded-lg px-4 py-10">
        <input className="text-center py-2.5 md:w-[30vw] w-[80vw] rounded-2xl border-2 border-[#ABFFFF] "  type="text" value={rid} onChange={(e)=>setRid(e.target.value)} placeholder="Enter Application ID"/>
        <button onClick={handleSubmit} className="text-white bg-[#028174] px-6 py-2 rounded-2xl">Search</button>
      </div>

      {card.show && <div className="flex flex-col justify-center  md:w-[60vw] space-y-6 border-2 rounded-lg px-4 py-4">

      <p className="font-medium">User Name: <span className="font-normal">{card.data.response.name}</span></p>
      <p className="font-medium"> User Email: <span className="font-normal">{card.data.response.email}</span></p>
      <p className="font-medium">Your Prescription:</p>
      {card.data?<Table jsonData={card.data.response.processed}/>:null}
      </div>}
    </div>
  )
}

export default Search