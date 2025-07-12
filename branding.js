export const DEFAULT_COLORS = {
  primary: '#204080',
  secondary: '#1A6BC6',
  accent: '#FFD166',
  text: '#fff',
  background: '#ffffff',
  white: '#fff',
  transparent: 'rgba(255,255,255,0.08)',
};

export function getColors(branding) {
  return {
    primary: branding?.colorPrimary || DEFAULT_COLORS.primary,
    secondary: branding?.colorSecondary || DEFAULT_COLORS.secondary,
    accent: branding?.colorAccent || DEFAULT_COLORS.accent,
    text: branding?.colorText || DEFAULT_COLORS.text,
    background: branding?.colorBackground || DEFAULT_COLORS.background,
    white: DEFAULT_COLORS.white,
    transparent: DEFAULT_COLORS.transparent,
  };
}

export const DEFAULT_ASSETS = {
  logo: require('./assets/Boys State App Blue on Transparent.png'),
  icon: require('./assets/Boys State Shield Blue on Transparent.png'),
  banner: null,
};

export function getAssets(branding) {
  return {
    logo: branding?.logoUrl ? { uri: branding.logoUrl } : DEFAULT_ASSETS.logo,
    icon: branding?.iconUrl ? { uri: branding.iconUrl } : DEFAULT_ASSETS.icon,
    banner: branding?.bannerUrl ? { uri: branding.bannerUrl } : DEFAULT_ASSETS.banner,
  };
}
