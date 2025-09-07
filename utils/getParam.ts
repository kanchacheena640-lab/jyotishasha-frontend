export default function getParam(params: Record<string, any>, key: string): string {
  const value = params?.[key];
  return typeof value === 'string' ? value.trim() : '';
}
