import { UrlBreadcrumd } from "types";

export const scrollTopPage = () => window.scrollTo(0, 0);

export const getUrlAdress = (address: string): UrlBreadcrumd[] => {
    const url = address.split("/").filter((item) => item.length);
    const urlString: UrlBreadcrumd[] = [];
    url.forEach((item, index) =>
        urlString.push({
            link: index > 0 ? `${urlString[index - 1].link}/${item}` : `/${item}`,
            name: item,
        })
    );
    return urlString;
};

export const getOrigin = (): string => {
    let origin = window.location.origin + "/";

    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        origin = "https://aiportal.infostrategic.com/";
    }

    return origin;
};

export const returnIds = (array: any[]) => {
    let ids = "";
    array.forEach(
      ({ id }, index) =>
        (ids = index === array.length ? ids + `${id}` : ids + `${id} `)
    );
    return ids;
  };
