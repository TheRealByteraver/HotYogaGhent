import { ReactNode } from "react";
import { Navbar } from "./ui";
import { useRouter } from "next/router";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const Layout = ({children, ...props}: Props) => {
  const router = useRouter();

  return (
    <>
      {router.asPath !== '/' && <Navbar />}

      {/* <MainNavigation {...props} /> */}
      {children}
    </>
  );
}

export default Layout;
