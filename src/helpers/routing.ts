export function getPathWithParams(url: URL): string {
  const pathname = url.pathname;
  const searchParams = url.searchParams.toString();
  return searchParams ? `${pathname}?${searchParams}` : pathname;
}
