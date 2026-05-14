const HTML_ESCAPE_LOOKUP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPE_LOOKUP[character] ?? character);
}

export function safeHref(value: string) {
  if (value.startsWith("#")) {
    return value;
  }

  if (value.startsWith("mailto:") || value.startsWith("tel:")) {
    return value;
  }

  if (value.startsWith("https://") || value.startsWith("http://")) {
    return value;
  }

  return "#";
}
