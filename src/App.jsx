import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import News from "./pages/News";
import Jobs from "./pages/Jobs";
import Hackathons from "./pages/Hackathons";
import Courses from "./pages/Courses";
import About from "./pages/About";

import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Landing />} />

      <Route path="/news" element={<News />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route
        path="/hackathons"
        element={<Hackathons />}
      />

      <Route
        path="/courses"
        element={<Courses />}
      />

      <Route path="/about" element={<About />} />

      {/* Authentication */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/onboarding"
        element={<Onboarding />}
      />

      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* Profile */}

      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* Settings */}

      <Route
        path="/settings"
        element={<Settings />}
      />

      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;