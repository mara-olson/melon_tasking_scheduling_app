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
  console.log(props.appts[0].appt_time);
  const apptsToShow = [];

  // React.useEffect(() => {
  //   fetch("/appointments")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAppts(data.appts);
  //       for (const appt of data.appts) {
  //         apptsToShow.push(<li className="appt-item">{appt.appt_time}</li>);
  //         //   console.log(typeof appt.appt_time);
  //       }
  //     });
  // }, []);

  for (const appt of props.appts) {
    console.log(appt.appt_time.substring(0, 16));
    const apptTime = appt.appt_time.substring(0, 16);
    apptsToShow.push(<li className="appt-item">{apptTime}</li>);
  }

  console.log(apptsToShow);

  return (
    <div>
      <h2>Appts</h2>
      <ul>{apptsToShow}</ul>
    </div>
  );
}

function ScheduleAppt(props) {
  const [chosenDate, setChosenDate] = React.useState(new Date());
  const today = new Date().toISOString().slice(0, 10);
  // const now =
  // const picker = datepicker(".datepicker");

  return (
    // <div>
    //   <label for="date-selector">Start date:</label>
    //   <input
    //     type="date"
    //     id="date-selector"
    //     name="date"
    //     value={today}
    //     min={today}
    //     max={today + 2000}
    //   />
    //   <label for="time-selector">Time:</label>
    //   <input id="time-selcetor" type="time" min="12:00" max="24:00" />
    // </div>
    <div className="row">
      <div className="col-6">
        <label className="col-2" for="date-selector">
          Date:
        </label>
        <input
          className="col-3"
          type="date"
          id="date-selector"
          value={today}
          min={today}
          // max={today + 2000}
        />
        <br></br>
        <label className="col-2" for="hours">
          Time:
        </label>
        <select className="col-3" required>
          <option> </option>
          <option value="12:00AM">12:00 AM</option>
          <option value="12:30AM">12:30 AM</option>
          <option value="1:00AM">1:00 AM</option>
          <option value="1:30AM">1:30 AM</option>
          <option value="2:00AM">2:00 AM</option>
          <option value="2:30AM">2:30 AM</option>
          <option value="3:00AM">3:00 AM</option>
          <option value="3:30AM">3:30 AM</option>
          <option value="4:00AM">4:00 AM</option>
          <option value="4:30AM">4:30 AM</option>
          <option value="5:00AM">5:00 AM</option>
          <option value="5:30AM">5:30 AM</option>
          <option value="6:00AM">6:00 AM</option>
          <option value="6:30AM">6:30 AM</option>
          <option value="7:00AM">7:00 AM</option>
          <option value="7:30AM">7:30 AM</option>
          <option value="8:00AM">8:00 AM</option>
          <option value="8:30AM">8:30 AM</option>
          <option value="9:00AM">9:00 AM</option>
          <option value="9:30AM">9:30 AM</option>
          <option value="10:00AM">10:00 AM</option>
          <option value="10:30AM">10:30 AM</option>
          <option value="11:00AM">11:00 AM</option>
          <option value="11:30AM">11:30 AM</option>
          <option value="12:00PM">12:00 PM</option>
          <option value="12:30PM">12:30 PM</option>
          <option value="1:00PM">1:00 PM</option>
          <option value="1:30PM">1:30 PM</option>
          <option value="2:00PM">2:00 PM</option>
          <option value="2:30PM">2:30 PM</option>
          <option value="3:00PM">3:00 PM</option>
          <option value="3:30PM">3:30 PM</option>
          <option value="4:00PM">4:00 PM</option>
          <option value="4:30PM">4:30 PM</option>
          <option value="5:00PM">5:00 PM</option>
          <option value="5:30PM">5:30 PM</option>
          <option value="6:00PM">6:00 PM</option>
          <option value="6:30PM">6:30 PM</option>
          <option value="7:00PM">7:00 PM</option>
          <option value="7:30PM">7:30 PM</option>
          <option value="8:00PM">8:00 PM</option>
          <option value="8:30PM">8:30 PM</option>
          <option value="9:00PM">9:00 PM</option>
          <option value="9:30PM">9:30 PM</option>
          <option value="10:00PM">10:00 PM</option>
          <option value="10:30PM">10:30 PM</option>
          <option value="11:00PM">11:00 PM</option>
          <option value="11:30PM">11:30 PM</option>
        </select>
      </div>
      {/* <div className="col-md-4">
            <label for="minutes">Minutes</label>
              <select class="form-control" required="">
                <option selected disabled></option>
                <option value="00"> 00 </option>
                <option value="30"> 30 </option>
            </select> */}
      {/* </div> */}
      {/* <div>
        <label for="hours">Select Meridiem</label>
        <select class="form-control" required="">
          <option selected="" value="AM">
            AM
          </option>
          <option value="PM"> PM </option>
        </select>
      </div> */}
      {/* </div> */}
    </div>
  );
}
