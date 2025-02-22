"use client";

import Image from "next/image";
import config from "@/config/config";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("Digital Warm Up");
  const [date, setDate] = useState("Jan 7, 2025");
  const [location, setLocation] = useState("ALICANTE, SPAIN");
  const [content, setContent] =
    useState(`I've realized that even when working on projects I'm passionate about, I need a digital warm-up period. This discovery came from my recent increased focus on coding.

Sometimes, grasping the big picture requires significant mental resources, and this is when my brain tends to seek diversions. However, I've noticed an interesting pattern in my work habits.

Instead of completely avoiding work, I find myself gravitating toward smaller, still valuable tasks:

• Organizing project files and documentation
• Cleaning up code and removing redundancies
• Completing small, manageable tasks

These activities create a sense of accomplishment and progress, effectively tricking my brain into a productive mindset. After this warm-up period, I naturally transition into the main project, often achieving a flow state that lasts for 2-3 hours of focused work.

What I've come to understand is that the actual coding isn't the challenging part. The real complexity lies in the mental compilation process—organizing thoughts and concepts before translating them into prompts or actual code.`);
  const [authorName, setAuthorName] = useState("Tomas Laurinavicius");
  const [authorTitle, setAuthorTitle] = useState("Partner at Craftled");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://tomaslau.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftomaslau.5be54a25.jpg&w=96&q=75"
  );

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

      {/* Edit Mode Toggle */}
      <div className="w-full max-w-3xl mx-auto px-6 py-4 flex justify-end">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-md hover:border-gray-300 transition-all px-4 py-2 flex items-center gap-2"
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
              d={
                isEditMode
                  ? "M5 13l4 4L19 7"
                  : "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              }
            ></path>
          </svg>
          {isEditMode ? "Done Editing" : "Edit Mode"}
        </button>
      </div>

      {/* Main Content */}
      <article className="w-full max-w-3xl mx-auto px-6 py-16">
        <div
          ref={contentRef}
          className="bg-white shadow-sm overflow-hidden rounded-sm"
        >
          <div className="p-20">
            {isEditMode ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-[#2F363F] text-2xl font-medium tracking-tight mb-2 w-full border-b border-gray-200 focus:outline-none focus:border-gray-400"
              />
            ) : (
              <h2 className="text-[#2F363F] text-2xl font-medium tracking-tight mb-2">
                {title}
              </h2>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
              {isEditMode ? (
                <>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-b border-gray-200 focus:outline-none focus:border-gray-400"
                  />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-b border-gray-200 focus:outline-none focus:border-gray-400"
                  />
                </>
              ) : (
                <>
                  <time>{date}</time>
                  <span>{location}</span>
                </>
              )}
            </div>

            <div className="prose prose-gray max-w-none">
              {isEditMode ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[400px] text-gray-600 leading-relaxed p-4 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 resize-none font-sans"
                  placeholder="Write your essay here..."
                  style={{
                    lineHeight: "1.75",
                  }}
                />
              ) : (
                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {content}
                </div>
              )}
            </div>

            <div className="mt-10 flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                {isEditMode && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </label>
                )}
                <Image
                  src={avatarUrl}
                  alt={authorName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="ml-3">
                {isEditMode ? (
                  <>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="text-[#2F363F] text-sm font-medium border-b border-gray-200 focus:outline-none focus:border-gray-400"
                    />
                    <input
                      type="text"
                      value={authorTitle}
                      onChange={(e) => setAuthorTitle(e.target.value)}
                      className="text-gray-500 text-sm border-b border-gray-200 focus:outline-none focus:border-gray-400"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-[#2F363F] text-sm font-medium">
                      {authorName}
                    </p>
                    <p className="text-gray-500 text-sm">{authorTitle}</p>
                  </>
                )}
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
