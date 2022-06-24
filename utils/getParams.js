export default function getParams(data) {
  return data
    .toString()
    .split(' ')
    .filter((item) => {
      if (!isNaN(item)) {
        return item;
      }
    });
}
