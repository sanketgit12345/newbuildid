import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Mainlayout from "./mainlayout/Mainlayout";
import Login from "./auth/Login";
import HomePage from "./pages/home/HomePage";
import ContactsPage from "./pages/buildernetwork/ContactsPage";
import TimesheetPage from "./pages/timesheets/TimesheetPage";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import TicketPage from "./pages/tickets/TicketPage";
import axios from "axios";
import AddtimesheetPage from "./pages/timesheets/AddtimesheetPage";
import Profile from "./pages/profile/ProfilePage";
import BuySellListPage from "./pages/buysell/BuySellListPage";
import JobPostingPage from "./pages/jobposting/JobPostingPage";
import MontagesPage from "./pages/montages/MontagesPage";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import EmailVerification from "./auth/EmailVerification";
import AddExpensesPage from "./pages/expenses/AddexpensesPage";
import ExpensesdetailPage from "./pages/expenses/ExpensesdetailPage";
import Mapview from "./pages/map/Mapview";
import Rewards from "./pages/rewards/Rewards";
import Settings from "./pages/settings/Settings";

function App() {

  window.axios = axios;

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/verification" element={<EmailVerification />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/main" element={<Mainlayout />}>
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="home" element={<HomePage />} />
          <Route exact path="map" element={<Mapview />} />
          <Route exact path="settings" element={<Settings />} />
          <Route exact path="rewards" element={<Rewards />} />
          <Route exact path="contacts" element={<ContactsPage />} />
          <Route exact path="timesheets" element={<Outlet />}>
            <Route index exact element={<TimesheetPage />} />
            <Route path="add" element={<AddtimesheetPage />} />
          </Route>
          <Route exact path="tickets" element={<TicketPage />} />
          <Route exact path="expenses" element={<Outlet />} >
            <Route index exact element={<ExpensesPage />} />
            <Route path="add" element={<AddExpensesPage />} />
            <Route path=":id" element={<ExpensesdetailPage />} />
            <Route path="edit/:id" element={<AddExpensesPage />} />
          </Route>
          <Route exact path="buy-sell" element={<BuySellListPage />} />
          <Route exact path="job-postings" element={<JobPostingPage />} />
          <Route exact path="montages" element={<MontagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
