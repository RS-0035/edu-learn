import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./AboutUS.css";
import toj from "../../assets/png/toj.png";
import medal from "../../assets/png/medal.png";
import comic from "../../assets/png/comic.png";
import shield from "../../assets/png/shield.png";
import bag from "../../assets/png/bag.png";
import book from "../../assets/png/book.png";
import puzzle from "../../assets/png/puzzle.png";
import lamp from "../../assets/png/lamp.png";

function AboutUs() {
  const achievements = [
    {
      icon: toj,
      title: "Minglab odamlar tomonidan ishoniladi",
      description:
        "Biz minglab talabalarga muvaffaqiyatli xizmat qilib, ularning potentsialini ochishga va martaba maqsadlariga erishishga yordam berdik.",
    },
    {
      icon: medal,
      title: "Mukofotga sazovor bo'lgan kurslar",
      description:
        "Bizning kurslarimiz sifati, mazmunining chuqurligi va samarali o'qitish metodologiyasi uchun sanoatda e'tirof va maqtovlarga sazovor bo'ldi.",
    },
    {
      icon: comic,
      title: "Talabalarning ijobiy fikr-mulohazalari",
      description:
        "Biz kurs materiallarining amaliyligi va dolzarbligini qadrlaydigan talabalarimizdan olgan ijobiy fikr-mulohazalar bilan faxrlanamiz.",
    },
    {
      icon: shield,
      title: "Sanoat hamkorliklari",
      description:
        "Biz soha yetakchilari bilan mustahkam hamkorlik aloqalarini o‘rnatdik, bu esa o‘quvchilarimizga eng so‘nggi vositalar va texnologiyalardan foydalanish imkoniyatini taqdim etish imkonini berdi.",
    },
  ];
  const goals = [
    {
      icon: bag,
      title: "Amaliy ko'nikmalarni taqdim eting",
      description:
        "Biz hozirgi sanoat talablariga mos keladigan amaliy ko'nikmalarni berishga e'tibor qaratamiz. Bizning kurslarimiz o'quvchilarni o'zlari tanlagan sohada ustunlik qilishlari uchun zarur bo'lgan bilim va vositalar bilan jihozlash uchun mo'ljallangan.",
    },
    {
      icon: book,
      title: "Tezroq ijodiy muammolarni hal qilish",
      description:
        "Biz ijodiy fikrlash va muammolarni hal qilish qobiliyatlarini rag'batlantiramiz, bu esa o'quvchilarimizga haqiqiy dunyo muammolarini ishonch va innovatsiya bilan hal qilish imkonini beradi.",
    },
    {
      icon: puzzle,
      title: "Hamkorlik va hamjamiyatni rag'batlantirish",
      description:
        "Biz hamkorlik va tengdoshlarni o'rganish kuchiga ishonamiz. Bizning platformamiz o‘quvchilar bog‘lanishi, tushunchalarini baham ko‘rishi va birga o‘sishi mumkin bo‘lgan qo‘llab-quvvatlovchi va inklyuziv hamjamiyatni rivojlantiradi.",
    },
    {
      icon: lamp,
      title: "Egri chiziqdan oldinda turing",
      description:
        "Raqamli landshaft doimo rivojlanib bormoqda va biz sanoat tendentsiyalarining oldingi saflarida qolishga intilamiz. Talabalarimizning so'nggi bilim va ko'nikmalarga ega bo'lishini ta'minlash uchun biz kurs mazmunini muntazam yangilab boramiz.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="about-us-section container" id="company">
        <div className="about-us-intro">
          <div className="about-us-left">
            <h2>EduLearn</h2>
          </div>
          <div className="about-us-right">
            <p>
            Bizning platformamizga xush kelibsiz, u erda biz imkoniyatlarni kuchaytirishga ishtiyoqimiz bor
              dizayn va rivojlanish dunyosini o'zlashtirish uchun shaxslar. Biz
              o'quvchilarni jihozlash uchun mo'ljallangan keng doiradagi onlayn kurslarni taklif qiladi
              muvaffaqiyatga erishish uchun zarur bo'lgan ko'nikma va bilimlarga ega
              doimiy rivojlanayotgan raqamli landshaft.
            </p>
          </div>
        </div>
      </div>
      <div className="ag-section-wrapper container">
        <section className="ag-achievements-section" id="achievements">
          <h2 className="ag-section-title">Yutuqlar</h2>
          <p className="ag-section-subtitle">
          Bizning mukammallikka bo'lgan sodiqligimiz bizni sezilarli yutuqlarga erishdi
            sayohatimiz davomidagi muhim bosqichlar. Mana bizning e'tiborga loyiqlarimiz
            yutuqlar.
          </p>
          <div className="ag-card-container">
            {achievements.map((item, idx) => (
              <div className="ag-card" key={idx}>
                <div className="ag-card-icon">
                  <img width={56} src={item.icon} alt="Image" />
                </div>
                <h3 className="ag-card-title">{item.title}</h3>
                <p className="ag-card-text">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ag-goals-section" id="goals">
          <h2 className="ag-section-title">Bizning Maqsadlarimiz</h2>
          <p className="ag-section-subtitle">
          SkillBridge-da bizning maqsadimiz barcha odamlarning imkoniyatlarini kengaytirishdir
            dizayn va rivojlanish dunyosida rivojlanish uchun fon. Biz
            ta'lim qulay va o'zgaruvchan bo'lishi kerak, deb hisoblayman,
            o'quvchilarga o'z ehtiroslarini ta'qib qilish va mazmunli qilish imkonini beradi
            ta'sir. Ehtiyotkorlik bilan tayyorlangan kurslarimiz orqali biz maqsad qilamiz
          </p>
          <div className="ag-card-container">
            {goals.map((item, idx) => (
              <div className="ag-card" key={idx}>
                <div className="ag-card-icon">
                  <img width={56} src={item.icon} alt="Image" />
                </div>
                <h3 className="ag-card-title">{item.title}</h3>
                <p className="ag-card-text">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
export default AboutUs;
