import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function UnauthorizedPage() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">
            {session?.user?.email 
              ? `The email (${session.user.email}) is not authorized to access this course.` 
              : "You do not have access to this content."}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Please contact the course owner to get access or purchase the course.
          </p>
          <div className="mt-6 space-y-4">
            <Link
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Back to Homepage
            </Link>
            <Link
              href="/api/auth/signout"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign out and try another account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
