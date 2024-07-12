"use client";

import { useParams, useRouter } from "next/navigation";
import { Select, MenuItem, SelectChangeEvent, Button, Menu } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function LanguageSelector() {
  const router = useRouter();
  const t = useTranslations("Common");
  const handleChange = (value:string) => {
    handleClose()
    router.push(`/${value}`);
  };

  const params = useParams();
  const locale = params.locale;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-language-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!text-white hover:bg-white/10"
      >
        {locale === "en" ? t("english") : t("chinese")}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        MenuListProps={{
          'aria-labelledby': 'basic-language-button',
        }}
      >
        <MenuItem onClick={()=>handleChange('en')} value="en">{t("english")}</MenuItem>
        <MenuItem onClick={()=>handleChange('zh')} value="zh">{t("chinese")}</MenuItem>
      </Menu>
    </>
  );
}
