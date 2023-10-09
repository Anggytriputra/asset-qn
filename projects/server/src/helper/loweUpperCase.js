function toTitleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function toUpperCase(str) {
  return str.toUpperCase();
}

exports.toTitleCase = toTitleCase;
exports.toUpperCase = toUpperCase;
