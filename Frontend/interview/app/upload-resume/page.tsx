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

      const sessionId = res.data.sessionId;

      router.push(`/interview/${sessionId}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Failed to start interview"
      );
    }
  };

  // ================= SUCCESS SCREEN =================
  if (uploaded) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "transparent",
        }}
      >
        <div
          style={{
            background: "rgba(20,20,20,0.92)",
            backdropFilter: "blur(12px)",
            borderRadius: 18,
            padding: "32px 28px",
            width: "100%",
            maxWidth: 420,
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <CheckCircleIcon
              style={{
                width: 26,
                height: 26,
                color: "#22c55e",
              }}
            />
          </div>

          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 4px",
            }}
          >
            Resume Uploaded!
          </h2>

          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              margin: "0 0 20px",
            }}
          >
            Skills detected from your resume
          </p>

          {skills.length > 0 && (
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "14px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "#f3f4f6",
                      padding: "5px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startInterview}
            style={{
              width: "100%",
              background: "#ffffff",
              color: "#111111",
              border: "none",
              borderRadius: 12,
              padding: "11px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 10,
            }}
          >
            🚀 Start Interview
          </button>

          <button
            onClick={() => {
              setUploaded(false);
              setFile(null);
              setSkills([]);
            }}
            style={{
              width: "100%",
              background: "transparent",
              color: "#d1d5db",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "10px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Upload Another Resume
          </button>
        </div>
      </div>
    );
  }

  // ================= MAIN SCREEN =================
  return (
      <div
    style={{
      height: "calc(100vh - 90px)", // subtract navbar height
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      overflow: "hidden",
      paddingTop: "20px", // move upward
      paddingLeft: "24px",
      paddingRight: "24px",
      background: "transparent",
    }}
  >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 6px",
            letterSpacing: "-0.5px",
          }}
        >
          Upload Your Resume
        </h1>

        <p
          style={{
            fontSize: 13,
            color: "#9ca3af",
            margin: 0,
          }}
        >
          PDF only · We'll extract your skills automatically
        </p>
      </div>

      {/* Main Card */}
      <div
        style={{
          background: "rgba(18,18,18,0.9)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 22,
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          overflow: "hidden",
          width: "100%",
          maxWidth: 950,
          height: 460,
        }}
      >
        {/* LEFT */}
        <div
          style={{
            padding: "22px",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#9ca3af",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Select Resume
          </p>

          <div style={{ flex: 1 }}>
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

          {file && (
            <div
              style={{
                marginTop: 14,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#ef4444",
                  }}
                >
                  PDF
                </span>
              </div>

              <div style={{ overflow: "hidden", flex: 1 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {file.name}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "#9ca3af",
                  }}
                >
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            style={{
              marginTop: 16,
              background:
                !file || uploading ? "#2a2a2a" : "#ffffff",
              color:
                !file || uploading ? "#777" : "#111111",
              border: "none",
              borderRadius: 12,
              padding: "12px",
              fontSize: 14,
              fontWeight: 700,
              cursor:
                !file || uploading ? "not-allowed" : "pointer",
            }}
          >
            {uploading ? "Analyzing..." : "Upload & Analyze"}
          </button>

          <div style={{ textAlign: "center", marginTop: 12 }}>
            <Link
              href="/dashboard"
              style={{
                fontSize: 12,
                color: "#9ca3af",
                textDecoration: "none",
              }}
            >
              Skip for now
            </Link>
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {file ? (
            <iframe
              src={URL.createObjectURL(file)}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "#fff",
              }}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.04)",
                  border: "1.5px dashed rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: "#9ca3af",
                  margin: 0,
                }}
              >
                Resume preview appears here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}