import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainlayout from './mainlayout/Mainlayout';
import Login from './auth/Login';
// import HomePage from './pages/home/HomePage';
// import ContactsPage from './pages/buildernetwork/ContactsPage';
// import TimesheetPage from './pages/timesheets/TimesheetPage';
// import ExpensesPage from './pages/expenses/ExpensesPage';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/main" element={<Mainlayout />}>
          {/*  <Route exact path="home" element={<HomePage />} />
           <Route exact path="contacts" element={<ContactsPage />} />
           <Route exact path="timesheets" element={<TimesheetPage />} />
           <Route exact path="expenses" element={<ExpensesPage />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
