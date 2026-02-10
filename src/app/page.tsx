import Link from "next/link";
import { getServerSession } from "next-auth";
import courseData from "@/data/courseData.json";

export default async function Home() {
  const session = await getServerSession();

  const totalLectures = courseData.modules.reduce((sum, m) => sum + m.lectures.length, 0);
  const freeLectures = courseData.modules.reduce(
    (sum, m) => sum + m.lectures.filter((l) => l.isFree).length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">AyhamAcademy</span>
          </Link>
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <span className="text-slate-400 text-xs hidden sm:block">{session.user?.email}</span>
                <Link
                  href="/api/auth/signout"
                  className="text-xs text-slate-400 hover:text-white transition"
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Course Header */}
      <header className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-2xl">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Course
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {courseData.title}
            </h1>
            <p className="text-sm text-slate-400 mb-4">{courseData.description}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>{courseData.modules.length} modules</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>{totalLectures} lectures</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>{freeLectures} free preview{freeLectures !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Course Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-sm font-semibold text-slate-300 mb-4">Course content</h2>
        <div className="space-y-3">
          {courseData.modules.map((module, mi) => (
            <div
              key={module.id}
              className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/40"
            >
              {/* Module Header */}
              <div className="px-4 py-3 bg-slate-900/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Module {mi + 1}
                  </span>
                  <span className="text-sm font-medium text-white">{module.title}</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  {module.lectures.length} lecture{module.lectures.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Lectures */}
              <ul className="divide-y divide-slate-800/60">
                {module.lectures.map((lecture, li) => (
                  <li key={lecture.id}>
                    <Link
                      href={`/lecture/${lecture.id}`}
                      className="group flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800/40 transition"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600/20 transition">
                        <svg
                          className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-slate-300 group-hover:text-white transition truncate block">
                          {lecture.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {lecture.isFree ? (
                          <span className="text-[10px] font-medium bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">
                            Free
                          </span>
                        ) : (
                          <svg
                            className="w-3.5 h-3.5 text-slate-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <svg
                          className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-center text-xs text-slate-600">
            &copy; {new Date().getFullYear()} AyhamAcademy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
