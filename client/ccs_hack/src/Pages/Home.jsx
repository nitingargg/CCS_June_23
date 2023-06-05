import {Link} from "react-router-dom"

const Home = () => {
  return (

    <div className="h-[80vh] flex flex-row items-center justify-center flex-wrap">

      <div className="h-[40vh] w-[40vh] rounded-3xl bg-[url('doctor.jpg')] bg-cover md:m-0 m-10">
      </div>

      <div className="flex flex-col space-y-8 md:ml-12 md:p-0 p-10 md:w-[50vw]">
        <p className="text-[#028174] text-4xl font-bold">
          Welcome to MedDoc
        </p>
        <p className="text-justify">
        The enchanting portal that transforms the ancient art of deciphering doctor's prescriptions into a magical digital experience! Are you tired of squinting your eyes and playing detective with those illegible scribbles? Well, fret no more! MedDoc is here to sprinkle some digital pixie dust on your prescription images and make them sparkle with clarity!
        </p>
        <Link to="/upload"><button className="bg-[#028174] px-4 py-2 rounded-lg text-white w-fit">Start by Uploading a Prescription</button></Link>
      </div>
    </div>

  )
}

export default Home