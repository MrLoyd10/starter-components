import BreadcrumbResponsive from "../../components/common/breadcrumb-responsive";

const BreadCrumb = () => {
  const items = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];
  return (
    <div>
      <BreadcrumbResponsive items={items} itemsToDisplay={3} />
    </div>
  );
};

export default BreadCrumb;
