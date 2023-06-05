import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between space-x-10 px-3 py-3 text-white bg-[#028174]">

      <p className="text-2xl text-white">Med<span className="text-[#ABFFFF]">Doc</span></p>

      <div className="flex space-x-4 items-center px-2">

        <Link to="/"><p className="hover:text-[#ABFFFF]">Home</p></Link>
        <Link to="/upload"><p className="hover:text-[#ABFFFF]">Upload Prescription</p></Link>
        <Link to="/search"><p className="hover:text-[#ABFFFF]">Search Existing</p></Link>
        {/* <input type="search" className="rounded-md p-1.5" placeholder="Search by Request Id"/>  */}
      </div>
    </div>
  )
}

export default Navbar