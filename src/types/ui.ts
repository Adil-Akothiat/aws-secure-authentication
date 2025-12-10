import type { ReactNode } from 'react';

export interface SectionProps {
  className: string;
  children: ReactNode;
}

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

export interface AuthLoaderProps {
  text?: string;
}
