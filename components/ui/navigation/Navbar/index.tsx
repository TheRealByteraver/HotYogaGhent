import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from 'next/image';

import { routes } from './routes';
import NavItem from './NavItem';
import NavPanel from "./NavPanel";
import Link from "next/link";

const Navbar = ({ className }: { className?: string }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSetMobileMenuOpen = (isOpen: boolean) => setMobileMenuOpen(isOpen);

  return (
    <header className={className}>
      <nav className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          {/* <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="w-auto h-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a> */}

          <Link href="./" className="-m-1.5 p-1.5">
            <span className="sr-only">Hot Yoga Ghent</span>
            <Image
              src="https://res.cloudinary.com/dmvwqhup8/image/upload/v1684675926/hyglogo1.png"
              width={80}
              height={80}
              alt="Hot Yoga Ghent Logo"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {routes.map((route) =>
            <NavItem key={route.route} route={route.route} routeName={route.routeName}  />
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* for when implementing client management application */}
          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </nav>

      <NavPanel mobileMenuOpen={mobileMenuOpen} handleSetMobileMenuOpen={handleSetMobileMenuOpen}  />
    </header>
  );
}

export default Navbar;
