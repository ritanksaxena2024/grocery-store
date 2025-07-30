'use client';
import Lottie from 'lottie-react';
import login from '@/app/assets/lottie/grocery.json';

const LoginAnimation = () => {
  return (
    <div className="w-full max-w-[500px] h-auto mx-auto">
      <Lottie
        animationData={login}
        loop={true}
        className="w-full h-auto"
      />
    </div>
  );
};

export default LoginAnimation;
