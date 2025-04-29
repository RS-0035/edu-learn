import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Pricing from "./Pages/Pricing/Pricing";
import Contact from "./Pages/Contact/Contact";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import OpenCourses from "./Pages/OpenCourses/OpenCourses";
import ScrollToHashElement from "./components/ScrollToHashElement/ScrollToHashElement";
import NotFound from "./Pages/NotFound/NotFound";
import BenefitsPage from "./Pages/BenefitsPage/BenefitsPage";
import TestimonialsPage from "./Pages/TestimonialsPage/TestimonialsPage";
import TestimonialDetail from "./Pages/TestimonialDetail/TestimonialDetail";

function App() {
  return (
    <>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/open-courses/:id" element={<OpenCourses />} />
        <Route path="/benefits" element={<BenefitsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/testimonials/:id" element={<TestimonialDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
