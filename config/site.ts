export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    // {
    //   label: "Docs",
    //   href: "/docs",
    // },
    {
      label: "Access",
      href: "/access",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Scan",
      href: "/scan",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    // {
    //   label: "Docs",
    //   href: "/docs",
    // },
    {
      label: "Access",
      href: "/access",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Scan",
      href: "/scan",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
