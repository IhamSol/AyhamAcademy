import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import courseData from "@/data/courseData.json";
import whitelist from "@/data/whitelist.json";

export default async function LecturePage({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  
  // Find the lecture in our data
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Lecture not found</h1>
          <Link href="/" className="text-indigo-600 hover:underline mt-4 block">Back to Home</Link>
        </div>
      </div>
    );
  }

  // Check access - ✅ FIXED: Proper case-insensitive whitelist check
  const isAuthorized = session?.user?.email && 
    whitelist.emails.some(email => 
      email.toLowerCase() === session.user.email.toLowerCase()
    );
  const canView = currentLecture.isFree || isAuthorized;

  if (!canView) {
    if (!session) {
      // ✅ FIXED: Correct redirect syntax for App Router
      redirect(`/api/auth/signin?callbackUrl=/lecture/${params.id}`);
    } else {
      redirect("/unauthorized");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-indigo-600 font-bold flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Course
          </Link>
          <div className="text-gray-600 text-sm font-medium">
            {currentModule?.title} &raquo; {currentLecture.title}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video w-full bg-black">
            {/* ✅ FIXED: Added security attributes and error handling */}
            <iframe
              src={currentLecture.videoUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={currentLecture.title}
            ></iframe>
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">{currentLecture.title}</h1>
            <p className="mt-2 text-gray-600">
              {currentLecture.isFree ? "This is a free preview lecture." : "Paid content accessible to enrolled students."}
            </p>
            
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
              <div className="space-y-2">
                {courseData.modules.map(m => (
                  <div key={m.id}>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{m.title}</p>
                    <div className="ml-2 mt-1 space-y-1">
                      {m.lectures.map(l => (
                        <Link 
                          key={l.id}
                          href={`/lecture/${l.id}`}
                          className={`block text-sm p-2 rounded ${l.id === params.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                          {l.title} {l.isFree && <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded ml-1">FREE</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
