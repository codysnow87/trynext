'use client'; // Use client-side rendering for interactive components

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMessage, faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function NavigationMenu() {
  return (
    <div className="text-black bg-gray-100 top-0 left-0 w-1/5 h-100vh z-10 shadow-md">
      <div className="flex flex-col justify-start space-y-6 p-4">
        <Link href="/" className="p-2 hover:text-blue-600 flex items-center">
          <FontAwesomeIcon icon={faHouse} className="mr-2" style={{ height: '20px', width: '20px' }} />
          Home
        </Link>
        <Link href="/calendar" className="p-2 hover:text-blue-600 flex items-center">
          <FontAwesomeIcon icon={faCalendar} className="mr-2" style={{ height: '20px', width: '20px' }} />
          Calendar
        </Link>
        <Link href="/weather" className="p-2 hover:text-blue-600">
          Weather
        </Link>
        <Link href="/messages" className="p-2 hover:text-blue-600 flex items-center">
          <FontAwesomeIcon icon={faMessage} className="mr-2" style={{ height: '20px', width: '20px' }} />
          Messages
        </Link>
      </div>
    </div>
  );
}
