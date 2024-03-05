import Link from "next/link"
import { usePathname } from "next/navigation"
import { HouseSimple } from "@phosphor-icons/react/dist/ssr/HouseSimple"
import { PersonSimpleBike } from "@phosphor-icons/react/dist/ssr/PersonSimpleBike"
import { Users } from "@phosphor-icons/react/dist/ssr/Users"
import { HandHeart } from "@phosphor-icons/react/dist/ssr/HandHeart"

import { NavigationPaths } from "@/types/NavigationPaths"

const BottomNavbar = () => {
  const pathname = usePathname()
  return (
    <>
      <nav className="bottom-nav-container fixed bottom-0 left-0 right-0 z-10 flex h-14 items-center justify-center border-t border-slate-100 bg-gradient-to-t from-white to-slate-100 text-slate-500 md:hidden">
        <ul className="main-app-size grid h-full w-full grid-cols-4 items-center justify-between divide-x-2 divide-slate-100 text-center">
          <Link href={NavigationPaths.homeAppAdmin}>
            <li
              className={`flex h-14 w-full flex-col items-center justify-center border-t-4 sm:h-16 ${pathname.includes("home") ? "border-blue-700 text-blue-700" : "border-slate-100"}`}
            >
              <HouseSimple size={28} />
              <span className="block text-xxs">Home</span>
            </li>
          </Link>
          <Link href={NavigationPaths.singleBooking}>
            <li
              className={`flex h-14 w-full flex-col items-center justify-center border-t-4 sm:h-16 ${pathname === NavigationPaths.singleBooking ? "border-blue-700 text-blue-700" : "border-slate-100"}`}
            >
              <PersonSimpleBike size={28} />
              <span className="block text-xxs">Single Booking</span>
            </li>
          </Link>
          <Link href={NavigationPaths.groupBooking}>
            <li
              className={`flex h-14 w-full flex-col items-center justify-center border-t-4 sm:h-16 ${pathname === NavigationPaths.groupBooking ? "border-blue-700 text-blue-700" : "border-slate-100"}`}
            >
              <Users size={28} />
              <span className="block text-xxs">Group Booking</span>
            </li>
          </Link>
          <Link href={NavigationPaths.becomeMember}>
            <li
              className={`flex h-14 w-full flex-col items-center justify-center border-t-4 sm:h-16 ${pathname === NavigationPaths.becomeMember ? "border-blue-700 text-blue-700" : "border-slate-100"}`}
            >
              <HandHeart size={28} />
              <span className="block text-xxs">Become a Member</span>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  )
}

export default BottomNavbar
