import { ReactNode } from "react";
import MainNavigation from "./MainNavigation";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const Layout = ({children, ...props}: Props) => {
  return (
    <div>
      {/* <MainNavigation {...props} /> */}
      {children}
    </div>
  );
}

export default Layout;
