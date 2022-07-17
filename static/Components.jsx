function Login(props) {
  const [username, setUsername] = React.useState(null);

  const handleLogin = (evt) => {
    evt.preventDefault();
    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        props.setUserId(data.active_user_id);
        console.log(data);
        props.setIsLoggedIn(true);
      });
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username-entry">Username</label>
        <input
          name="username-entry"
          type="text"
          value={username}
          onChange={(evt) => setUsername(evt.currentTarget.value)}
        ></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

function Navbar(props) {
  const history = ReactRouterDOM.useHistory();
  const handleLogout = (evt) => {
    evt.preventDefault();
    props.setIsLoggedIn(false);
    history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {props.isLoggedIn && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <ReactRouterDOM.NavLink to="/schedule">
                    <a className="nav-link active" aria-current="page">
                      Schedule a Tasting
                    </a>
                  </ReactRouterDOM.NavLink>
                </li>
                <li className="nav-item">
                  <ReactRouterDOM.NavLink to="/appointments">
                    <a className="nav-link">My Tastings</a>
                  </ReactRouterDOM.NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

function Appointments(props) {
  const [appts, setAppts] = React.useState([]);

  React.useEffect(() => {
    fetch("/appointments")
      .then((response) => response.json())
      .then((data) => {
        // setAppts(data.appts);
        for (const appt of data.appts) {
          // apptsToShow.push(<div>{appt["appt_time"]}</div>);
          console.log(appt.appt_time);
        }
      });
  }, []);

  const apptsToShow = [];
  for (const appt in appts) {
    console.log(appt.appt_time);
    apptsToShow.push(<li>{appt.appt_time}</li>);
  }

  // console.log(apptsToShow);

  return (
    <div>
      <h2>Appts</h2>
      <ul>{apptsToShow}</ul>
    </div>
  );
}
