"use client";

import { useParams, useRouter } from "next/navigation";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useTranslations } from "next-intl";

export default function LanguageSelector() {
  const router = useRouter();
  const t = useTranslations("Common");
  const handleChange = (event: SelectChangeEvent) => {
    router.push(`/${event.target.value}`);
  };

  const params = useParams();
  const locale = params.locale;
  return (
    <Select value={locale as string} onChange={handleChange}>
      <MenuItem value="en">{t("english")}</MenuItem>
      <MenuItem value="zh">{t("chinese")}</MenuItem>
    </Select>
  );
}
