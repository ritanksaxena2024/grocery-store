'use client';

import { useRouter } from 'next/navigation';
import { Bot } from 'lucide-react';
const SupportButton = () => {
  const router = useRouter();

  return (
    <button
      
      className="fixed bottom-6 cursor-pointer right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
    >
      <Bot />
    </button>
  );
};

export default SupportButton;
