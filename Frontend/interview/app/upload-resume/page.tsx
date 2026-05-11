"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { resume, interview } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { FileUpload } from "@/components/file-upload";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function UploadResume() {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const response = await resume.upload(formData);
      setSkills(response.data.skills || []);
      setUploaded(true);
      toast.success("Resume uploaded and analyzed successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const startInterview = async () => {
    try {
      const res = await interview.start();
      router.push(`/interview/${res.data.sessionId}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to start interview");
    }
  };

  /* ── SUCCESS SCREEN ── */
  if (uploaded) {
    return (
      <div style={{
        minHeight: "calc(100vh - 90px)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 24px)",
        background: "transparent",
        boxSizing: "border-box",
      }}>
        <div style={{
          background: "rgba(20,20,20,0.92)",
          backdropFilter: "blur(12px)",
          borderRadius: 18,
          padding: "clamp(20px,4vw,32px) clamp(16px,4vw,28px)",
          width: "100%",
          maxWidth: 420,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}>
          {/* Icon */}
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            flexShrink: 0,
          }}>
            <CheckCircleIcon style={{ width: 26, height: 26, color: "#22c55e" }} />
          </div>

          <h2 style={{ fontSize: "clamp(17px,4vw,20px)", fontWeight: 700, color: "#ffffff", margin: "0 0 4px", textAlign: "center" }}>
            Resume Uploaded!
          </h2>
          <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 20px", textAlign: "center" }}>
            Skills detected from your resume
          </p>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "12px 14px",
              marginBottom: 20,
              maxHeight: 140,
              overflowY: "auto",
            }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
                {skills.map((skill, i) => (
                  <span key={i} style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#f3f4f6",
                    padding: "4px 11px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* CTA buttons — always visible */}
          <button
            onClick={startInterview}
            style={{
              width: "100%",
              background: "#ffffff",
              color: "#111111",
              border: "none",
              borderRadius: 12,
              padding: "12px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 10,
              flexShrink: 0,
              transition: "opacity 0.15s",
            }}
          >
            🚀 Start Interview
          </button>

          <button
            onClick={() => { setUploaded(false); setFile(null); setSkills([]); }}
            style={{
              width: "100%",
              background: "transparent",
              color: "#d1d5db",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "10px",
              fontSize: 13,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Upload Another Resume
          </button>
        </div>
      </div>
    );
  }

  /* ── MAIN SCREEN ── */
  return (
    <div style={{
      minHeight: "calc(100vh - 90px)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(16px, 3vw, 24px)",
      background: "transparent",
      boxSizing: "border-box",
      overflowX: "hidden",
    }}>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 16, flexShrink: 0 }}>
        <h1 style={{
          fontSize: "clamp(20px, 5vw, 28px)",
          fontWeight: 700,
          color: "#ffffff",
          margin: "0 0 6px",
          letterSpacing: "-0.5px",
        }}>
          Upload Your Resume
        </h1>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>
          PDF only · We'll extract your skills automatically
        </p>
      </div>

      {/* Card — responsive layout */}
      <div style={{
        background: "rgba(18,18,18,0.9)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 22,
        boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
        width: "100%",
        maxWidth: 950,
        overflow: "hidden",
        boxSizing: "border-box",

        // Responsive: side-by-side on desktop, stacked on mobile
        display: "grid",
        gridTemplateColumns: "clamp(240px, 35%, 320px) 1fr",
      }}
      className="upload-card"
      >
        <style>{`
          @media (max-width: 640px) {
            .upload-card {
              grid-template-columns: 1fr !important;
            }
            .upload-preview-panel {
              display: none !important;
            }
          }
        `}</style>

        {/* LEFT — form */}
        <div style={{
          padding: "clamp(16px,3vw,22px)",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          minHeight: "clamp(300px,50vh,460px)",
          boxSizing: "border-box",
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#9ca3af",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: 14,
            flexShrink: 0,
          }}>
            Select Resume
          </p>

          {/* File upload — takes available space */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <FileUpload
              onChange={(files) => {
                if (files.length > 0) {
                  const f = files[0];
                  if (f.type === "application/pdf") {
                    setFile(f);
                  } else {
                    toast.error("Please upload a PDF file");
                  }
                }
              }}
            />
          </div>

          {/* Selected file display */}
          {file && (
            <div style={{
              marginTop: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "9px 11px",
              display: "flex",
              alignItems: "center",
              gap: 9,
              flexShrink: 0,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#ef4444" }}>PDF</span>
              </div>
              <div style={{ overflow: "hidden", flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0, fontSize: 12, fontWeight: 600, color: "#ffffff",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{file.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            style={{
              marginTop: 14,
              background: !file || uploading ? "#2a2a2a" : "#ffffff",
              color: !file || uploading ? "#777" : "#111111",
              border: "none",
              borderRadius: 12,
              padding: "12px",
              fontSize: 14,
              fontWeight: 700,
              cursor: !file || uploading ? "not-allowed" : "pointer",
              flexShrink: 0,
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {uploading ? "Analyzing…" : "Upload & Analyze"}
          </button>

          <div style={{ textAlign: "center", marginTop: 10, flexShrink: 0 }}>
            <Link href="/dashboard" style={{ fontSize: 12, color: "#9ca3af", textDecoration: "none" }}>
              Skip for now
            </Link>
          </div>
        </div>

        {/* RIGHT — preview (hidden on mobile via CSS) */}
        <div
          className="upload-preview-panel"
          style={{
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "clamp(300px,50vh,460px)",
          }}
        >
          {file ? (
            <iframe
              src={URL.createObjectURL(file)}
              style={{ width: "100%", height: "100%", border: "none", background: "#fff", minHeight: "inherit" }}
            />
          ) : (
            <div style={{ textAlign: "center", padding: 20 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                border: "1.5px dashed rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>Resume preview appears here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}