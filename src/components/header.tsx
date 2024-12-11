"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-gray-600"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-xl font-bold text-gray-800">
            AppointmentPro
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/professionals"
                className="text-gray-600 hover:text-gray-800"
              >
                Professionals
              </Link>
            </li>
            <li>
              <Link href="/book" className="text-gray-600 hover:text-gray-800">
                Book Appointment
              </Link>
            </li>
          </ul>
        </nav>
        {session ? (
          <div className="flex items-center space-x-4">
            <div className="">
              <Image
                src={session.user?.image as string}
                alt="avatar"
                className="object-cover rounded-full"
                width={40}
                height={40}
              />
            </div>
            <span className="font-bold">{session.user?.name}</span>
            <Button
              // className="bg-gray-200 py-2 px-6 rounded-md"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <div className="space-x-2">
            <Button onClick={() => signIn()}>Sign In</Button>
            {/* <Button variant="ghost">Sign Up</Button> */}
          </div>
        )}
      </div>
    </header>
  );
}
