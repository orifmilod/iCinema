export default function (items, rating) {
  if (rating === 0) return items;
  return items.filter((item) => item.rate >= rating);
}

