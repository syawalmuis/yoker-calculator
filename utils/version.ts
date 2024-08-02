const getVersion = () => {
    const version = JSON.parse(localStorage.getItem("version") as string);
    return version || "new";
};

const setVersion = (version: string) => {
    localStorage.setItem("version", version);
};

export { getVersion, setVersion };
