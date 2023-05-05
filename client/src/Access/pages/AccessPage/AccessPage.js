import React, {useState} from "react";

// Import Components
import Login from "../../components/Login";
import LinkButton from "../../../util/components/LinkButton";

// Import Actions
import Logo from "../../../logo.svg";
import Signup from "../../components/Signup";

const tabs = {
  login: "login",
  signup: "signup",
};

const AcccessPage = () => {
  const [tab, setTab] = useState(tabs.login);
  const handleClick = (e, tab) => {
    e.preventDefault();
    setTab(tab);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-3 d-flex align-items-center">
          <img
            className="mx-3"
            src={Logo}
            alt="Logo"
            style={{height: "72px"}}
          />
          <h1 className="mt-4 col-12">Alaya Blog</h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header d-flex">
                  {[
                    [tabs.login, "Log in"],
                    [tabs.signup, "Sign up"],
                  ].map(([tabValue, tabName]) => (
                    <div className="col-md-6 text-center">
                      <LinkButton onClick={(e) => handleClick(e, tabValue)}>
                        {tabName}
                      </LinkButton>
                    </div>
                  ))}
                </div>
                <div className="card-body">
                  {tab === tabs.login ? <Login /> : <Signup />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AcccessPage.propTypes = {};

export default AcccessPage;
