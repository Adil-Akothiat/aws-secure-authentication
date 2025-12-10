import { type FC } from 'react';
import type { AuthLoaderProps } from '@types/ui.ts';

const AuthLoader:FC<AuthLoaderProps> = ({text="Processing..."}) => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="text-6xl font-bold text-white">ASA</div>
          <div className="absolute inset-0 w-full h-full border-2 border-transparent border-t-orange-400 rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <p className="text-white text-lg">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLoader;