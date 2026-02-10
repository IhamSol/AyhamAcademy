import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import courseData from "@/data/courseData.json";
import whitelist from "@/data/whitelist.json";

export default async function LecturePage({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  
  let currentLecture = null;
  let currentModule = null;
  
  for (const module of courseData.modules) {
    const lecture = module.lectures.find(l => l.id === params.id);
    if (lecture) {
      currentLecture = lecture;
      currentModule = module;
      break;
    }
  }

  if (!currentLecture) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-white mb-2">Lecture not found</h1>
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 transition">
            &larr; Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const isAuthorized = session?.user?.email && whitelist.emails.includes(session.user.email);
  const canView = currentLecture.isFree || isAuthorized;

  if (!canView) {
    if (!session) {
      redirect(`/api/auth/signin?callbackUrl=/lecture/${params.id}`);
    } else {
      redirect("/unauthorized");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Top bar */}
      <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="px-4 sm:px-6 flex items-center h-12">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course
          </Link>
          <span className="mx-3 text-slate-700">|</span>
          <span className="text-xs text-slate-500 truncate">
            {currentModule?.title} &rsaquo; {currentLecture.title}
          </span>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row">
        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Video player */}
          <div className="aspect-video w-full bg-black">
            <iframe
              src={currentLecture.videoUrl}
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
            />
          </div>

          {/* Lecture info */}
          <div className="px-4 sm:px-6 py-5 border-b border-slate-800">
            <h1 className="text-lg font-semibold text-white mb-1">{currentLecture.title}</h1>
            <p className="text-xs text-slate-500">
              {currentLecture.isFree ? "Free preview lecture" : "Premium content — enrolled students only"}
            </p>
          </div>
        </main>

        {/* Sidebar — course outline */}
        <aside className="lg:w-80 xl:w-96 border-l border-slate-800 lg:h-[calc(100vh-3rem)] lg:sticky lg:top-12 overflow-y-auto">
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/40">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Course content
            </h2>
          </div>
          <div className="divide-y divide-slate-800/60">
            {courseData.modules.map((m) => (
              <div key={m.id}>
                <div className="px-4 py-2 bg-slate-900/30">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {m.title}
                  </p>
                </div>
                <ul>
                  {m.lectures.map((l) => {
                    const isActive = l.id === params.id;
                    return (
                      <li key={l.id}>
                        <Link
                          href={`/lecture/${l.id}`}
                          className={`flex items-center gap-2.5 px-4 py-2 text-sm transition ${
                            isActive
                              ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500"
                              : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border-l-2 border-transparent"
                          }`}
                        >
                          <svg
                            className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-blue-400" : "text-slate-600"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="truncate text-xs">{l.title}</span>
                          {l.isFree && (
                            <span className="ml-auto text-[9px] font-medium bg-emerald-500/10 text-emerald-400 px-1 py-0.5 rounded flex-shrink-0">
                              Free
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
