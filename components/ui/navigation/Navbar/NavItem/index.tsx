import Link from "next/link";
import styles from './NavItem.module.css';
import classNames from "classnames";
import { useRouter } from "next/router";

type Props = {
  route: string;
  location?: 'navbar' | 'panel';
  routeName: string;
}

const NavItem = (props: Props) => {
  // PROPS
  const { route, routeName, location = 'navbar' } = props;

  const router = useRouter();

  const className = classNames(
    styles[`${location}`],
    router.asPath === `/${route}` ? styles[`${location}-active`] : styles[`${location}-inactive`]
  )

  return (
    <Link href={`${route}`} className={className}>
      {routeName}
    </Link>
  )
};

export default NavItem;
