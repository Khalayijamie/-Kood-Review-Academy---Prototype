import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Intro from "./pages/Intro";
import CategoriesFramework from "./pages/CategoriesFramework";
import CategoryLesson from "./pages/CategoryLesson";
import PracticeScenario from "./pages/PracticeScenario";
import Quiz from "./pages/Quiz";
import GroundRules from "./pages/GroundRules";
import Complete from "./pages/Complete";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-koodBg text-white">
        <Sidebar />

        <div className="flex-1 p-10 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Intro />} />

            <Route path="/academy/categories" element={<CategoriesFramework />} />
            <Route path="/academy/ground-rules" element={<GroundRules />} />
            <Route path="/academy/complete" element={<Complete />} />

            {/* Practice + quiz are more specific than category lesson */}
            <Route path="/academy/:id/practice" element={<PracticeScenario />} />
            <Route path="/academy/:id/quiz/:quizId" element={<Quiz />} />

            {/* Category lesson (last) */}
            <Route path="/academy/:id" element={<CategoryLesson />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}