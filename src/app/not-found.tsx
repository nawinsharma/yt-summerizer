import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <div className="h-[90vh] flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-500">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 cursor-pointer text-blue-500">
        <span className="text-2xl font-bold">Back to Home</span>
      </Link>
    </div>
  );
}
