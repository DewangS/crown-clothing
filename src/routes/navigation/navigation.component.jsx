import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

import './navigation.styles.scss'
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
      <Link className="logo-container" to="/">
        <div>
            <CrwnLogo/>
        </div>
        </Link>
        <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            <Link className="nav-link" to="/authentication">
                SIGN IN
            </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
