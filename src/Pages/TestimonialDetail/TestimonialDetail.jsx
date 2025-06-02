import { useParams, Link } from "react-router-dom";
import "./TestimonialDetail.css";
import sarahImg from "../../assets/png/sarah.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah L",
    text: "Veb-dizayn kursi men uchun mustahkam poydevor yaratdi. O'qituvchilar bilimdon va qo'llab-quvvatladilar va interaktiv o'quv muhiti qiziqarli edi. Men buni juda tavsiya qilaman!",
    image: sarahImg,
  },
  {
    id: 2,
    name: "Jason M",
    text: "UI/UX dizayn kursi mening kutganimdan oshib ketdi. O'qituvchining tajribasi va amaliy topshiriqlari dizayn mahoratimni oshirishga yordam berdi. Endi o'zimni faoliyatimga ishonchim ko'proq his qilyapman. Rahmat!",
    image: sarahImg,
  },
  {
    id: 3,
    name: "Emily R",
    text: "Mobil ilovalarni ishlab chiqish kursi ajoyib bo'ldi! Bosqichma-bosqich qo'llanmalar va amaliy loyihalar menga tushunchalarni osongina tushunishimga yordam berdi. Endi men o'z ilovamni yaratyapman. Ajoyib kurs!",
    image: sarahImg,
  },
  {
    id: 4,
    name: "Michael K",
    text: "Men boshlovchi sifatida grafik dizayn kursiga yozildim va bu mukammal boshlanish nuqtasi edi. O'qituvchining ko'rsatmalari va fikr-mulohazalari mening dizayn qobiliyatimni sezilarli darajada yaxshiladi. Men bu kurs uchun minnatdorman!",
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
          <h2>Sharh topilmadi</h2>
          <Link to="/" className="testimonial-back-btn">
            Sharhlarga qaytish
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <Navbar/>
      <div className="testimonial-detail-wrapper container">
      <div className="testimonial-detail-card">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="testimonial-avatar"
        />
        <h2 className="testimonial-user-name">{testimonial.name}</h2>
        <p className="testimonial-full-text">{testimonial.text}</p>
        <Link to="/" className="testimonial-back-btn">
          ← Sharhlarga qaytish
        </Link>
      </div>
    </div>
    <Footer />
    </>
  
  );
}

export default TestimonialDetail;
