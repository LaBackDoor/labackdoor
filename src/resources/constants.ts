export const LAYOUT_VALUES = {
    PRIMARY: 'primary' as const,
    SECONDARY: 'secondary' as const,
    TERTIARY: 'tertiary' as const,
  };
  
  export type LayoutType = typeof LAYOUT_VALUES[keyof typeof LAYOUT_VALUES];