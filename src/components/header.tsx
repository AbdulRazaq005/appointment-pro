import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
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
          <span className="text-xl font-bold text-gray-800">AppointmentPro</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
            </li>
            <li>
              <Link href="/professionals" className="text-gray-600 hover:text-gray-800">Professionals</Link>
            </li>
            <li>
              <Link href="/book" className="text-gray-600 hover:text-gray-800">Book Appointment</Link>
            </li>
          </ul>
        </nav>
        <div className="space-x-2">
          <Button variant="ghost">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  )
}

