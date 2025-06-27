"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Merriweather } from "next/font/google"

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Aprende" },
    { href: "/circuitos", label: "Calcula" },
    { href: "/resistencia", label: "Experimenta" },
    { href: "/simulador", label: "Simulador" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-5 ">
      <nav className={`bg-black/80 backdrop-blur-sm rounded-full px-12 py-6 shadow-lg ${merriweather.className}`}>
        <ul className="flex items-center space-x-8">
          {navItems.map(({ href, label }) => (
            <li key={href} className="relative">
              <Link
                href={href}
                className={`text-white text-lg transition-colors duration-200 font-medium block pb-1 ${
                  pathname === href ? "text-blue-300" : "hover:text-blue-300"
                }`}
              >
                {label}
              </Link>
              {pathname === href && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
