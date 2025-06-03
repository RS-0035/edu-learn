import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./BenefitsPage.css";

import arrow from "../../assets/png/arrow.png";

const benefits = [
  {
    number: "01",
    title: "Moslashuvchan o'quv jadvali",
    description:
      "Kurs ishingizni mavjud majburiyatlaringiz va majburiyatlaringiz atrofida moslang.",
  },
  {
    number: "02",
    title: "Mutaxassis yo'riqnomasi",
    description:
      "Dizayn va ishlab chiqishda amaliy tajribaga ega bo'lgan soha mutaxassislaridan o'rganing.",
  },
  {
    number: "03",
    title: "Turli xil kurs takliflari",
    description:
      "Turli mavzularni o'z ichiga olgan dizayn va ishlab chiqish kurslarining keng doirasini o'rganing.",
  },
  {
    number: "04",
    title: "Yangilangan oʻquv dasturi",
    description:
      "Eng so'nggi tendentsiyalar va sanoat amaliyotlarini aks ettiruvchi zamonaviy tarkibga ega kurslarga kiring.",
  },
  {
    number: "05",
    title: "Amaliy loyihalar va topshiriqlar",
    description:
      "Potentsial ish beruvchilarga o'z mahoratingiz va qobiliyatingizni namoyish etadigan portfelni ishlab chiqing.",
  },
  {
    number: "06",
    title: "Interfaol ta'lim muhiti",
    description:
      "Tushunishni kuchaytirish uchun hamkasblar bilan hamkorlik qiling, fikr va mulohaza almashing.",
  },
];

const BenefitsPage = () => {
  return (
    <>
      <Navbar />

      <div className="benefits-head-top container">
        <div className="benefits-container-header">
          <div className="benefits-top-left">
            <h2 className="benefits-heading">Barcha imtiyozlar</h2>
          </div>
          <div className="benefits-top-right">
            <p className="benefits-subheading">
              Sizning ta'lim tajribangiz moslashuvchan, zamonaviy va qiziqarli
              qilish uchun mo'ljallangan, biz bilan o'rganishning barcha
              afzalliklarini kashf qiling
            </p>
          </div>
        </div>
      </div>

      <div className="benefits-wrapper">
        <div className="benefits-list">
          {benefits.map((item, index) => (
            <div key={index} className="benefit-item">
              <div className="benefit-index">{item.number}</div>
              <h3 className="benefit-name">{item.title}</h3>
              <p className="benefit-detail">{item.description}</p>
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
      </div>

      <Footer />
    </>
  );
};

export default BenefitsPage;
