import { Link } from "react-router-dom"
import "./SelectUser.scss"

const SelectUser = () => {
  return (
    <div className={"select-user"}>
      SelectUser
      <Link to="/user/12" >
        <button>Karl</button>
      </Link>
      <Link to="/user/18" >
        <button>Cécilia</button> 
      </Link>
    </div>
  )
}

export default SelectUser
