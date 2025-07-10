import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
  border?: boolean;
  fixedWidth?: boolean;
  flip?: "horizontal" | "vertical" | "both";
  icon: object | Array<string> | string | IconDefinition;
  mask?: object | Array<string> | string;
  listItem?: boolean;
  pull?: "left" | "right";
  pulse?: boolean;
  rotation?: 90 | 180 | 270 | "90" | "180" | "270";
  size?: "lg" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" | "11x" | "12x" | "14x" | "16x" | "18x" | "20x" | "24x" | "32x" | "48x" | "64x" | "96x" | "128x" | "256x" | "512x" | "1024x" | "2048x" | "auto";
  swapOpacity?: boolean;
  spin?: boolean;
  transform?: object | string;
  title?: string;
  inverse?: boolean;
  bounce?: boolean;
  shake?: boolean;
  beat?: boolean;
  fade?: boolean;
  beatFade?: boolean;
  spinPulse?: boolean;
  spinReverse?: boolean;
  type?: "primary" | "success" | "warning" | "danger" | "info";
  color?: string;
}