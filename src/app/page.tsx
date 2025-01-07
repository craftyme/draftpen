"use client";

import Image from "next/image";
import config from "@/config/config";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useRef } from "react";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const exportAsPNG = async () => {
    if (contentRef.current === null) return;

    try {
      const dataUrl = await toPng(contentRef.current, { quality: 0.95 });
      const link = document.createElement("a");
      link.download = "essay.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error exporting as PNG:", err);
    }
  };

  const exportAsPDF = async () => {
    if (contentRef.current === null) return;

    try {
      const dataUrl = await toPng(contentRef.current);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [
          contentRef.current.offsetWidth,
          contentRef.current.offsetHeight,
        ],
      });

      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        contentRef.current.offsetWidth,
        contentRef.current.offsetHeight
      );
      pdf.save("essay.pdf");
    } catch (err) {
      console.error("Error exporting as PDF:", err);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[56px]">
      {/* Hero Section */}
      <div className="w-full bg-white border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <h1 className="font-fraunces text-[#2F363F] font-black text-4xl tracking-tight">
              Turn Your Thoughts Into Shareable One-Page Essays
            </h1>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="w-full max-w-3xl mx-auto px-6 py-16">
        <div
          ref={contentRef}
          className="bg-white shadow-sm overflow-hidden rounded-sm"
        >
          <div className="p-20">
            <h2 className="text-[#2F363F] text-2xl font-medium tracking-tight mb-2">
              Digital Warm Up
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
              <time>Jan 7, 2025</time>
              <span>ALICANTE, SPAIN</span>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-8">
                I&apos;ve realized that even when working on projects I&apos;m
                passionate about, I need a digital warm-up period. This
                discovery came from my recent increased focus on coding.
              </p>

              <p className="text-gray-600 leading-relaxed mb-8">
                Sometimes, grasping the big picture requires significant mental
                resources, and this is when my brain tends to seek diversions.
                However, I&apos;ve noticed an interesting pattern in my work
                habits.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                Instead of completely avoiding work, I find myself gravitating
                toward smaller, still valuable tasks:
              </p>

              <ul className="mb-10 space-y-1 -ml-5">
                <li className="text-gray-600 flex">
                  <span className="text-gray-600 mr-2">•</span>
                  Organizing project files and documentation
                </li>
                <li className="text-gray-600 flex">
                  <span className="text-gray-600 mr-2">•</span>
                  Cleaning up code and removing redundancies
                </li>
                <li className="text-gray-600 flex">
                  <span className="text-gray-600 mr-2">•</span>
                  Completing small, manageable tasks
                </li>
              </ul>

              <p className="text-gray-600 leading-relaxed mb-8">
                These activities create a sense of accomplishment and progress,
                effectively tricking my brain into a productive mindset. After
                this warm-up period, I naturally transition into the main
                project, often achieving a flow state that lasts for 2-3 hours
                of focused work.
              </p>

              <p className="text-gray-600 leading-relaxed">
                What I&apos;ve come to understand is that the actual coding
                isn&apos;t the challenging part. The real complexity lies in the
                mental compilation process—organizing thoughts and concepts
                before translating them into prompts or actual code.
              </p>
            </div>

            <div className="mt-10 flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="https://tomaslau.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftomaslau.5be54a25.jpg&w=96&q=75"
                  alt="Tomas Laurinavicius"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="text-[#2F363F] text-sm font-medium">
                  Tomas Laurinavicius
                </p>
                <p className="text-gray-500 text-sm">Partner at Craftled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={exportAsPNG}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-md hover:border-gray-300 transition-all flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Export as PNG
          </button>
          <button
            onClick={exportAsPDF}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-md hover:border-gray-300 transition-all flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            Export as PDF
          </button>
        </div>
      </article>
    </div>
  );
}
