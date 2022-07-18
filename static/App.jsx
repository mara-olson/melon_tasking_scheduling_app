// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import DateTimePicker from "@react-native-community/datetimepicker";

const { Route, BrowserRouter } = ReactRouterDOM;

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

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
        bg="light"
        expand="lg"
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      >
        Navbar
      </Navbar>
      <Route exact path="/">
        <Login
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userId={userId}
          setUserId={setUserId}
        />
      </Route>
      <Route exact path="/schedule">
        <ScheduleAppt />
      </Route>
      <div>
        <Route exact path="/appointments">
          <Appointments userId={userId} appts={appts} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
