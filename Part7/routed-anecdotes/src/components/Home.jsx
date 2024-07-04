import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Menu from "./Menu"
import Notification from "./Notification"

const Home = () => {
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home
