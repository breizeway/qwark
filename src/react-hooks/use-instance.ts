export const useInstance = () => {
  const searchParams = new URLSearchParams(window.location.search);
  console.log(`:::SEARCHPARAMS::: `, searchParams);
  return searchParams.get("instance") ?? "";
};
