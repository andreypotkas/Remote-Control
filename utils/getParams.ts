export default function getParams(data: string): string[] {
  return data.split(' ').filter((item: string) => {
    if (!isNaN(Number(item))) {
      return item;
    }
  });
}
