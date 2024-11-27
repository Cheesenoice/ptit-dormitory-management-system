import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dorm from "./pages/AdminDashboard/Dorm";
import AddDorm from "./pages/AdminDashboard/AddDorm";
import Update from "./pages/AdminDashboard/Update";
import Room from "./pages/AdminDashboard/Room";
import AddRoom from "./pages/AdminDashboard/AddRoom";
import StudentInfo from "./pages/AdminDashboard/StudentInfo";
import AddStudentInfo from "./pages/AdminDashboard/AddStudentInfo";
import StudentRoom from "./pages/AdminDashboard/StudentRoom";
import AddStudentRoom from "./pages/AdminDashboard/AddStudentRoom";
import EditRoom from "./pages/AdminDashboard/EditRoom";
import AdminLogin from "./pages/Home/AdminLogin";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import DashboardHome from "./pages/AdminDashboard/DashboardHome";
import Renew from "./pages/AdminDashboard/Renew";
import EditDorm from "./pages/AdminDashboard/EditDorm";
import StudentLogin from "./pages/Home/StudentLogin";
import StudentPage from "./pages/Student/StudentPage";
import Start from "./pages/Home/Start";
import PrivateRoute from "./ProtectRoute/PrivateRoute";
import StudentPageRoute from "./ProtectRoute/StudentPageRoute";
import NavBar from "./pages/Home/NavBar";
import "./style.css";
import HomePage from "./pages/Home/HomePage";
import RoomInfo from "./pages/Home/RoomInfo";
import Contact from "./pages/Home/Contact";
import RentForm from "./pages/Home/RentForm";
import History from "./pages/Student/History";
import HistoryView from "./pages/AdminDashboard/HistoryView";
import NewStudent from "./pages/AdminDashboard/NewStudent";
import DormEditHistory from "./pages/AdminDashboard/DormEditHistory";
import Water from "./pages/AdminDashboard/Water";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard/*"
            element={
              <>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      </>
                    }
                  >
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/dorm" element={<Dorm />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/addDorm" element={<AddDorm />} />
                    <Route path="/editDorm/:id" element={<EditDorm />} />
                    <Route path="/addRoom" element={<AddRoom />} />
                    <Route path="/update/:id" element={<Update />} />
                    <Route path="/room/:id" element={<EditRoom />} />
                    <Route path="/studentInfo" element={<StudentInfo />} />
                    <Route
                      path="/addStudentInfo"
                      element={<AddStudentInfo />}
                    />
                    <Route path="/renew/:id" element={<Renew />} />
                    <Route
                      path="/dormedithistory/:id"
                      element={<DormEditHistory />}
                    />
                    <Route path="/newstudent" element={<NewStudent />} />
                    <Route path="/studentRoom" element={<StudentRoom />} />
                    <Route path="/water" element={<Water />} />
                    <Route
                      path="/addStudentRoom"
                      element={<AddStudentRoom />}
                    />
                    <Route path="/view/:id" element={<HistoryView />} />
                  </Route>
                </Routes>
              </>
            }
          />

          <Route
            path="/student"
            element={
              <>
                <NavBar />{" "}
                <StudentPageRoute>
                  <StudentPage />
                </StudentPageRoute>
              </>
            }
          ></Route>
          <Route
            path="/student/history"
            element={
              <>
                <NavBar />{" "}
                <StudentPageRoute>
                  <History />
                </StudentPageRoute>
              </>
            }
          ></Route>
          <Route
            path="/start"
            element={
              <>
                <NavBar /> <Start />
              </>
            }
          ></Route>
          <Route
            path="/form"
            element={
              <>
                <NavBar /> <RentForm />
              </>
            }
          ></Route>
          <Route
            path="/contact"
            element={
              <>
                <NavBar /> <Contact />
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                <NavBar /> <HomePage />
              </>
            }
          ></Route>
          <Route
            path="/roominfo/:id"
            element={
              <>
                <NavBar /> <RoomInfo />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <NavBar /> <StudentLogin />
              </>
            }
          />
          <Route
            path="/adminlogin"
            element={
              <>
                <NavBar /> <AdminLogin />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
