// menuItems.ts
import {
    Home as HomeIcon,
    ShoppingCart as ShoppingCartIcon,
    BadgeOutlined,
    People as UsersIcon,
    BarChart as LineChartIcon,
  } from '@mui/icons-material';
  
  export const menuItems = [
    {
      href: "#",
      label: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
      subMenu: [
        { href: "#overview", label: "Overview" },
        { href: "#reports", label: "Reports" },
      ]
    },
    {
      href: "/orders",
      label: "Orders",
      icon: <ShoppingCartIcon className="h-5 w-5" />,
      subMenu: [
        { href: "#current", label: "Current Orders" },
        { href: "#past", label: "Past Orders" },
      ]
    },
    {
      href: "/products",
      label: "Products",
      icon: <BadgeOutlined className="h-5 w-5" />,
      subMenu: [
        { href: "#all", label: "All Products" },
        { href: "#categories", label: "Categories" },
      ]
    },
    {
      href: "/customers",
      label: "Customers",
      icon: <UsersIcon className="h-5 w-5" />,
      subMenu: [
        { href: "#vip", label: "VIP Customers" },
        { href: "#all", label: "All Customers" },
      ]
    },
    {
      href: "#",
      label: "Analytics",
      icon: <LineChartIcon className="h-5 w-5" />,
      subMenu: [
        { href: "#sales", label: "Sales Analytics" },
        { href: "#customer", label: "Customer Analytics" },
      ]
    },
  ];
  