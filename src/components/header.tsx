"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";

export default function Header() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const router = useRouter();

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
          <div className="hidden lg:flex space-x-4">{MenuItems(role)}</div>
        </nav>

        <div className="flex justify-end items-center">
          {session ? (
            <div className="flex items-center space-x-4">
              <div className="">
                <Image
                  src={session.user?.image ?? "/avatar.jpg"}
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
                className="hidden lg:block"
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div className="hidden lg:block">
              <Button
                variant="outline"
                onClick={() => router.push("/signup")}
                className="space-x-2"
              >
                Sign Up
              </Button>
              <Button onClick={() => signIn()} className="space-x-2 ml-3">
                Login
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-5 lg:hidden border border-gray-200 rounded-md bg-gray-200 p-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 space-y-2">
            {MenuItems(role)}
            {session ? (
              <Button onClick={() => signOut()} className="space-x-2">
                Sign out
              </Button>
            ) : (
              <div>
                <Button
                  variant="outline"
                  onClick={() => router.push("/signup")}
                  className="space-x-2"
                >
                  Sign Up
                </Button>
                <Button onClick={() => signIn()} className="space-x-2 ml-3">
                  Login
                </Button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

function MenuItems(role: string) {
  return (
    <>
      <Link href="/" className="block text-gray-600 hover:text-blue-500">
        Home
      </Link>
      <Link href="/book" className="block text-gray-600 hover:text-blue-500">
        Book Appointment
      </Link>
      <Link
        href="/appointments"
        className="block text-gray-600 hover:text-blue-500"
      >
        My Appointments
      </Link>
      {role === Role.PROFESSIONAL && (
        <Link
          href="/configuration"
          className="block text-gray-600 hover:text-blue-500"
        >
          Config
        </Link>
      )}
    </>
  );
}
