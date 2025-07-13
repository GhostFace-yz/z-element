import type {Component, ComputedRef, Ref} from "vue";

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type NativeType = 'button' | 'submit' | 'reset';
export type ButtonSize = 'small' | 'default' | 'large';

export interface ButtonProps {
  size?: ButtonSize;
  type?: ButtonType;
  nativeType?: NativeType;
  disabled?: boolean;
  loading?: boolean;
  icon?: String;
  circle?: boolean;
  plain?: boolean;
  round?: boolean;
  tag?: string | Component;
  autofocus?: boolean;
  useThrottle?: boolean;
  throttleDuration?: number;
  loadingIcon?: String;
}

export interface ButtonGroupProps {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonGroupContext {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonEmits {
  (e: 'click', val: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
  disabled: ComputedRef<boolean>
  size: ComputedRef<ButtonSize | ''>;
  type: ComputedRef<ButtonType | ''>;
}