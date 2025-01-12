export const useInstance = () =>
  new URLSearchParams(window.location.search).get("instance") ?? "";
