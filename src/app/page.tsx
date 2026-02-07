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
                  href="/login" 
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

import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function UnauthorizedPage() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-slate-400">You don't have permission to access this content</p>
        </div>

        {/* Error Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl mb-6">
          <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg p-4 mb-6">
            <p className="text-red-200 text-sm">
              {session?.user?.email
                ? `Email: <strong>${session.user.email}</strong> is not authorized to access this course.`
                : "Your account is not authorized to access this content."}
            </p>
          </div>

          <p className="text-slate-300 text-center mb-6">
            To gain access, please contact the course owner or purchase the course.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition transform hover:scale-105 active:scale-95"
            >
              Back to Homepage
            </Link>
            <Link
              href="/api/auth/signout"
              className="w-full flex justify-center py-3 px-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-semibold transition"
            >
              Sign Out & Try Another Account
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-slate-400">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
