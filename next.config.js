const withNextIntl = require("next-intl/plugin")("./src/lib/i18n.ts");
module.exports = withNextIntl({
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://blocklet.chichi.hair"
        : "http://localhost:3000",
  },
});
