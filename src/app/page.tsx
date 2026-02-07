import Link from "next/link";
import { getServerSession } from "next-auth";
import courseData from "@/data/courseData.json";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">{courseData.title}</span>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-slate-300 text-sm hidden sm:block">{session.user?.email}</span>
                  <Link 
                    href="/api/auth/signout" 
                    className="text-sm font-medium text-slate-300 hover:text-white transition"
                  >
                    Sign Out
                  </Link>
                </div>
              ) : (
                <Link 
                  href="/api/auth/signin"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Master <span className="text-blue-500">{courseData.title}</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {courseData.description}
          </p>
        </div>

        {/* Course Modules */}
        <div className="grid gap-8">
          {courseData.modules.map((module) => (
            <div key={module.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/80">
                <h2 className="text-xl font-bold text-white">{module.title}</h2>
              </div>
              <div className="divide-y divide-slate-700/50">
                {module.lectures.map((lecture) => (
                  <Link 
                    key={lecture.id}
                    href={`/lecture/${lecture.id}`}
                    className="group flex items-center justify-between px-6 py-4 hover:bg-slate-700/30 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-blue-600 transition">
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-slate-200 font-medium group-hover:text-white transition">{lecture.title}</h3>
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                          {lecture.isFree ? 'Free Preview' : 'Premium Lecture'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-slate-500 group-hover:text-blue-400 transition">
                      <span className="text-sm font-medium mr-2">Watch</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800 mt-12">
        <p className="text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {courseData.title}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
