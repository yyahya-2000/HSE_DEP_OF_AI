import dayjs from "dayjs";
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

export const parseFilterValues = (filterValues) => {
    const res = {}
    for (let key in filterValues) {
        let value = filterValues[key]
        if (typeof value == "boolean") {
            res[key] = value ? 1 : 0
        }
        else if (typeof value == "string" && value.trim().length !== 0) {
            res[key] = value.trim()
        }
        else if (dayjs.isDayjs(value)) {
            res[key] = value.format('YYYY-MM-DD')
        }
        else if (Array.isArray(value)) {
            value.map((val, index) => {
                res[key + `[${index}]`] = val.id
            })
        }
    }
    return res;
};
