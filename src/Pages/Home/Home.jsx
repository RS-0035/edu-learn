import React, { useEffect, useState } from "react";
import "./Home.css";

// react router dom
import { Link } from "react-router-dom";

// Firebase
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

// components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PlanCard from "../../components/PlanCard/PlanCard";
import FAQItems from "../../components/FaqItems/FaqItems";
import YouTubePlayer from "../../components/YouTubePlayer/YouTubePlayer";

// images
import sarahImg from "../../assets/png/sarah.png";
import first from "../../assets/png/first.png";
import arrow from "../../assets/png/arrow.png";
import lightning from "../../assets/png/lighting.png";

const faqs = [
  {
    question: "Can I enroll in multiple courses at once?",
    answer:
      "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
    link: { text: "Enrollment Process for Different Courses", url: "#" },
  },
  {
    question: "What kind of support can I expect from instructors?",
    answer:
      "Instructors provide support via email, forums, and live Q&A sessions depending on the course.",
  },
  {
    question:
      "Are the courses self-paced or do they have specific start and end dates?",
    answer:
      "Most courses are self-paced, but some have scheduled cohorts with set start and end dates.",
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer:
      "Some advanced courses may have prerequisites, which are mentioned on the course page.",
  },
  {
    question: "Can I download the course materials for offline access?",
    answer:
      "Yes, most courses allow you to download materials for offline use.",
  },
];

function Home() {
  const [active, setActive] = useState("monthly");
  const [billingType, setBillingType] = useState("monthly");
  const [plans, setPlans] = useState([]);
  const [randomVideo, setRandomVideo] = useState("");

  const videoUrls = [
    "https://youtu.be/bCctDua1pxs?si=Ulsnf3UQQzmWyUao",
    "https://youtu.be/tGNqK0C7nws?si=0aTzAZT3VTrNFSiE",
    "https://youtu.be/WgkYwqXD6w0?si=qKTzNB8hXvA65T3j",
    "https://youtu.be/tBJQ7dwNeks?si=qMAxg9Gp_5U-IzhE",
    // Istagancha YouTube embed linklarini qo'sh
  ];

  const benefitsData = [
    {
      id: "01",
      title: "Flexible Learning Schedule",
      description:
        "Fit your coursework around your existing commitments and obligations.",
    },
    {
      id: "02",
      title: "Expert Instruction",
      description:
        "Learn from industry experts who have hands-on experience in design and development.",
    },
    {
      id: "03",
      title: "Diverse Course Offerings",
      description:
        "Explore a wide range of design and development courses covering various topics.",
    },
    {
      id: "04",
      title: "Updated Curriculum",
      description:
        "Access courses with up-to-date content reflecting the latest trends and industry practices.",
    },
    {
      id: "05",
      title: "Practical Projects and Assignments",
      description:
        "Develop a portfolio showcasing your skills and abilities to potential employers.",
    },
    {
      id: "06",
      title: "Interactive Learning Environment",
      description:
        "Collaborate with fellow learners, exchanging ideas and feedback to enhance your understanding.",
    },
  ];

  const coursesData = [
    {
      id: 1,
      image: first,
      duration: "4 Weeks",
      level: "Beginner",
      author: "John Smith",
      title: "Web Design Fundamentals",
      description:
        "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
    },
    {
      id: 2,
      image: first,
      duration: "6 Weeks",
      level: "Intermediate",
      author: "Emily Johnson",
      title: "UI/UX Design",
      description:
        "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
    },
    {
      id: 3,
      image: first,
      duration: "8 Weeks",
      level: "Intermediate",
      author: "David Brown",
      title: "Mobile App Development",
      description:
        "Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin.",
    },
    {
      id: 4,
      image: first,
      duration: "10 Weeks",
      level: "Beginner",
      author: "Sarah Thompson",
      title: "Graphic Design for Beginners",
      description:
        "Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs for print and digital media.",
    },
  ];

  const testimonialsData = [
    {
      id: 1,
      name: "Sarah L",
      text: "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
      image: sarahImg,
    },
    {
      id: 2,
      name: "Jason M",
      text: "The UI/UX design course exceeded my expectations. The instructor’s expertise and practical assignments helped me improve my design skills. I feel more confident in my career now. Thank you!",
      image: sarahImg,
    },
    {
      id: 3,
      name: "Emily R",
      text: "The mobile app development course was fantastic! The step-by-step tutorials and hands-on projects helped me grasp the concepts easily. I’m now building my own app. Great course!",
      image: sarahImg,
    },
    {
      id: 4,
      name: "Michael K",
      text: "I enrolled in the graphic design course as a beginner, and it was the perfect starting point. The instructor’s guidance and feedback improved my design abilities significantly. I’m grateful for this course!",
      image: sarahImg,
    },
  ];

  const freeFeatures = [
    { text: "Access to selected free courses.", included: true },
    { text: "Limited course materials and resources.", included: true },
    { text: "Basic community support.", included: true },
    { text: "No certification upon completion.", included: true },
    { text: "Ad-supported platform.", included: true },
    { text: "Access to exclusive Pro Plan community forums.", included: false },
    { text: "Early access to new courses and updates.", included: false },
  ];
  const proFeatures = [
    { text: "Unlimited access to all courses.", included: true },
    { text: "Unlimited course materials and resources.", included: true },
    { text: "Priority support from instructors.", included: true },
    { text: "Course completion certificates.", included: true },
    { text: "Ad-free experience.", included: true },
    { text: "Access to exclusive Pro Plan community forums.", included: true },
    { text: "Early access to new courses and updates.", included: true },
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const docRef = doc(db, "pricingPlans", billingType);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlans(docSnap.data().plans);
        } else {
          console.warn("No pricing data found for:", billingType);
        }
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      }
    };

    fetchPlans();
  }, [billingType]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoUrls.length);
    setRandomVideo(videoUrls[randomIndex]);
  }, []); // sahifa yuklanganda 1 marta random tanlaydi

  return (
    <>
      <Navbar />
      <div className="home-hero-section">
        <section className="hero-section">
          <div className="highlight-box">
            <img src={lightning} alt="icon" className="hero-icon" />
            <span>
              <strong className="highlight-text">Unlock</strong> Your Creative
              Potential
            </span>
          </div>

          <h2 className="hero-subtitle">
            with{" "}
            <span className="bold">Online Design and Development Courses</span>.
          </h2>

          <p className="hero-description">
            Learn from Industry Experts and Enhance Your Skills.
          </p>

          <div className="hero-buttons">
            <Link to="/courses" className="btn-orange">
              Explore Courses
            </Link>
            <Link to="/pricing" className="btn-outline">
              View Pricing
            </Link>
          </div>
        </section>
      </div>
      <div className="home-video-player">
        <YouTubePlayer videoUrl={randomVideo} />
      </div>

      <section className="benefits-section" id="benefit-section">
        <div className="benefits-header overal-title">
          <div className="benefits-text-info">
            <h2>Benefits</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
              eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
              cum eget habitasse in velit fringilla feugiat senectus in.
            </p>
          </div>
          <button className="view-all-btn">View All</button>
        </div>

        <div className="benefits-grid">
          {benefitsData.map((item) => (
            <div className="benefit-card" key={item.id}>
              <span className="benefit-number">{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="#" className="arrow-container">
                <img
                  className="arrow-btn"
                  width={50}
                  height={50}
                  src={arrow}
                  alt="arrow img"
                />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="home-courses-section" id="our-courses">
        <div className="home-courses-header overal-title">
          <div className="info-head">
            <h2>Our Courses</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
              eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
              cum eget habitasse in velit fringilla feugiat senectus in.
            </p>
          </div>
          <button className="view-all-btn">View All</button>
        </div>

        <div className="home-courses-grid">
          {coursesData.map((course) => (
            <div className="home-course-card" key={course.id}>
              <img
                src={course.image}
                alt={course.title}
                className="home-course-image"
              />
              <div className="home-course-info">
                <div className="home-course-meta">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                  <span>By {course.author}</span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button className="get-now-btn">Get it Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="home-testimonal" id="our-testimonials">
        <div className="home-testimonal-header overal-title">
          <div className="info-head">
            <h2>Our Testimonials</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
              eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
              cum eget habitasse in velit fringilla feugiat senectus in.
            </p>
          </div>
          <button className="view-all-btn">View All</button>
        </div>
        <section className="home-testimonial-section">
          <div className="home-testimonials-grid">
            {testimonialsData.map((item) => (
              <div className="testimonial-box" key={item.id}>
                <p className="testimonial-text">{item.text}</p>
                <div className="testimonial-footer">
                  <div className="testimonial-user">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="user-img"
                    />
                    <strong>{item.name}</strong>
                  </div>
                  <button className="read-btn">Read Full Story</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="home-pricing">
        <div className="home-pricing-header overal-title">
          <div className="info-head">
            <h2>Our Pricing</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
              eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
              cum eget habitasse in velit fringilla feugiat senectus in.
            </p>
          </div>
          <div className="pricing-options">
            <div className="toggle-container">
              <button
                className={`toggle-option ${
                  billingType === "monthly" ? "active" : ""
                }`}
                onClick={() => setBillingType("monthly")}
              >
                Monthly
              </button>
              <button
                className={`toggle-option ${
                  billingType === "yearly" ? "active" : ""
                }`}
                onClick={() => setBillingType("yearly")}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        <div className="pricing-container">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
            />
          ))}
        </div>

        <div className="faq-section" id="faq">
          <div className="faq-wrapper">
            <div className="faq-left">
              <h2>Frequently Asked Questions</h2>
              <p>
                Still you have any questions? Contact our Team via <br />
                <strong>support@skillbridge.com</strong>
              </p>
              <button className="all-faqs-btn">See All FAQ’s</button>
            </div>
            <div className="faq-right">
              {faqs.map((faq, index) => (
                <FAQItems key={index} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Home;
