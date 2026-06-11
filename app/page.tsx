"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [brandName, setBrandName] = useState("OLD TOM DISTILLERY");
  const [classType, setClassType] = useState("Kentucky Straight Bourbon Whiskey");
  const [alcoholContent, setAlcoholContent] = useState("45% Alc./Vol. (90 Proof)");
  const [netContents, setNetContents] = useState("750 mL");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const normalize = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9%]+/g, " ").trim();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      alert("Please upload a JPG or PNG image.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult("");
    setOcrText("");
  };

  const verifyLabel = async () => {
    if (!file) {
      alert("Please choose a valid label image first.");
      return;
    }

    try {
      setLoading(true);
      setResult("");
      setOcrText("");

      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng");

      setOcrText(text);

      const extracted = normalize(text);

      const checks = [
        { name: "Brand Name", value: brandName },
        { name: "Class / Type", value: classType },
        { name: "Alcohol Content", value: alcoholContent },
        { name: "Net Contents", value: netContents },
      ];

      const results = checks.map((item) => {
        const found = extracted.includes(normalize(item.value));
        return `${found ? "✅" : "❌"} ${item.name}: ${
          found ? "MATCH" : "NOT FOUND"
        }`;
      });

      const warningFound =
        extracted.includes("government warning") ||
        extracted.includes("surgeon general") ||
        extracted.includes("pregnancy") ||
        extracted.includes("operate machinery");

      results.push(
        `${warningFound ? "✅" : "❌"} Government Warning: ${
          warningFound ? "FOUND" : "NOT FOUND"
        }`
      );

      setResult(results.join("\n"));
    } catch (error) {
      console.error(error);
      alert(
        "The app could not read this image. Please use a clear JPG or PNG screenshot."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-300">
            Treasury Take-Home Prototype
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            AI-Powered Alcohol Label Verification
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Upload an alcohol label image, extract text using OCR, and compare
            it against application data for brand name, class/type, alcohol
            content, net contents, and government warning.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold">Application Fields</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Brand Name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
              />

              <input
                type="text"
                placeholder="Class / Type"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
              />

              <input
                type="text"
                placeholder="Alcohol Content"
                value={alcoholContent}
                onChange={(e) => setAlcoholContent(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
              />

              <input
                type="text"
                placeholder="Net Contents"
                value={netContents}
                onChange={(e) => setNetContents(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-lg border border-dashed border-slate-400 p-3"
              />

              <button
                onClick={verifyLabel}
                disabled={loading}
                className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:bg-slate-400"
              >
                {loading ? "Reading Label..." : "Verify Label"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 shadow-xl ring-1 ring-white/20">
            <h2 className="mb-4 text-2xl font-bold">Label Preview</h2>

            {preview ? (
              <img
                src={preview}
                alt="Uploaded label preview"
                className="max-h-80 w-full rounded-lg object-contain bg-white p-3"
              />
            ) : (
              <div className="flex h-80 items-center justify-center rounded-lg border border-dashed border-slate-500 text-slate-300">
                Upload a label image to preview it here.
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className="mt-6 rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
            <h2 className="mb-3 text-2xl font-bold">Verification Results</h2>
            <pre className="whitespace-pre-wrap rounded-lg bg-slate-100 p-4 text-sm">
              {result}
            </pre>
          </div>
        )}

        {ocrText && (
          <div className="mt-6 rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
            <h2 className="mb-3 text-2xl font-bold">Extracted OCR Text</h2>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-100 p-4 text-sm">
              {ocrText}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}