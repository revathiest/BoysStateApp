export const DEFAULT_COLORS = {
  primary: '#204080',
  secondary: '#1A6BC6',
  accent: '#FFD166',
  text: '#fff',
  white: '#fff',
  transparent: 'rgba(255,255,255,0.08)',
};

export function getColors(branding) {
  return {
    ...DEFAULT_COLORS,
    ...(branding && branding.colors),
  };
}

export const DEFAULT_ASSETS = {
  logo: require('./assets/Boys State App Blue on Transparent.png'),
  icon: require('./assets/Boys State Shield Blue on Transparent.png'),
  banner: null,
};

export function getAssets(branding) {
  return {
    logo: branding && branding.logo ? { uri: branding.logo } : DEFAULT_ASSETS.logo,
    icon: branding && branding.icon ? { uri: branding.icon } : DEFAULT_ASSETS.icon,
    banner:
      branding && branding.banner ? { uri: branding.banner } : DEFAULT_ASSETS.banner,
  };
}
