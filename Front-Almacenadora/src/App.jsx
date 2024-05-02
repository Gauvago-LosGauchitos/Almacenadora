import { Toaster } from "react-hot-toast"
import { HomePage } from "./Pages/Home/HomePage"

function App() {

  return (
    <>
      <HomePage/>
      <Toaster position='bottom-right' reverseOrder={false}/>
    </>
  )
}

export default App
