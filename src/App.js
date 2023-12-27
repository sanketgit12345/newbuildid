import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Mainlayout from './mainlayout/Mainlayout';
import Login from './auth/Login';
import HomePage from './pages/home/HomePage';
import ContactsPage from './pages/buildernetwork/ContactsPage';
import TimesheetPage from './pages/timesheets/TimesheetPage';
import ExpensesPage from './pages/expenses/ExpensesPage';
import TicketPage from './pages/tickets/TicketPage';
import axios from "axios";
import AddtimesheetPage from './pages/timesheets/AddtimesheetPage';

function App() {

  window.axios = axios;

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/main" element={<Mainlayout />}>
          <Route exact path="home" element={<HomePage />} />
          <Route exact path="contacts" element={<ContactsPage />} />
          <Route exact path="timesheets" element={<Outlet />}>
            <Route index exact element={<TimesheetPage />} />
            <Route path="add" element={<AddtimesheetPage />} />
          </Route>
          <Route exact path="tickets" element={<TicketPage />} />
          <Route exact path="expenses" element={<ExpensesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
