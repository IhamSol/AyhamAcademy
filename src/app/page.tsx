import Link from "next/link";
import { getServerSession } from "next-auth";
import courseData from "@/data/courseData.json";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">▶</span>
            </div>
            <h1 className="text-xl font-bold text-white">{courseData.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                <span className="text-sm text-slate-300">{session.user.email}</span>
                <Link
                  href="/api/auth/signout"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">{courseData.title}</h2>
          <p className="text-lg text-slate-300">{courseData.description}</p>
        </div>

        {/* Modules Grid */}
        <div className="space-y-8">
          {courseData.modules.map((module, moduleIndex) => (
            <div key={module.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition">
              {/* Module Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{moduleIndex + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{module.title}</h3>
                </div>
              </div>

              {/* Lectures List */}
              <div className="divide-y divide-slate-700">
                {module.lectures.map((lecture, lectureIndex) => (
                  <Link
                    key={lecture.id}
                    href={`/lecture/${lecture.id}`}
                    className="block hover:bg-slate-700 transition px-6 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-slate-300 text-sm font-semibold">{lectureIndex + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{lecture.title}</p>
                          <p className="text-sm text-slate-400 mt-1">Video Lecture</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {lecture.isFree ? (
                          <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-300 text-xs font-semibold rounded-full">
                            FREE PREVIEW
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-yellow-300 text-xs font-semibold rounded-full">
                            LOCKED
                          </span>
                        )}
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-xl p-6">
          <p className="text-blue-200 text-sm">
            <span className="font-semibold">💡 Tip:</span> Click on any lecture to start watching. Free preview lectures are available to everyone. Locked lectures require authentication.
          </p>
        </div>
      </div>
    </div>
  );
}
