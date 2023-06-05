import { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from "../Components/Table"

const Upload = () => {

  const [formData, setData] = useState({ name: "", email: "", file: "" })
  const [drag_text, setDrag] = useState("drag and drop your files here");
  const [loading, isLoading] = useState({ "panel": false, "spin": false,"data":null })

  const fileRef = useRef()

  const noFile = () => toast("Please Select a valid File");

  const handleSubmit = async (e) => {

    e.preventDefault()
    if (formData.file == "") {
      noFile();
      return
    }

    setData({ name: "", email: "", file: "" })
    setDrag("drag and drop your files here")
    isLoading({ ...loading, panel: true, spin: true })

    let bodyContent = new FormData();
    bodyContent.append("name", formData.name);
    bodyContent.append("email", formData.email);
    bodyContent.append("img_file", formData.file);

    let response = await fetch("http://127.0.0.1:5000/postFile", {
      method: "POST",
      body: bodyContent,
      mode:"cors"
    });

    let data = await response.json()

    isLoading({ ...loading, panel: true, spin: false, data:data })
  }

  const handleFileChange = (e) => {
    setData({ ...formData, file: e.target.files[0] })
    setDrag(e.target.files[0]["name"])
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]
    setData({ ...formData, file: file })
    setDrag(file["name"])
    fileRef.current.value = ""
  }


  return (
    <div className="flex flex-row items-center justify-center h-[90vh] space-x-10" >
      <ToastContainer />
      <div className="md:w-[30vw] shadow-lg px-4 py-10 rounded-lg " >

        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input type="text" value={formData["name"]} onChange={(n) => setData({ ...formData, name: n.target.value })} id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" value={formData["email"]} onChange={(n) => setData({ ...formData, email: n.target.value })} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@mail.com" required />
          </div>


          <div className="mb-6">
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prescription Image</p>

            <input onClick={() => fileRef.current.click()} onDragOver={() => setDrag("Drop Here")} onDragLeave={() => setDrag("drag and drop your files here")} onDrop={handleDrop} className="p-4 h-[20vh] w-full flex flex-col justify-center items-center border-2 border-dashed rounded-lg text-gray-300" value={drag_text} onChange={() => null} />

            <input type="file" hidden ref={fileRef} onChange={handleFileChange} />
          </div>
          <button type="submit" className="text-white bg-[#028174] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit Prescription</button>
        </form>

      </div>


      {loading.panel && <div className="md:w-[30vw] flex flex-col space-y-4 items-center justify-center shadow-lg rounded-lg p-4">

        {loading.spin && <div className="animate-spin w-10 h-10 bg-transparent rounded-full border-4 border-dotted border-gray-500"></div>}


        <p>Your Request ID is: <span className="font-bold">{loading.data?loading.data["req_id"]:null}</span></p>
        <p>Processed Information</p>
        {loading.data?<Table jsonData = {loading.data["output"]}/>:null} 
      </div>}
    </div>
  )
}

export default Upload