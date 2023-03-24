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

// export const footers: Navigation[] = [
//   {
//     title: "terms-materials",
//     link: routers.termsMaterials,
//   },
//   {
//     title: "privacy-policy",
//     link: routers.privacyPolicy,
//   },
//   {
//     title: "site-map",
//     link: routers.siteMap,
//   },
//   {
//     title: "faq",
//     link: routers.faq,
//   },
//   {
//     title: "open-data",
//     link: routers.openData,
//   },
// ];
