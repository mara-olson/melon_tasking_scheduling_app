# HoneyDo Tasting

## Why?

HoneyDo Tasting is the product of a creative Hackbright Academy assignment -- or, more accurately, a fantastic opportunity to hone coding skills!
<br><br>

## What?

To support the fictitious need for users to schedule boutique melon-tasting experiences, HoneyDo uses a combination of technologies to allow users to register/log in, search for appointments on a given date within a specified range of times, book the appointment, and view a summary of all appointments the user has scheduled.
![HoneyDo Scheduling](/static/Images/HoneyDo-Scheduling.png)
<br>

## How? (and why that how?)

### Backend

HoneyDo’s backend technology is based on the author’s familiarity. A PostgreSQL database links two separate classes/tables for Users and Appointments (details can be seen in the data architecture image below). The database is queried & updated with Python, Flask, and SQLAlchemy. The active user’s ID is also stored in session for ready access.
![data diagram](/static/Images/data-architecture.png)

### Frontend

To solidify and improve upon recent learnings in optimizing component-based architecture, HoneyDo’s frontend utilizes React. This also allows the app to cohesively update state across components, such as setting login status or error messages. React state is also utilized to pull appointment data from the database and pass this down to other components as props.
<br>
<br>
In addition to React, a fair portion of HoneyDo’s frontend is built from HTML stylized with CSS. For instance, to reduce the complexity of installation and setup (and work around roadblocks in doing so), a simple input HTML element with type=”date” was used to create the datepicker, and time range selections stem from options of select elements.
<br>
To hone stylizing skills, CSS was utilized rather than more ready-made options such as Bootstrap.
