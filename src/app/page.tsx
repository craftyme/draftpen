"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-16">
      {/* Main Content */}
      <article className="w-full max-w-3xl mx-auto px-6 mt-8">
        <div className="bg-white shadow-sm overflow-hidden rounded-sm">
          <div className="p-20">
            <h1 className="text-[#2F363F] text-2xl font-medium tracking-tight mb-2">
              Digital Warm Up
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
              <time>Nov 9, 2024</time>
              <span className="text-gray-300">·</span>
              <span>ALICANTE, SPAIN</span>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-8">
                I've realized that even when working on projects I'm passionate
                about, I need a digital warm-up period. This discovery came from
                my recent increased focus on coding.
              </p>

              <p className="text-gray-600 leading-relaxed mb-8">
                Sometimes, grasping the big picture requires significant mental
                resources, and this is when my brain tends to seek diversions.
                However, I've noticed an interesting pattern in my work habits.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                Instead of completely avoiding work, I find myself gravitating
                toward smaller, still valuable tasks:
              </p>

              <ul className="space-y-3 mb-10 ml-4">
                <li className="text-gray-700 flex items-start">
                  <span className="text-[#3478F6] mr-2">•</span>
                  Organizing project files and documentation
                </li>
                <li className="text-gray-700 flex items-start">
                  <span className="text-[#3478F6] mr-2">•</span>
                  Cleaning up code and removing redundancies
                </li>
                <li className="text-gray-700 flex items-start">
                  <span className="text-[#3478F6] mr-2">•</span>
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
                What I've come to understand is that the actual coding isn't the
                challenging part. The real complexity lies in the mental
                compilation process—organizing thoughts and concepts before
                translating them into prompts or actual code.
              </p>
            </div>

            <div className="mt-10 flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Author avatar"
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
      </article>
    </div>
  );
}
