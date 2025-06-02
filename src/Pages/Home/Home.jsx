import React, { useEffect, useState } from "react";
import "./Home.css";

// react router dom
import { Link } from "react-router-dom";

// Firebase
import { db } from "../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

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
import PaymentModal from "../../components/PaymentModal/PaymentModal";

const faqs = [
  {
    question: "Bir vaqtning o'zida bir nechta kurslarga yozilsa bo'ladimi?",
    answer:
      "Albatta! Siz bir vaqtning o'zida bir nechta kurslarga ro'yxatdan o'tishingiz va ularga qulay vaqtda kirishingiz mumkin.",
    link: { text: "Turli kurslarga ro'yxatdan o'tish jarayoni", url: "#" },
  },
  {
    question: "O'qituvchilardan qanday yordam kutishim mumkin?",
    answer:
      "O'qituvchilar kursga qarab elektron pochta, forumlar va jonli savol-javob sessiyalari orqali yordam beradi.",
  },
  {
    question:
      "Kurslar o'z-o'zidan o'tadimi yoki ularning aniq boshlanish va tugash sanalari bormi?",
    answer:
      "Ko'pgina kurslar o'z-o'zidan o'tadi, lekin ba'zilarida belgilangan boshlanish va tugash sanalari bilan rejalashtirilgan kogortalar mavjud.",
  },
  {
    question: "Kurslar uchun qandaydir shartlar bormi?",
    answer:
      "Ba'zi ilg'or kurslar kurs sahifasida aytib o'tilgan old shartlarga ega bo'lishi mumkin.",
  },
  {
    question: "Oflayn kirish uchun kurs materiallarini yuklab olsam bo'ladimi?",
    answer:
      "Ha, aksariyat kurslar oflayn foydalanish uchun materiallarni yuklab olish imkonini beradi.",
  },
];

function Home() {
  const [active, setActive] = useState("monthly");
  const [billingType, setBillingType] = useState("monthly");
  const [plans, setPlans] = useState([]);
  const [randomVideo, setRandomVideo] = useState("");
  const [coursesData, setCoursesData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
      title: "Moslashuvchan o'quv jadvali",
      description:
        "Kurs ishingizni mavjud majburiyatlaringiz va majburiyatlaringiz atrofida moslang.",
    },
    {
      id: "02",
      title: "Mutaxassis yo'riqnomasi",
      description:
        "Dizayn va ishlab chiqishda amaliy tajribaga ega bo'lgan soha mutaxassislaridan o'rganing.",
    },
    {
      id: "03",
      title: "Turli xil kurs takliflari",
      description:
        "Turli mavzularni o'z ichiga olgan dizayn va ishlab chiqish kurslarining keng doirasini o'rganing.",
    },
    {
      id: "04",
      title: "Yangilangan oʻquv dasturi",
      description:
        "Eng so'nggi tendentsiyalar va sanoat amaliyotlarini aks ettiruvchi zamonaviy tarkibga ega kurslarga kiring.",
    },
    {
      id: "05",
      title: "Amaliy loyihalar va topshiriqlar",
      description:
        "Potentsial ish beruvchilarga o'z mahoratingiz va qobiliyatingizni namoyish etadigan portfelni ishlab chiqing.",
    },
    {
      id: "06",
      title: "Interfaol ta'lim muhiti",
      description:
        "Tushunishni kuchaytirish uchun hamkasblar bilan hamkorlik qiling, fikr va mulohaza almashing.",
    },
  ];

  // const coursesData = [
  //   {
  //     id: 1,
  //     image: first,
  //     duration: "4 Weeks",
  //     level: "Beginner",
  //     author: "John Smith",
  //     title: "Web Design Fundamentals",
  //     description:
  //       "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
  //   },
  //   {
  //     id: 2,
  //     image: first,
  //     duration: "6 Weeks",
  //     level: "Intermediate",
  //     author: "Emily Johnson",
  //     title: "UI/UX Design",
  //     description:
  //       "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
  //   },
  //   {
  //     id: 3,
  //     image: first,
  //     duration: "8 Weeks",
  //     level: "Intermediate",
  //     author: "David Brown",
  //     title: "Mobile App Development",
  //     description:
  //       "Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin.",
  //   },
  //   {
  //     id: 4,
  //     image: first,
  //     duration: "10 Weeks",
  //     level: "Beginner",
  //     author: "Sarah Thompson",
  //     title: "Graphic Design for Beginners",
  //     description:
  //       "Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs for print and digital media.",
  //   },
  // ];

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
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const fetchedCourses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCoursesData(fetchedCourses);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchCourses();
  }, []);

  console.log(coursesData);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoUrls.length);
    setRandomVideo(videoUrls[randomIndex]);
  }, []); // sahifa yuklanganda 1 marta random tanlaydi

  const getYouTubeThumbnail = (url) => {
    try {
      const videoId = new URL(url).pathname.split("/").pop();
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } catch {
      return "";
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-hero-section">
        <section className="hero-section">
          <div className="highlight-box">
            <img src={lightning} alt="icon" className="hero-icon" />
            <span>
              Sizning ijodiy Potentsialingizni{" "}
              <strong className="highlight-text">Kashf qiling</strong>
            </span>
          </div>

          <h2 className="hero-subtitle">
            <span className="bold">
              Onlayn dizayn va ishlab chiqish kurslari
            </span>{" "}
            bilan{" "}
          </h2>

          <p className="hero-description">
            Sanoat mutaxassislaridan o'rganing va mahoratingizni oshiring.
          </p>

          <div className="hero-buttons">
            <Link to="/courses" className="btn-orange">
              Kurslarni o'rganing
            </Link>
            <Link to="/pricing" className="btn-outline">
              Narxlarni ko'rish
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
            <h2>Imtiyozlar</h2>
            <p>
              Sizning ta'lim tajribangiz moslashuvchan, zamonaviy va qiziqarli
              qilish uchun mo'ljallangan, biz bilan o'rganishning barcha
              afzalliklarini kashf qiling.
            </p>
          </div>
          <Link to="/benefits" className="view-all-btn">
            Hammasini ko‘rish
          </Link>
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
            <h2>Bizning Kurslarimiz</h2>
            <p>
              Onlayn kurs sahifamizga xush kelibsiz, u yerda siz o'z
              mahoratingizni oshirishingiz mumkin. Quyidagi kurslarni o'qing va
              o'rganish sayohatingiz uchun eng mos variantni toping.
            </p>
          </div>
          <Link to="/courses" className="view-all-btn">
            Hammasini ko‘rish
          </Link>
        </div>

        <div className="home-courses-grid">
          {coursesData.map((course) => {
            const videoUrls = course.videoURL || [];
            const getYouTubeThumbnail = (url) => {
              try {
                const videoId = new URL(url).pathname.split("/").pop();
                return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              } catch {
                return "";
              }
            };

            return (
              <div className="home-course-card" key={course.id}>
                {videoUrls.length > 0 && (
                  <img
                    src={getYouTubeThumbnail(videoUrls[0])}
                    alt="Course Preview"
                    className="home-course-thumbnail"
                  />
                )}
                <div className="home-course-info">
                  <div className="home-course-meta">
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                    <span>By {course.instructor}</span>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <Link to="/courses" className="get-now-btn">
                    Hoziroq oling
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="home-testimonal" id="our-testimonials">
        <div className="home-testimonal-header overal-title">
          <div className="info-head">
            <h2>Bizning sharhlarimiz</h2>
            <p>
              Mijoz kuzatilganidan juda xursand. Ishlab chiquvchilar uchun ham
              vaqt keldi Ishlab chiquvchiga bu moliyalashtirish kerak va
              Tomorrow eu sit dignissim lorem nibh et Ac qachon u velit
              fringilla feugiat senectus yilda yashagan bo'lishi kerak
            </p>
          </div>
          <Link to="/testimonials" className="view-all-btn">
            Hammasini ko‘rish
          </Link>
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
                  <Link to={`/testimonials/${item.id}`} className="read-btn">
                    To'liq sharhni o'qing
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="home-pricing">
        <div className="home-pricing-header overal-title">
          <div className="info-head">
            <h2>Bizning Narximiz</h2>
            <p>
              EduLearnning Narxlar rejasi sahifasiga xush kelibsiz, biz ikkita
              taklif qilamiz Ehtiyojlaringizni qondirish uchun keng qamrovli
              variantlar: Bepul va Pro.
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
                Oylik
              </button>
              <button
                className={`toggle-option ${
                  billingType === "yearly" ? "active" : ""
                }`}
                onClick={() => setBillingType("yearly")}
              >
                Yillik
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
              onSelect={() => setSelectedPlan(plan)}
            />
          ))}
        </div>
        {selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        )}

        <div className="faq-section" id="faq">
          <div className="faq-wrapper">
            <div className="faq-left">
              <h2>Tez-tez so'raladigan savollar</h2>
              <p>
                Hali ham savollaringiz bormi? orqali jamoamiz bilan bog'laning
                <br />
                <strong>support@skillbridge.com</strong>
              </p>
              <button className="all-faqs-btn">
                Barcha tez-tez so'raladigan savollarni ko'ring
              </button>
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
