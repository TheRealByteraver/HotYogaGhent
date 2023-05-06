import MainNavigation from "./MainNavigation";

function Layout(props: any) {
  return (
    <div>
      {/* <MainNavigation /> */}
      {props.children}
    </div>
  );
}

export default Layout;
