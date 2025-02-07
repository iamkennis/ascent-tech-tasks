import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DashboardPage from './pages/Dashboard';
import OtherPage from './pages/OtherPage';
import ProjectPage from './pages/ProjectPage';
import TaskDetailsPage from './components/task-details';
import EditTasks from './pages/EditTaks';
import CreateTasks from './pages/CreateTasks';
import SignUpPage from './pages/SignUp';


function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<OtherPage />} />
          <Route path="meeting" element={<OtherPage />} />
          <Route path="message" element={<OtherPage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="project/tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="project/tasks/edit/:taskId" element={<EditTasks />} />
          <Route path="project/tasks/add" element={<CreateTasks />} />
          <Route path="ticket" element={<OtherPage />} />
          <Route path="employee" element={<OtherPage />} />
          <Route path="attendance" element={<OtherPage />} />
          <Route path="notice" element={<OtherPage />} />
          <Route path="hr" element={<OtherPage />} />
          <Route path="organization" element={<OtherPage />} />
          <Route path="account" element={<OtherPage />} />
          <Route path="setting" element={<OtherPage />} />
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
