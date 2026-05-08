"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    question: "Where is Nusa Lembongan located?",
    answer:
      "Nusa Lembongan is a small island southeast of Bali, Indonesia. It is accessible by fast boat from Sanur Harbor.",
  },
  {
    question: "What is the best time to visit?",
    answer:
      "The dry season from April to October is usually the best time for snorkeling, tours, and clear island views.",
  },
  {
    question: "Do I need to book in advance?",
    answer:
      "Yes, advance booking is recommended, especially in peak season, to secure the time slot and activity you want.",
  },
  {
    question: "What should I bring for a day trip?",
    answer:
      "Bring swimwear, sunscreen, a hat, sunglasses, cash, and a change of clothes if you plan to snorkel or ride a scooter.",
  },
  {
    question: "Is the island family-friendly?",
    answer:
      "Yes. Many of our activities are suitable for families, and the island has a relaxed pace that works well for kids.",
  },
  {
    question: "Are there ATMs on the island?",
    answer:
      "There are several ATMs on the island, but cash can run low. It is safer to bring some backup cash from Bali.",
  },
];

export default function HomePage() {
  const [serviceType, setServiceType] = useState("Snorkeling Trip");
  const [travelDate, setTravelDate] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Noto+Serif:wght@600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: 'Plus Jakarta Sans', sans-serif; }

        .font-serif { font-family: 'Noto Serif', serif; }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .mat-fill {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .shadow-luxury {
          box-shadow: 0 20px 40px -15px rgba(0, 94, 151, 0.08);
        }

        .card-hover {
          transition: transform 0.3s ease;
        }
        .card-hover:hover {
          transform: scale(1.02);
        }
        .card-hover:hover .card-img {
          transform: scale(1.1);
        }
        .card-img {
          transition: transform 0.5s ease;
        }

        .btn-hover {
          transition: transform 0.2s ease;
        }
        .btn-hover:hover { transform: scale(1.05); }
        .btn-hover:active { transform: scale(0.95); }

        .icon-hover {
          transition: transform 0.2s ease;
        }
        .icon-hover:hover { transform: scale(1.05); }

        select {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          color: #1a1c1c;
          cursor: pointer;
        }

        input[type="date"] {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          color: #1a1c1c;
        }

        input[type="email"] {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          color: #1a1c1c;
        }
      `}</style>


      <section
        style={{
          position: "relative",
          height: 921,
          minHeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwb0977clGiGOqPpsfLK7NEWuSu8k-EmGt9PVm5NROQzR3P8aLxp0pZjCOV4mDQF0QsGG0dnNYeIJkRKv3nX2A0mnhODd-coSemfvNI1H7QW19T0kGY7p8eG7JDXSr-gy3tRZV81mVQZd0ykrHMyCVqzsykUuCqQelBKl4cRZaQEDN2VbejpoPz6T4M31ITSX3RWlnFFfzmEi9WLQotQBoFsVwq1Ng7sewh8WFayuGApdz7Oi0RaPPKoTulDYypBOY3SPm31-ZqQ"
            alt="Nusa Lembongan turquoise waters"
            fill
            style={{ objectFit: "cover" }}
            priority
            unoptimized
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent, rgba(249,249,249,0.2), #f9f9f9)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: 896,
            padding: "0 24px",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#005e97",
              marginBottom: 12,
            }}
          >
            ISLAND ADVENTURES
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#1a1c1c",
              marginBottom: 24,
            }}
          >
            Explore Nusa Lembongan with the Local Experts
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "#404751",
              marginBottom: 48,
              maxWidth: 672,
              margin: "0 auto 48px",
            }}
          >
            Discover hidden turquoise lagoons, pristine coral reefs, and coastal paths that only the locals know.
            Experience the authentic spirit of the island.
          </p>
          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/activities"
              className="btn-hover shadow-luxury"
              style={{
                background: "#0077be",
                color: "#f7f9ff",
                padding: "24px 48px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              View All Packages
            </Link>
            <Link
              href="/contact"
              className="btn-hover"
              style={{
                background: "rgba(249,249,249,0.9)",
                backdropFilter: "blur(4px)",
                border: "1px solid #005e97",
                color: "#005e97",
                padding: "24px 48px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Rent a Scooter
            </Link>
          </div>
        </div>
      </section>

      <div
        style={{
          maxWidth: 1280,
          margin: "-48px auto 0",
          padding: "0 24px",
          position: "relative",
          zIndex: 20,
        }}
      >
        <div
          className="shadow-luxury"
          style={{
            background: "#f9f9f9",
            padding: 24,
            borderRadius: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#404751",
                marginBottom: 4,
              }}
            >
              Service Type
            </label>
            <div
              style={{
                background: "#f3f3f4",
                padding: 12,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span className="material-symbols-outlined" style={{ color: "#005e97" }}>directions_boat</span>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option>Snorkeling Trip</option>
                <option>Scooter Rental</option>
                <option>Private Island Tour</option>
              </select>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#404751",
                marginBottom: 4,
              }}
            >
              Travel Date
            </label>
            <div
              style={{
                background: "#f3f3f4",
                padding: 12,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span className="material-symbols-outlined" style={{ color: "#005e97" }}>calendar_today</span>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>
          </div>

          <button
            className="btn-hover"
            style={{
              background: "#005e97",
              color: "#ffffff",
              padding: "0 48px",
              height: 52,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Check Availability
          </button>
        </div>
      </div>

      <section
        style={{
          padding: "80px 0",
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
          }}
        >
          <div style={{ maxWidth: 576 }}>
            <h2
              className="font-serif"
              style={{
                fontSize: 36,
                fontWeight: 600,
                lineHeight: 1.3,
                color: "#1a1c1c",
                marginBottom: 12,
              }}
            >
              Featured Experiences
            </h2>
            <p style={{ fontSize: 16, color: "#404751" }}>
              Carefully curated adventures led by residents who have lived on these shores for generations.
            </p>
          </div>
          <Link
            href="/activities"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#005e97",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
            }}
          >
            View More{" "}
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYszGLBYt5QRoFTC5XOl-zb5VqoD4mvhMSP_wAiNJz43NU3T98xxGebnanugqPvSfcF-oEHEQr6MFXADLRIaXiaaOWXT3qOMBu2vIn86kYy-biV4P3RZQ-vIjwBRVJEUfMWz5CY7MiufwrqDKl3rhMSu3bxID5A6p4OgoOYC29UzOxerJG1FIL6rpMUIJfZDQKFmS5zlNzvg_4ZW5rK3IOFu35ytUU_kksU_UIeJjNa-0QgaSuRzqjMu21K4iEhCUsUeA0w2WoxQ",
              badge: "BEST SELLER",
              rating: "4.9 (120+ Reviews)",
              title: "Manta Ray Snorkeling",
              desc: "Swim with the majestic Manta Rays in their natural habitat at Secret Point.",
              price: "$45",
              unit: "/person",
            },
            {
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPhTJDin_oGWHH6rWm5yFfGk_iLpwDVT_3Iaj1ZcpN_gEn8cLqt9ryeWMkLxsYvxpw2U0I6tMH5dbZa_WfoDHJ794AjeuTG59D7QeFH9o_-hYUhVHf8ivIPsoocQOHwrNb60B1ShjN8OjSm7ETqUVLk6_7zlorbiRpeVGmaA_l87NPUm8AYBOJU01ZGVD01FGFvxWP5KtEKC28pYXasMIJAeBtplcrtdLaNsXacHDNg6n-KKTaSxRP77qsqSWgttKHPku887wiIQ",
              badge: "INSTANT CONFIRMATION",
              rating: "4.8 (85 Reviews)",
              title: "Premium Scooter Rental",
              desc: "The ultimate freedom to explore. High-quality scooters with helmets and island map included.",
              price: "$12",
              unit: "/day",
            },
            {
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVI4weK4nzLT2F5nBQZ3DVdKrCVCVaP0usBZmzPOBKbF7oHgFOuflmgkXWV6dQEIDN4QA-3kjkGXS5k6xoZBWC54fqSJgm2bqV7SpBLByuFXxh3jrRfjSO59gLkJN1DjFipf6MuiC7JNImnxhximeVuTiQxm7ZkwUjv3Qwh_VAvQYQBnswgq0MIpVjoOhgf5LIjX8qkkPM1TAHebTR1B40o50st1KaSDW_R7ESvjLVobWVgCzvk0NChQYlcnTDoaf8XCyK2N75gQ",
              badge: null,
              rating: "5.0 (64 Reviews)",
              title: "Full Island Discovery",
              desc: "Private guided tour including Devil's Tears, Dream Beach, and the Mangrove Forest.",
              price: "$65",
              unit: "/group",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="card-hover shadow-luxury"
              style={{
                background: "#f9f9f9",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="card-img"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                {card.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(94,246,233,0.2)",
                      backdropFilter: "blur(8px)",
                      color: "#006f66",
                      padding: "4px 12px",
                      borderRadius: 9999,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {card.badge}
                  </div>
                )}
              </div>
              <div style={{ padding: 24, background: "#f9f9f9" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    color: "#005e97",
                    marginBottom: 4,
                  }}
                >
                  <span className="material-symbols-outlined mat-fill" style={{ fontSize: 18 }}>star</span>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {card.rating}
                  </span>
                </div>
                <h3
                  className="font-serif"
                  style={{ fontSize: 24, fontWeight: 600, color: "#1a1c1c", marginBottom: 4 }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: 16, color: "#404751", marginBottom: 24 }}>{card.desc}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #e2e2e2",
                    paddingTop: 24,
                  }}
                >
                  <div className="font-serif" style={{ fontSize: 24, fontWeight: 600, color: "#005e97" }}>
                    {card.price}
                    <span style={{ fontSize: 16, color: "#404751", fontWeight: 400, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {card.unit}
                    </span>
                  </div>
                  <button
                    className="btn-hover"
                    style={{
                      background: "#0077be",
                      color: "#f7f9ff",
                      padding: 12,
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#f3f3f4", padding: "80px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="font-serif" style={{ fontSize: 36, fontWeight: 600, color: "#1a1c1c", marginBottom: 12 }}>
              Guest Testimonials
            </h2>
            <p style={{ fontSize: 16, color: "#404751" }}>
              Real stories from travelers who explored the island with us.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                stars: 5,
                quote:
                  '"The snorkeling tour was the highlight of our trip. Wayan was such a knowledgeable guide and made us feel safe while swimming with the Mantas. Unforgettable!"',
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8QndNa43gr5jL0IU00lNSxndmPV7e_Xjcvje1nyCly5Mvi2JoLyX2x_mJHB_1jljFxw9jOsiBEDPzhoWH9Sqg_02Fg0QVzLyysx12zmW4k_dz3saVSNPE-OF4FMpIQfqeK3_TeauMSSgn1RfIKlggjfUmswLvzBnY3KHZj-aF18OTMAWkuuFcLA3jHgBjJqAUP4blJcuJiWqzHupv8pKzDickP375BDOqGLL9Af0fm_h0GlnJm98Q_Oi2TNQjfJ01pwJykWslwA",
                name: "Sarah Mitchell",
                country: "Australia",
              },
              {
                stars: 5,
                quote:
                  '"Super easy scooter rental process. The bike was in great condition and we loved the local map they provided. Definitely the best way to see the island."',
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM2fHqGdJHS9F2aq-ubXLouIY315FvFHc_54feuWOeVyCjeUVuNlpBcqBncL8S28aUoGsTV-gMAAYqvqhE7WT3OJ5A7GUXlvWTT6KsP3BzUKsUW8TcZXpvkfGUPBiQPZucffnCQ88Fq67KsyDD5FNSHLdXes50A7FHq5ePOLWUvDUoVfopm9gjtYiaEzfBdaskVHBaNEI1pqX7BUUqjRHndgTCrb8qeRax8PUG_CInGOkAvLPULv4zNXqkObYr-bhOqvrNvldf-Q",
                name: "James Wilson",
                country: "UK",
              },
              {
                stars: 4.5,
                quote:
                  '"The island tour showed us spots we never would have found on our own. The mangrove forest boat ride was so peaceful. Local experts indeed!"',
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ5rU3cWfJt-Ej4WnKZ4_y5rk_OqDOHsyp2eps2Un0ljpBBWcIVOwzpoflatKCrB30VfLpak3M_WpgTKgrKUIfdL7ukzVJuhLW8RWXIPu3o936dZ3qYghmAjijXKTUjsDPbVHyinI805hPgCUfWTyQgEYh7ypipgmWfU3wuao31Rdsln2zzvISF_kRxV2c9s8i-UoPmEtpI1r11mjfH0TT7eVUBTJg4UEqk6yGAtHFD-g_VttIq4v9Vr2lSNhGK-462EpGjYx6-A",
                name: "Elena Rodriguez",
                country: "Spain",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="shadow-luxury"
                style={{
                  background: "#f9f9f9",
                  padding: 48,
                  borderRadius: 12,
                }}
              >
                <div style={{ display: "flex", gap: 4, color: "#005e97", marginBottom: 24 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 18,
                        fontVariationSettings: s <= Math.floor(t.stars) ? "'FILL' 1" : "'FILL' 0.5",
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 16, color: "#1a1c1c", fontStyle: "italic", marginBottom: 48 }}>
                  {t.quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      overflow: "hidden",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <Image src={t.img} alt={t.name} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1c1c" }}>{t.name}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#404751" }}>
                      {t.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        style={{
          background: "#f9f9f9",
          padding: "80px 0",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                display: "inline-block",
                marginBottom: 12,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#005e97",
              }}
            >
              Common Questions
            </span>
            <h2 className="font-serif" style={{ fontSize: 36, fontWeight: 600, color: "#1a1c1c", marginBottom: 12 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 16, color: "#404751", maxWidth: 720, margin: "0 auto" }}>
              Everything you need to know before booking your Lembongan adventure.
            </p>
          </div>

          <div style={{ maxWidth: 896, margin: "0 auto", display: "grid", gap: 16 }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="shadow-luxury"
                  style={{
                    background: isOpen ? "#ffffff" : "#f3f3f4",
                    border: isOpen ? "1px solid rgba(0,94,151,0.18)" : "1px solid #e2e2e2",
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: "100%",
                      padding: 24,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: isOpen ? "#005e97" : "#1a1c1c",
                      }}
                    >
                      {faq.question}
                    </span>
                    <span className="material-symbols-outlined" style={{ color: "#005e97" }}>
                      {isOpen ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  <div
                    style={{
                      maxHeight: isOpen ? 160 : 0,
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div style={{ padding: "0 24px 24px", color: "#404751", lineHeight: 1.7 }}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
