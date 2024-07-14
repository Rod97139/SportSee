import { Link } from "react-router-dom"
import "./SelectUser.scss"

const SelectUser = () => {
  return (
    <div className={"select-user"}>
      <span className="consigne">Sélectionnez un utilisateur:</span>
      <Link to="/user/12" >
        <button className="btn-perso">Karl</button>
      </Link>
      <Link to="/user/18" >
        <button className="btn-perso">Cécilia</button> 
      </Link>
    </div>
  )
}

export default SelectUser
