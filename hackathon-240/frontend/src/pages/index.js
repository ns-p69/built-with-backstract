// pages/index.js
import React from 'react';
import EmailInput from '../components/EmailInput';
import { useRouter } from 'next/router';
import { useRouteGuard } from '@/utils/routeGuard';

const Home = () => {
  const router = useRouter();
  const isHackathonStarted = typeof window !== 'undefined' && localStorage.getItem('hackathonStarted');

  useRouteGuard();

  if (!isHackathonStarted) {
    return null; // SplashScreen will be shown by Layout
  }

  return <EmailInput />;
};

export default Home;