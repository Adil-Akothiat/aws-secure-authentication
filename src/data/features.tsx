import {
  FiLock,
  FiRefreshCw,
  FiShield,
  FiZap,
} from 'react-icons/fi';
import type { FeatureProps } from '@types/features.ts';

export const features: FeatureProps[] =  [
  {
    icon: <FiLock className="w-6 h-6" />,
    title: 'Secure Cognito Auth',
    description: 'AWS Cognito handles sign‑up, login, and email verification.',
    bgColor: 'bg-white',
    iconBgColor: 'bg-blue-50',
    iconTextColor: 'text-blue-600',
  },
  {
    icon: <FiRefreshCw className="w-6 h-6" />,
    title: 'Complete Auth Flow',
    description: 'Register, login, forgot‑, and reset‑password pages with validation.',
    bgColor: 'bg-white',
    iconBgColor: 'bg-teal-50',
    iconTextColor: 'text-teal-600',
  },
  {
    icon: <FiShield className="w-6 h-6" />,
    title: 'Protected Dashboard',
    description: 'Only authenticated users can access the personalized dashboard.',
    bgColor: 'bg-white',
    iconBgColor: 'bg-purple-50',
    iconTextColor: 'text-purple-600',
  },
  {
    icon: <FiZap className="w-6 h-6" />,
    title: 'Fast SPA Interface',
    description: 'React + TailwindCSS deliver instant, smooth navigation.',
    bgColor: 'bg-white',
    iconBgColor: 'bg-yellow-50',
    iconTextColor: 'text-yellow-600',
  },
];