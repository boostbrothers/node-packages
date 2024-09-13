export function replaceForm(str: string, obj: Record<string, string>): string {
  Object.entries(obj).forEach(([key, value]) => {
    str = str.replaceAll(`{${key}}`, value);
  });

  return str;
}
