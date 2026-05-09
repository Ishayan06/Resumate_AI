"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const csTopics = [
  {
    title: "Operating System",
    desc: "Processes, threads, CPU scheduling, deadlocks, memory management, paging, segmentation, and synchronization concepts for system-level understanding.",
    icon: "💻",
    link: "https://www.geeksforgeeks.org/operating-systems/",
    color: "#34d399",
    route: "/roadmaps/core-cs/os",
  },
  {
    title: "DBMS",
    desc: "ER diagrams, normalization, SQL queries, transactions, ACID properties, indexing, and database design fundamentals.",
    icon: "🗄️",
    link: "https://www.geeksforgeeks.org/dbms/",
    color: "#60a5fa",
    route: "/roadmaps/core-cs/dbms",
  },
  {
    title: "OOPS",
    desc: "Core OOP principles like classes, objects, inheritance, polymorphism, encapsulation, abstraction, and SOLID design principles.",
    icon: "🧩",
    link: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
    color: "#a78bfa",
    route: "/roadmaps/core-cs/oops",
  },
  {
    title: "System Design",
    desc: "Scalability, load balancing, caching, microservices, databases, CAP theorem, and designing large-scale distributed systems.",
    icon: "🏗️",
    link: "https://www.geeksforgeeks.org/system-design-tutorial/",
    color: "#f472b6",
    route: "/roadmaps/core-cs/system-design",
  },
  {
    title: "SQL",
    desc: "Writing queries, joins, grouping, subqueries, aggregation functions, indexing, and database operations for efficient data handling.",
    icon: "📊",
    link: "https://www.geeksforgeeks.org/sql-tutorial/",
    color: "#f59e0b",
    route: "/roadmaps/core-cs/sql",
  },
  {
    title: "Computer Networks",
    desc: "OSI model, TCP/IP, routing, switching, DNS, HTTP/HTTPS protocols, and fundamentals of data communication systems.",
    icon: "🌐",
    link: "https://www.geeksforgeeks.org/computer-network-tutorials/",
    color: "#38bdf8",
    route: "/roadmaps/core-cs/cn",
  },
];

export default function CoreCSPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,-30px) scale(1.05); }
        }

        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-50px,40px) scale(0.95); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cs-page * { box-sizing: border-box; }

        .cs-card {
          animation: fadeUp .45s ease both;
          transition: all .3s cubic-bezier(.23,1,.32,1);
          cursor: pointer;
        }

        .cs-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 50px rgba(0,0,0,.35);
        }

        .cs-btn {
          transition: all .25s ease;
          cursor: pointer;
        }

        .cs-btn:hover {
          transform: scale(1.04);
        }
      `}</style>

      <div
        className="cs-page"
        style={{
          minHeight: "100vh",
          background: "rgba(7,7,15,0.96)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {/* Orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div
            style={{
              position: "absolute",
              top: "-15%",
              left: "-10%",
              width: "55vw",
              height: "55vw",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(52,211,153,.14) 0%,transparent 70%)",
              animation: "orb1 14s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-10%",
              right: "-10%",
              width: "50vw",
              height: "50vw",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(96,165,250,.12) 0%,transparent 70%)",
              animation: "orb2 16s ease-in-out infinite",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "56px 24px 80px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "54px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "#34d399",
                marginBottom: "14px",
              }}
            >
              <div style={{ width: "22px", height: "1px", background: "#34d399" }} />
              Core CS Subjects
            </div>

            <h1
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(40px,6vw,72px)",
                fontWeight: 800,
                lineHeight: 1.05,
                margin: "0 0 16px",
              }}
            >
              Core CS
              <br />
              <span
                style={{
                  background: "linear-gradient(130deg,#34d399 0%,#60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Master Roadmap
              </span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,.42)",
                maxWidth: "700px",
                lineHeight: 1.8,
                fontSize: "15px",
              }}
            >
              Master core computer science subjects for placements and interviews with structured, concise and industry-relevant learning paths.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", marginTop: "30px" }}>
              {[
                ["6", "SUBJECTS"],
                ["100%", "FREE"],
                ["PLACEMENTS", "FOCUSED"],
                ["🔥", "ESSENTIAL"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "24px", fontWeight: 800 }}>
                    {n}
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,.32)", marginTop: "4px" }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: "20px",
            }}
          >
            {csTopics.map((topic, i) => (
              <div
                key={topic.title}
                className="cs-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  padding: "28px",
                  background: "rgba(255,255,255,.035)",
                  border:
                    hovered === i
                      ? `1px solid ${topic.color}55`
                      : "1px solid rgba(255,255,255,.08)",
                  backdropFilter: "blur(14px)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-30%",
                    right: "-10%",
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle,${topic.color}22 0%,transparent 70%)`,
                  }}
                />

                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "16px",
                    background: `${topic.color}22`,
                    border: `1px solid ${topic.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "26px",
                    marginBottom: "18px",
                  }}
                >
                  {topic.icon}
                </div>

                <h2
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "20px",
                    fontWeight: 800,
                    marginBottom: "10px",
                  }}
                >
                  {topic.title}
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,.42)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    marginBottom: "22px",
                  }}
                >
                  {topic.desc}
                </p>

                <button
                  className="cs-btn"
                  onClick={() => router.push(topic.route)}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "14px",
                    border: `1px solid ${topic.color}55`,
                    background: `${topic.color}18`,
                    color: topic.color,
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Start Learning →
                </button>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: "70px",
              borderRadius: "28px",
              border: "1px solid rgba(52,211,153,.16)",
              background:
                "linear-gradient(135deg,rgba(52,211,153,.08),rgba(96,165,250,.06))",
              padding: "56px 34px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(28px,4vw,46px)",
                fontWeight: 800,
                marginBottom: "14px",
              }}
            >
              Crack Core CS in Placements 🚀
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,.45)",
                maxWidth: "600px",
                margin: "0 auto 26px",
                lineHeight: 1.8,
              }}
            >
              Focus on concepts, revise regularly and practice interview questions daily.
            </p>

            <button
              className="cs-btn"
              onClick={() => router.push("/roadmaps")}
              style={{
                padding: "14px 34px",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(130deg,#34d399,#60a5fa)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              ← Back to Roadmaps
            </button>
          </div>
        </div>
      </div>
    </>
  );
}