import { useParams, Link } from "react-router-dom";
import "./TestimonialDetail.css";
import sarahImg from "../../assets/png/sarah.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

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

function TestimonialDetail() {
  const { id } = useParams();
  const testimonial = testimonialsData.find((t) => t.id === Number(id));

  if (!testimonial) {
    return (
      <>
        <Navbar />
        <div className="testimonial-detail-wrapper">
          <h2>Testimonial not found</h2>
          <Link to="/" className="testimonial-back-btn">
            Back to Testimonials
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <Navbar/>
      <div className="testimonial-detail-wrapper">
      <div className="testimonial-detail-card">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="testimonial-avatar"
        />
        <h2 className="testimonial-user-name">{testimonial.name}</h2>
        <p className="testimonial-full-text">{testimonial.text}</p>
        <Link to="/" className="testimonial-back-btn">
          ← Back to Testimonials
        </Link>
      </div>
    </div>
    <Footer />
    </>
  
  );
}

export default TestimonialDetail;
