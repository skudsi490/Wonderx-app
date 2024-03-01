import Link from "next/link";

interface NavbarItemProps {
  label: string;
  active?: boolean;
  href?: string; // href is now optional
  onClick?: () => void; // Optional onClick handler
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  active,
  href,
  onClick,
}) => {
  const content = (
    <div
      className={
        active
          ? "text-white cursor-default"
          : "text-gray-200 hover:text-gray-300 cursor-pointer transition"
      }
    >
      {label}
    </div>
  );

  return href ? (
    // If href is provided, render a Link
    <Link href={href}>{content}</Link>
  ) : (
    // If href is not provided, render a div or button with an onClick handler
    <div onClick={onClick}>{content}</div>
  );
};

export default NavbarItem;
