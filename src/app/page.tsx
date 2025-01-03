import Image from "next/image";
import { CalendarIcon } from "lucide-react";

export default function Home() {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Code is no longer a moat
        </h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <time>Sept 3, 2024</time>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            I've been using Cursor for about six months. It's been a pretty
            insane experience.
          </p>

          <p className="text-gray-600 mb-4">
            It led me to a few key conclusions:
          </p>

          <p className="text-gray-600 mb-6">
            Building software is not a real moat anymore.
          </p>

          <p className="text-gray-600 mb-6">
            If you're building a startup today, your real moats are in the Three
            D's: Data, Distribution, and Design.
          </p>

          <div className="pl-6 border-l-2 border-blue-400 mb-6">
            <ul className="space-y-2">
              <li className="text-gray-600">
                Data: How well you understand your users and their behavior.
              </li>
              <li className="text-gray-600">
                Distribution: Your unique way of reaching and connecting with
                customers.
              </li>
              <li className="text-gray-600">
                Design: Your taste and craftsmanship.
              </li>
            </ul>
          </div>

          <p className="text-gray-600 mb-6">
            Everyone will be able to build anything they want soon enough, but
            the Three D's? It needs time to work on and develop. Start focusing
            on them if you want to stand out.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The rise of "Personal Apps"
          </h2>

          <p className="text-gray-600 mb-6">
            There are 26.3 million software developers today, which will grow
            exponentially in the coming years. We're heading toward a world
            where if you ever need a super specific app for yourself, it will be
            easier to build one rather than find one. We'll see a new landscape
            filled with tons of apps, each with only one or a few active users.
          </p>

          <p className="text-gray-600 mb-6">
            The future belongs to builders and solvers.
          </p>

          <p className="text-gray-600">
            If you're someone who loves to build, the future is yours to take.
            AI will eliminate some jobs that are mostly 'busywork,' but it will
            make it easier for builders to create value. The market rewards
            those who solve problems, and AI is your golden ticket to finding
            solutions to these problems
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex items-center">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Author avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Shane Levine</p>
            <p className="text-sm text-gray-500">Founder at Turbo</p>
          </div>
        </div>
      </div>
    </article>
  );
}
