export interface IPrefixInputProps {
  prefix: React.ReactNode | string;
  placeholder?: string;
  value?: string;
  wrapperClass?: string;
  inputClassName?: string;
  type?: 'number' | 'text';
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  inputProps?: any;
  info?: string;
  onChange?: (value: string) => void;
}
