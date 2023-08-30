import "./HamMenu.module.scss";
import { getUser } from '../../utilities/users-service';

export default function HamMenu() {
    const user = getUser();
    const handleClick = () => {
        console.log('Clicked!')
    }

    return (
        <ul className="menuContainer">
          <li>
            {user ? (
              <ul className="userOptions">
                <li
                  onClick={handleClick}
                >
                  MY ACCOUNT
                </li>
                {/* <Link to="/users" >MY ACCOUNT</Link> */}
                <li onClick={handleClick}>
                  WISHLIST
                </li>
                {/* <Link to="/wishlist" >WISHLIST</Link> */}
                <li
                  onClick={handleClick}
                >
                  ORDER HISTORY
                </li>
                {/* <Link to="/orders" >ORDER HISTORY</Link> */}
                <li onClick={handleClick}>LOGOUT</li>
              </ul>
            ) : (
              <p className="auth" onClick={handleClick}>
                SIGN IN / SIGN UP
              </p>
            )}
          </li>
          {/* <p>{result}</p> */}
          <li>
            <ul className="info">
              <li onClick={handleClick}>
                FAQ
              </li>
              <li onClick={handleClick}>
                ABOUT US
              </li>
            </ul>
          </li>
        </ul>
      );
    }