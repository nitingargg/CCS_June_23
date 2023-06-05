import Home from './Pages/Home'
import Upload from './Pages/Upload'
import Search from './Pages/Search'
import Navbar from "./Components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App