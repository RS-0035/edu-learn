import React, { useEffect, useState } from "react";
import "./Pricing.css";

import { Circles } from "react-loader-spinner";

// Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PlanCard from "../../components/PlanCard/PlanCard";
import FAQItems from "../../components/FaqItems/FaqItems";

// Firebase
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import Skeleton from "../../components/Skeleton/Skeleton";

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

function Pricing() {
  const [billingType, setBillingType] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "pricingPlans", billingType);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlans(docSnap.data().plans);
        } else {
          console.warn("No pricing data found for:", billingType);
        }
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      } finally {
        setLoading(false); // Yuklashni tugatish
      }
    };

    fetchPlans();
  }, [billingType]);

  return (
    <div>
      <Navbar />

      <section className="pricing-hero-section container">
        <div className="pricing-intro">
          <div className="pricing-left">
            <h2>Bizning Narxlarimiz</h2>
          </div>
          <div className="pricing-right">
            <p>
              EduLearnning Narxlar rejasi sahifasiga xush kelibsiz, biz ikkita
              taklif qilamiz Ehtiyojlaringizni qondirish uchun keng qamrovli
              variantlar: Bepul va Pro. Biz uchun moslashuvchan va arzon
              narxlardagi variantlarni taqdim etishga ishonamiz bizning
              xizmatlarimiz. Siz o'zingizni yaxshilashga intilayotgan shaxs
              bo'lasizmi malaka oshirish yoki kasbiy rivojlanish yechimlarini
              qidirayotgan biznes, bizda sizga mos reja bor. Bizning narxlash
              variantlarini quyida ko'rib chiqing va sizning talablaringizga eng
              mos keladiganini tanlang.
            </p>
          </div>
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

        <div className="pricing-container">
          {loading ? ( // Ma'lumotlar yuklanayotgan bo'lsa, skeleton ko'rsatiladi
            <div className="loader-container">
              <Circles
                height="100"
                width="100"
                color="#00BFFF"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            plans.map((plan, index) => (
              <PlanCard
                key={index}
                title={plan.title}
                price={plan.price}
                features={plan.features}
                onSelect={() => setSelectedPlan(plan)}
              />
            ))
          )}
        </div>
        {selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        )}

        <div className="faq-section">
          <div className="faq-wrapper">
            <div className="faq-left">
              <h2>Tez-tez so'raladigan savollar</h2>
              <p>
              Hali ham savollaringiz bormi? Bizning jamoamiz bilan bog'laning<br />
                <strong>support@skillbridge.com</strong>
              </p>
              <button className="all-faqs-btn">Barcha tez-tez so'raladigan savollarni ko'ring</button>
            </div>
            <div className="faq-right">
              {faqs.map((faq, index) => (
                <FAQItems key={index} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Pricing;
