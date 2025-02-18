import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));
export const locales = ["en", "zh"] as const;
export const defaultLocale = "en" as const;
