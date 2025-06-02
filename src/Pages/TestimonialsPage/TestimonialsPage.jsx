import React from "react";

import "./TestimonialsPage.css";

// components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// img
import sarahImg from "../../assets/png/sarah.png";

function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah L",
      text: "Veb-dizayn kursi men uchun mustahkam poydevor yaratdi. O'qituvchilar bilimdon va qo'llab-quvvatladilar va interaktiv o'quv muhiti qiziqarli edi. Men buni juda tavsiya qilaman!",
      image: sarahImg,
    },
    {
      id: 2,
      name: "Jason M",
      text: "UI/UX dizayn kursi mening kutganimdan oshib ketdi. O'qituvchining tajribasi va amaliy topshiriqlari dizayn mahoratimni oshirishga yordam berdi. Endi o'zimni faoliyatimga ishonchim ko'proq his qilyapman. rahmat!",
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
  return (
    <>
      <Navbar />
      <div className="testimonials-wrapper">
        <div className="testimonials-intro">
          <div className="testimonials-left">
            <h2>Hamma sharhlar</h2>
          </div>
          <div className="testimonials-right">
            <p>
              Onlayn kurs sahifamizga xush kelibsiz, u yerda siz o'z
              mahoratingizni oshirishingiz mumkin dizayn va ishlab chiqish
              ko'nikmalari. Bizdan ehtiyotkorlik bilan tanlang sizga taqdim
              etish uchun mo'ljallangan 10 ta kurslarning tanlangan tanlovi keng
              qamrovli bilim va amaliy tajriba. ni o'rganing Quyidagi kurslarni
              o'qing va o'rganish sayohatingiz uchun eng mos variantni toping.
            </p>
          </div>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <p>{t.text}</p>
              <div className="testimonial-footer">
                <div className="testimonial-user">
                  <img src={t.image} alt={t.name} className="user-img" />
                  <strong>{t.name}</strong>
                </div>
                <button className="read-btn">To'liq sharhni o'qing</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TestimonialsPage;
