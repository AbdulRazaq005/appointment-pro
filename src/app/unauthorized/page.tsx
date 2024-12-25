import Link from "next/link";
import React from "react";

export default function Unauthorized() {
  return (
    <div>
      <section className="flex items-center h-full w-full mt-8">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-lg text-center">
            <h4 className="mb-4 font-extrabold text-6xl dark">401</h4>
            <h5 className="mb-8 text-4xl font-bold dark:text-gray-200">
              Unauthorized
            </h5>
            <p className="font-semibold md:text-2xl mb-8">
              You are not authorized to access this page. Please login.
            </p>
            <Link
              href="/"
              className="px-8 py-3 font-semibold rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
