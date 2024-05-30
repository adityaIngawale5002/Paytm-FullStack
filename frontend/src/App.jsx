import React from "react"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"
import Update from "./pages/Update"
import {BrowserRouter, Routes, Route,useNavigate} from "react-router-dom"
import {Toaster} from "react-hot-toast"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/transfer" element={<SendMoney/>}/>
          <Route path="/update" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </>
  )
}

export default App
