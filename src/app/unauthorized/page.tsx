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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333-2.694-1.333-3.464 0" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-slate-400">You are not authorized to view this content.</p>
        </div>

        {/* Error Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl mb-6">
          <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg p-4 mb-6">
            <p className="text-red-200 text-sm">
              {session?.user?.email
                ? `Email: ${session?.user?.email} is not authorized to access this course.`
                : "Your account is not authorized to access this content."}
            </p>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-slate-400">You don't have permission to view this content.</p>

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
