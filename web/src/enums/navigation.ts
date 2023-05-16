import { routers } from "routers";
import { Navigation } from "types";

export const navigation: Navigation[] = [
  {
    title: "home",
    link: routers.home,
  },
  {
    title: "organizations",
    link: routers.organizations,
  },
  {
    title: "projects",
    link: routers.projects,
  },
  {
    title: "products",
    link: routers.products,
  },
  // {
  //   title: "use-cases",
  //   link: routers.usecases,
  // },
  {
    title: "research-center",
    link: routers.researchCenter,
  }
];

export const footers: Navigation[] = [
  {
    title: "Term Materials",
    link: routers.termsMaterials,
  },
  {
    title: "Privacy Policy",
    link: routers.privacyPolicy,
  },
  {
    title: "Site Map",
    link: routers.siteMap,
  },
  {
    title: "F.A.Q",
    link: routers.faq,
  },
  {
    title: "Open Data",
    link: routers.openData,
  },
];
