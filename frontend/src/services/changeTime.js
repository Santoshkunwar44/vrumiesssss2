export const changeTime = (time) => {

    if (time) {
        return time.split("T")[0].replaceAll("-", "/");
    }
}