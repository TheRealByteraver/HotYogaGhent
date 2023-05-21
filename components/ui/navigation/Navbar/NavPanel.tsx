import { Dialog } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';

import NavItem from "./NavItem";
import { routes } from "./routes";
import Link from "next/link";

type Props = {
  mobileMenuOpen: boolean;
  handleSetMobileMenuOpen: (isOpen: boolean) => void;
}

const NavPanel = (props: Props) => {
  const { mobileMenuOpen, handleSetMobileMenuOpen } = props;

  return (
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={handleSetMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="./" className="-m-1.5 p-1.5">
              <span className="sr-only">Hot Yoga Ghent</span>
              <Image
                src="https://res.cloudinary.com/dmvwqhup8/image/upload/v1684675926/hyglogo1.png"
                width={80}
                height={80}
                alt="Hot Yoga Ghent Logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => handleSetMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                {routes.map((route) =>
                  <NavItem key={route.route} route={route.route} routeName={route.routeName} location='panel'  />
                )}
              </div>

              <div className="py-6">
                {/* for when implementing client management application */}
                {/* <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a> */}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
  )
}

export default NavPanel;
