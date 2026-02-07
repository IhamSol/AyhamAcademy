"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import courseData from "@/data/courseData.json";
import whitelist from "@/data/whitelist.json";

export default function LecturePage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentLecture, setCurrentLecture] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Find the lecture
    let lecture = null;
    let module = null;

    for (const mod of courseData.modules) {
      const lec = mod.lectures.find((l) => l.id === params.id);
      if (lec) {
        lecture = lec;
        module = mod;
        break;
      }
    }

    setCurrentLecture(lecture);
    setCurrentModule(module);

    // Check authorization
    if (lecture) {
      if (lecture.isFree) {
        setIsAuthorized(true);
      } else if (session?.user?.email && whitelist.includes(session.user.email)) {
        setIsAuthorized(true);
      } else if (status === "unauthenticated") {
        router.push(`/login?callbackUrl=/lecture/${params.id}`);
      } else if (status === "authenticated") {
        router.push("/unauthorized");
      }
    }
  }, [params.id, session, status, router]);

  if (!currentLecture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Lecture Not Found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Course</span>
          </Link>
          <div className="text-slate-300 text-sm">
            <span className="text-slate-400">{currentModule?.title}</span>
            <span className="mx-2 text-slate-600">•</span>
            <span className="font-medium">{currentLecture.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Video Player Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-8">
          <div className="aspect-video w-full bg-black relative">
            <iframe
              src={currentLecture.videoUrl}
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
              title={currentLecture.title}
            ></iframe>
          </div>
        </div>

        {/* Lecture Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{currentLecture.title}</h1>
                  <p className="text-slate-400">
                    {currentModule?.title} • Lecture
                  </p>
                </div>
                {currentLecture.isFree && (
                  <span className="px-4 py-2 bg-green-500 bg-opacity-20 text-green-300 text-sm font-semibold rounded-lg">
                    FREE PREVIEW
                  </span>
                )}
              </div>
              <div className="border-t border-slate-700 pt-4 mt-4">
                <p className="text-slate-300">
                  {currentLecture.isFree
                    ? "This is a free preview lecture available to all students."
                    : "This is a premium lecture. You have access because your email is authorized."}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Course Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">Course Content</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {courseData.modules.map((module) => (
                  <div key={module.id}>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {module.title}
                    </p>
                    <div className="space-y-2">
                      {module.lectures.map((lecture) => (
                        <Link
                          key={lecture.id}
                          href={`/lecture/${lecture.id}`}
                          className={`block p-2 rounded-lg text-sm transition ${
                            lecture.id === params.id
                              ? "bg-blue-600 text-white font-medium"
                              : "text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate">{lecture.title}</span>
                            {lecture.isFree && (
                              <span className="text-[10px] bg-green-500 bg-opacity-20 text-green-300 px-2 py-0.5 rounded ml-1 flex-shrink-0">
                                FREE
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
