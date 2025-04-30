import { Routes, Route } from "react-router-dom";
import ScrollToHashElement from "./components/ScrollToHashElement/ScrollToHashElement";

// Pages
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Pricing from "./Pages/Pricing/Pricing";
import Contact from "./Pages/Contact/Contact";
import Courses from "./Pages/Courses/Courses";
import OpenCourses from "./Pages/OpenCourses/OpenCourses";

// Auth Pages
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

// Testimonials
import TestimonialsPage from "./Pages/TestimonialsPage/TestimonialsPage";
import TestimonialDetail from "./Pages/TestimonialDetail/TestimonialDetail";

// Others
import BenefitsPage from "./Pages/BenefitsPage/BenefitsPage";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <>
      <ScrollToHashElement />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        {/* Courses */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/open-courses/:id" element={<OpenCourses />} />

        {/* Benefits */}
        <Route path="/benefits" element={<BenefitsPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Testimonials */}
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/testimonials/:id" element={<TestimonialDetail />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
