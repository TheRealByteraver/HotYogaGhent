import Link from "next/link";
import { ReactNode, useState } from "react";
import useSwipe from "@/hooks/useSwipe";

// hidden from width of 768px
interface HamBurgerIconProps {
  children?: ReactNode
  // any props that come into the component
  twBorderColor: string,
  onClick: () => void
}

const HamBurgerIcon = ({children, ...props}: HamBurgerIconProps) => {
  return (
    <div
      className={`h-full aspect-square border-2 rounded p-1 ${props.twBorderColor}`}
      onClick={props.onClick}
    >
      <ul className="h-full flex flex-col justify-around items-center">
        <li className={`w-full border ${props.twBorderColor}`}></li>
        <li className={`w-full border ${props.twBorderColor}`}></li>
        <li className={`w-full border ${props.twBorderColor}`}></li>
      </ul>
    </div>
  );
}

interface DropDownMenuProps {
  children?: ReactNode
  // any props that come into the component
  closeMenu: () => void
}

const DropdownMenu = ({children, ...props}: DropDownMenuProps) => {
  // box-shadow: offset-x, offset-y blur-radius spread-radius rgba-color
  return (
    <ul
      className="absolute right-0 inline-block text-right text-gray-100 bg-emerald-500 shadow-[-4px_8px_16px_4px_rgba(16,185,129,0.5)]"
      onClick={props.closeMenu}
      onMouseLeave={props.closeMenu}
    >
      <li>
        <Link href="/">
          <div className="p-1 hover:bg-lime-400 hover:text-white">Home</div>
        </Link>
      </li>
      <li>
        <Link href="/yoga">
          <div className="p-1 hover:bg-lime-400 hover:text-white">Yoga</div>
        </Link>
      </li>
      <li>
        <Link href="/new-to-hot-yoga-ghent">
          <div className="p-1 hover:bg-lime-400 hover:text-white">
            New to Hot Yoga Ghent?
          </div>
        </Link>
      </li>
      <li>
        <Link href="/timetable">
          <div className="p-1 hover:bg-lime-400 hover:text-white">
            Timetable
          </div>
        </Link>
      </li>
      <li>
        <Link href="/pricing">
          <div className="p-1 hover:bg-lime-400 hover:text-white">Pricing</div>
        </Link>
      </li>
      <li>
        <Link href="/testimonials">
          <div className="p-1 hover:bg-lime-400 hover:text-white">
            Testimonials
          </div>
        </Link>
      </li>
      <li>
        <Link href="/events">
          <div className="p-1 hover:bg-lime-400 hover:text-white">Events</div>
        </Link>
      </li>
      <li>
        <Link href="/contact">
          <div className="p-1 hover:bg-lime-400 hover:text-white">Contact</div>
        </Link>
      </li>
      <li>
        <Link href="/blog">
          <div className="p-1 hover:bg-lime-400 hover:text-white">Blog</div>
        </Link>
      </li>
    </ul>
  );
}

const Menu: React.FC = () => {
  return (
    <ul className="h-full max-w-5xl flex justify-around items-center text-white text-lg">
      <li className="inline whitespace-nowrap">
        <Link href="/">Home</Link>
      </li>
      <li className="inline whitespace-nowrap">
        <Link href="/yoga">Yoga</Link>
      </li>
      <li className="inline whitespace-nowrap">
        <Link href="/new-to-hot-yoga-ghent">New to Hot Yoga Ghent?</Link>
      </li>
      <li className="inline whitespace-nowrap">
        <Link href="/timetable">Timetable</Link>
      </li>
      <li className="inline whitespace-nowrap">
        <Link href="/pricing">Pricing</Link>
      </li>
      <li className="inline whitespace-nowrap">
        <Link href="/testimonials">Testimonials</Link>
      </li>
      <li className="inline whitespace-nowrap">
        <Link href="/events">Events</Link>
      </li>
      <li className="inline whitespace-nowrap">
        <Link href="/contact">Contact</Link>
      </li>
      <li className="inline whitespace-nowrap">
        <Link href="/blog">Blog</Link>
      </li>
    </ul>
  );
}

interface MainNavigationProps {
  children?: ReactNode
  // any props that come into the component
}

const MainNavigation = ({children, ...props}: MainNavigationProps) => {
  // const [dropDownIsVisible, setDropDownIsVisible] = useState(false);

  const swipeHandlers = useSwipe({
    onSwipedLeft: () => console.log("left"),
    onSwipedRight: () => console.log("right"),
  });

  return (
    <div {...swipeHandlers} className="">
      <nav>
        <div className="relative h-14 flex bg-gradient-to-r from-emerald-500 to-lime-400">
          <div className="h-full grow hidden md:inline-block">
            <Menu />
          </div>
          {/* <div className="md:hidden absolute right-0 h-full p-1">
            <HamBurgerIcon
              twBorderColor="border-gray-100"
              onClick={() => setDropDownIsVisible((prevState) => !prevState)}
            />
          </div> */}
        </div>
        {/* {dropDownIsVisible && (
          <DropdownMenu closeMenu={() => setDropDownIsVisible(false)} />
        )} */}
      </nav>
      {children}
    </div>
  );
}

export default MainNavigation;
