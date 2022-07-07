export default function getParams(data) {
    return data.split(' ').filter((item) => {
        if (!isNaN(Number(item))) {
            return item;
        }
    });
}
//# sourceMappingURL=getParams.js.map