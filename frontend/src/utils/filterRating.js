export default function (items, rating) {
  return items.filter((item) => item.rate >= rating);
}
