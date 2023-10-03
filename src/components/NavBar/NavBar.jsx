import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service'
import '../NavBar/Nav.css'


function NavBar(props) {

  const handleLogOut = () => {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    props.setUser(null);
  }

  return (
    <nav id="nav">
      <h1>Welcome, {props.user.name}!</h1>
      <h2>Importaint Links:</h2>
      <Link to="/caloriesburned">CALORIES BURNED BY ACTIVITY</Link>
      &nbsp; | {" "}
      <Link to="exerciseinstructions">THE EXERCISE INSTRUCTIONS</Link>
      &nbsp; | {" "}
      <Link to="nutrition">NUTRITION</Link>
      &nbsp; | {" "}
      <Link to="cocktail">POST/PRE WORKOUT COCKTAIL BREAK!</Link>
      &nbsp; | {" "}
      <Link to="/">HOME</Link>
      <br />
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  )
}

export default NavBar