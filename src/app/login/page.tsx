"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">▶</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to access your course</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.02 1.024-2.588 2.136-5.912 2.136-5.4 0-9.76-4.36-9.76-9.76s4.36-9.76 9.76-9.76c3.028 0 5.28 1.188 6.944 2.752l2.304-2.304C19.64 1.152 16.42 0 12.48 0 5.58 0 0 5.58 0 12.48s5.58 12.48 12.48 12.48c3.748 0 6.572-1.232 8.776-3.532 2.272-2.272 2.98-5.456 2.98-8.12 0-.788-.064-1.54-.18-2.256H12.48z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-sm text-slate-400">
              Use your Google account to sign in. Your email must be authorized to access paid content.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-xl p-4">
          <p className="text-blue-200 text-sm text-center">
            <span className="font-semibold">ℹ️ First time?</span> Your email will be checked against our authorized list.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <LoginContent />
    </Suspense>
  );
}
