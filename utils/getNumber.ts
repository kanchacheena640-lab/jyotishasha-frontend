export default function getNumber(params: URLSearchParams, key: string): number {
  const value = params.get(key);
  return value ? parseFloat(value) : 0;
}
