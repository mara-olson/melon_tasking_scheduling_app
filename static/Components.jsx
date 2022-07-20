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
      <div className="scheduling-container">
        <div className="card">
          <div>
            <form>
              <label htmlFor="username-entry" className="username-message">
                Enter or create a username
              </label>
              <br></br>
              <input
                name="username-entry"
                type="text"
                value={username}
                onChange={(evt) => setUsername(evt.currentTarget.value)}
              ></input>
              <br></br>
              <button classname="btn" id="login-btn" onClick={handleLogin}>
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
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

  // let hrefLink = "/";
  // if (props.isLoggedIn) {
  //   hrefLink = "/home";
  // }

  return (
    <div className="navbar-color">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid navbar-container">
          <a className="navbar-brand" href="/">
            {/* <img src={props.logo} height="30" alt="logo" /> */}
            <span className="honey-font">HoneyDo</span>
            <br></br>
            <span className="honey-font small">Tastings</span>
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
                    <a className="nav-link" aria-current="page">
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
                  <a className="nav-link logout" href="" onClick={handleLogout}>
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

function Homepage(props) {
  const history = ReactRouterDOM.useHistory();

  const navigateToScheduling = (evt) => {
    evt.preventDefault();
    history.push("/schedule");
  };
  return (
    <div>
      <div className="scheduling-container">
        <div className="card">
          <h2>Welcome!</h2>
          <p>
            Here at HoneyDo Tastings, we value juiciness above all else. It is
            our mission to send the absolute greatest volume of melon juice
            running down your chin with every bite.
          </p>
          <p>
            All of our credentialed melonniers have been rigorously trained in
            identifying nuanced distinctions between over 3,000 melon varietals
            from around the world. We offer the best pairings and guarantee the
            highest quality experience or your money back.
          </p>
          <br></br>
          <button className="schedule-text-btn" onClick={navigateToScheduling}>
            Schedule a tasting today!
          </button>
        </div>
      </div>
    </div>
  );
}

function Appointments(props) {
  // console.log(props.appts[0].appt_time);
  const apptsToShow = [];

  for (const appt of props.appts) {
    const apptDate = appt.appt_time.substring(0, 16);
    const apptTime = appt.appt_time.substring(16, 22);
    const apptTimeOfDay = apptTime.substring(0, 3);
    const apptMinutes = apptTime.substring(4, 6);
    console.log(apptMinutes);
    let timeOfDay = "AM";
    if (apptTimeOfDay > 12) {
      timeOfDay = "PM";
      // if (apptTimeOfDay === "18") {
      //   apptTimeOfDay = "06";
      // }
    }
    // if (apptMinutes !== "30" || apptMinutes !== "00") {
    //   apptMinutes = "00";
    // }
    apptsToShow.push(
      <li className="appt-item">
        {apptDate} at {apptTime}
        {timeOfDay}
      </li>
    );
  }

  return (
    <div>
      <div className="scheduling-container">
        <div className="card">
          <div className="my-tastings-container">
            <h2 className="my-tastings-header">My Tastings</h2>
            <ul className="appts-list">{apptsToShow}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessCard(props) {
  return (
    <div className="scheduling-container">
      <div className="card">
        <div className="booked"></div>
        Success! Your appt is booked for <strong>{props.successAppt}</strong>
      </div>
    </div>
  );
}

function ScheduleAppt(props) {
  const today = new Date().toISOString().slice(0, 10);

  const [chosenDate, setChosenDate] = React.useState(today);
  const [chosenStartTime, setChosenStartTime] = React.useState("12:00 AM");
  const [chosenEndTime, setChosenEndTime] = React.useState("12:00 AM");
  const [chosenTime, setChosenTime] = React.useState(null);
  const [scheduleError, setScheduleError] = React.useState("");
  const [apptOptions, setApptOptions] = React.useState([]);
  const [showAppts, setShowAppts] = React.useState(false);
  const [successAppt, setSuccessAppt] = React.useState(null);
  // const [isDisabled, setIsDisabled] = React.useState(false);

  const handleSearchAppts = (evt) => {
    evt.preventDefault();
    // setIsDisabled(true);
    setScheduleError(null);
    fetch("/api/schedule-search", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        appt_date: chosenDate,
        appt_start_time: chosenStartTime,
        appt_end_time: chosenEndTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // console.log("SUCCESS!");
          setShowAppts(true);
          setApptOptions(data.appt_options);
          setScheduleError(null);
          // setIsDisabled(false);
        } else {
          // console.log(data.error);
          setShowAppts(false);
          setScheduleError(data.error);
        }
      });
  };

  const handleScheduleAppt = (evt) => {
    evt.preventDefault();
    setScheduleError(null);
    fetch("/api/schedule", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        appt_date: chosenDate,
        appt_time: chosenTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.new_appt);
        setSuccessAppt(data.new_appt);
        setScheduleError(null);
        // setShowAppts(true);
        // setScheduleError(data.error);
      });
  };

  // let selected = false;
  // const handleSelectAppt = (evt) => {
  //   selected = true;
  // };

  const apptButtons = [];
  for (const apptOption of apptOptions) {
    console.log(apptOption);
    apptButtons.push(
      <div className="col-3 appt-btn-row">
        <button
          className={"appt-btn"}
          value={apptOption}
          onClick={(evt) => {
            evt.preventDefault();
            setChosenTime(apptOption);
          }}
        >
          {apptOption}
        </button>
      </div>
    );
  }

  return (
    <div>
      {successAppt ? (
        <SuccessCard successAppt={successAppt} />
      ) : (
        <div className="scheduling-container">
          <div className="card">
            <div>
              <h3>Select a date & time for your tasting</h3>
              <br></br>
              <label className="col-3" htmlFor="date-selector">
                Date:
              </label>
              <input
                className="col-4"
                type="date"
                id="date-selector"
                value={chosenDate}
                min={today}
                onChange={(evt) => {
                  setChosenDate(evt.currentTarget.value);
                }}
              />
              <p></p>
              <label className="col-3" htmlFor="hours">
                Start Time:
              </label>
              <select
                className="col-4"
                value={chosenStartTime}
                required
                onChange={(evt) => {
                  setChosenStartTime(evt.currentTarget.value);
                }}
              >
                <option> </option>
                <option value="12:00 AM">12:00 AM</option>
                <option value="12:30 AM">12:30 AM</option>
                <option value="1:00 AM">1:00 AM</option>
                <option value="1:30 AM">1:30 AM</option>
                <option value="2:00 AM">2:00 AM</option>
                <option value="2:30 AM">2:30 AM</option>
                <option value="3:00 AM">3:00 AM</option>
                <option value="3:30 AM">3:30 AM</option>
                <option value="4:00 AM">4:00 AM</option>
                <option value="4:30 AM">4:30 AM</option>
                <option value="5:00 AM">5:00 AM</option>
                <option value="5:30 AM">5:30 AM</option>
                <option value="6:00 AM">6:00 AM</option>
                <option value="6:30 AM">6:30 AM</option>
                <option value="7:00 AM">7:00 AM</option>
                <option value="7:30 AM">7:30 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="8:30 AM">8:30 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:30 AM">9:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="1:30 PM">1:30 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="2:30 PM">2:30 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="3:30 PM">3:30 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="4:30 PM">4:30 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="5:30 PM">5:30 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="6:30 PM">6:30 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="7:30 PM">7:30 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="8:30 PM">8:30 PM</option>
                <option value="9:00 PM">9:00 PM</option>
                <option value="9:30 PM">9:30 PM</option>
                <option value="10:00 PM">10:00 PM</option>
                <option value="10:30 PM">10:30 PM</option>
                <option value="11:00 PM">11:00 PM</option>
                <option value="11:30 PM">11:30 PM</option>
              </select>
              <p></p>
              <label className="col-3" htmlFor="hours">
                End Time:
              </label>
              <select
                className="col-4"
                value={chosenEndTime}
                required
                onChange={(evt) => {
                  setChosenEndTime(evt.currentTarget.value);
                }}
              >
                <option> </option>
                <option value="12:00 AM">12:00 AM</option>
                <option value="12:30 AM">12:30 AM</option>
                <option value="1:00 AM">1:00 AM</option>
                <option value="1:30 AM">1:30 AM</option>
                <option value="2:00 AM">2:00 AM</option>
                <option value="2:30 AM">2:30 AM</option>
                <option value="3:00 AM">3:00 AM</option>
                <option value="3:30 AM">3:30 AM</option>
                <option value="4:00 AM">4:00 AM</option>
                <option value="4:30 AM">4:30 AM</option>
                <option value="5:00 AM">5:00 AM</option>
                <option value="5:30 AM">5:30 AM</option>
                <option value="6:00 AM">6:00 AM</option>
                <option value="6:30 AM">6:30 AM</option>
                <option value="7:00 AM">7:00 AM</option>
                <option value="7:30 AM">7:30 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="8:30 AM">8:30 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:30 AM">9:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="1:30 PM">1:30 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="2:30 PM">2:30 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="3:30 PM">3:30 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="4:30 PM">4:30 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="5:30 PM">5:30 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="6:30 PM">6:30 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="7:30 PM">7:30 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="8:30 PM">8:30 PM</option>
                <option value="9:00 PM">9:00 PM</option>
                <option value="9:30 PM">9:30 PM</option>
                <option value="10:00 PM">10:00 PM</option>
                <option value="10:30 PM">10:30 PM</option>
                <option value="11:00 PM">11:00 PM</option>
                <option value="11:30 PM">11:30 PM</option>
              </select>
            </div>
            <div className="message-container">
              {scheduleError && (
                <p className="error-message">{scheduleError}</p>
              )}
              {showAppts && (
                <p className="pick-a-time-message">
                  Please select a time from the options below
                </p>
              )}
              {(!scheduleError || !showAppts) && <p></p>}
            </div>
            {!showAppts && (
              <div>
                <br></br>
                <button
                  className="btn schedule-button"
                  onClick={handleSearchAppts}
                >
                  Search Appointments
                </button>
              </div>
            )}
            {showAppts && (
              <div className="results-container">{apptButtons}</div>
            )}
            {showAppts && (
              <button
                className="btn schedule-button"
                onClick={handleScheduleAppt}
                // disabled={isDisabled}
              >
                Confirm Appointment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
