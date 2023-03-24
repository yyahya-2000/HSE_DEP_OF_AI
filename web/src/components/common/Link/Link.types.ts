export type LinkProps = {
  link: string;
  title: string;
  isTranslation?: boolean;
  isLink?: boolean;
  color?: string;
  onHover?: (event) => void;
  isActive?: boolean;
  onClick?: () => void;
};
