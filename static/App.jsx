// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import DateTimePicker from "@react-native-community/datetimepicker";

const { Route, BrowserRouter } = ReactRouterDOM;

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [appts, setAppts] = React.useState(null);

  React.useEffect(() => {
    fetch("/login")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data);
        setIsLoggedIn(true);
      });
  }, []);

  React.useEffect(() => {
    fetch("/appointments")
      .then((response) => response.json())
      .then((data) => {
        setAppts(data.appts);
        // console.log(data.appts);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        // logo="/css/logo.png"
        bg="light"
        expand="lg"
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      >
        Navbar
      </Navbar>
      <div className="app-container">
        <Route exact path="/">
          {!isLoggedIn ? (
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId}
            />
          ) : (
            <Homepage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              error={error}
              setError={setError}
            />
          )}
        </Route>

        <Route exact path="/schedule">
          <ScheduleAppt error={error} setError={setError} />
        </Route>
        <div>
          <Route exact path="/appointments">
            <Appointments
              userId={userId}
              appts={appts}
              error={error}
              setError={setError}
            />
          </Route>
        </div>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
