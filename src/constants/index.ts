import { ClipboardDocumentListIcon, HomeIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";

import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArchiveBoxIcon,
  ExclamationTriangleIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

export const INITIAL_ALERT = { message: "", error: false };

export const PRODUCT_STATES = ["DRAFT", "ACTIVE", "OUT_OF_STOCK", "DISCONTINUED", "DELETED", "ARCHIVED"];

export const NAV_LINKS = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Shop",
        href: "/shop"
    },
    {
        label: "Contact",
        href: "/contact"
    },
    {
        label: "About us",
        href: "/about-us"
    }
]

export const DASHBOARD_LINKS = [
    {
        label: "Home",
        href: "/dashboard",
        icon: HomeIcon
    },
    {
        label: "Users",
        href: "/dashboard/users",
        icon: UserIcon
    },
    {
        label: "Products",
        href: "/dashboard/products",
        icon: ShoppingBagIcon
    },
    {
        label: "Orders",
        href: "/dashboard/orders",
        icon: ClipboardDocumentListIcon
    },
]

export const GENDER_FORMATTED = {
    WOMEN: {
        label: "Women",
        slug: "/women"
    },
    MEN: {
        label: "Men",
        slug: "/men"
    },
    UNISEX: {
        label: "Unisex",
        slug: "/unisex"
    }
}

export const STATUS_COLORS = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-700",
    pink: "bg-pink-100 text-pink-700",
    yellow: "bg-yellow-100 text-yellow-700",
} as const;
  

export const STATE_ICONS = {
    DRAFT: { icon: PencilIcon, label: "Draft", color: "text-gray-600" },
    ACTIVE: { icon: CheckCircleIcon, label: "Active", color: "text-teal-600" },
    OUT_OF_STOCK: {
      icon: ExclamationTriangleIcon,
      label: "Out of Stock",
      color: "text-yellow-600",
    },
    DISCONTINUED: {
      icon: InformationCircleIcon,
      label: "Discontinued",
      color: "text-blue-600",
    },
    DELETED: { icon: XCircleIcon, label: "Deleted", color: "text-red-600" },
    ARCHIVED: { icon: ArchiveBoxIcon, label: "Archived", color: "text-gray-600" },
  };