export const getApiUrl = (str:string) => {
    const devArr = ["dev.yzqdev.top", "localhost"];
    const apiArr = ["www.yzqdev.top"];
    let localUrl = "192.168.";
    let isDev =
        devArr.includes(document.domain) || document.domain.includes(localUrl);
    let isProd = apiArr.includes(document.domain);
    // 需要后端接   线上环境的域名组

    if (str === "socket") {
        if (isDev) {
            return "wss://dev.yzqdev.top";
        }

        if (isProd) {
            return "wss://www.yzqdev.top";
        }
    }

    if (isDev) {
        return "https://yzqdev.top";
    }

    if (isProd) {
        return "https://www.yzqdev.top";
    }
};

export const getDomainApi=(port:string,url=document.domain, ) => {
  return `http://${url}:${port}`
}
