export function stringToSlug(Text) {
  if (Text == false || Text == null || typeof Text == "undefined") {
    return "";
  }

  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function stringToSlug2(Text) {
  if (Text == false || Text == null || typeof Text == "undefined") {
    return "";
  }

  return Text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "")
    .replace(/(\s+)/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
