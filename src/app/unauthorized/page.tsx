import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function UnauthorizedPage() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-sm text-slate-400">You are not authorized to view this content.</p>
        </div>

        {/* Error Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-200 text-sm">
              {session?.user?.email
                ? `Email: ${session.user.email} is not authorized to access this course.`
                : "Your account is not authorized to access this content."}
            </p>
          </div>

          <div className="space-y-2">
            <Link
              href="/"
              className="w-full flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition"
            >
              Back to Homepage
            </Link>
            <Link
              href="/api/auth/signout"
              className="w-full flex justify-center py-2 px-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white text-sm rounded-lg font-medium transition"
            >
              Sign Out &amp; Try Another Account
            </Link>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
