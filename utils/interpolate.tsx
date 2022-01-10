export function interpolate(string: string, params: any): string {
  const names = Object.keys(params);
  const vals = Object.values(params);
  try {
    return new Function(...names, `return \`${string}\`;`)(...vals);
  } catch {
    return string;
  }
}
