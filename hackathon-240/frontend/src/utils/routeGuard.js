import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useRouteGuard = () => {
    const router = useRouter();

    useEffect(() => {
        const hackathonStarted = localStorage.getItem('hackathonStarted') === 'true';
        const currentPath = router.pathname;
        const challengeStartTime = localStorage.getItem('challengeStartTime');
        const submissionComplete = localStorage.getItem('submissionComplete') === 'true';

        if (submissionComplete) {
            // If submission is complete, only allow access to success screen
            if (currentPath !== '/success') {
                router.replace('/success');
            }
        } else if (hackathonStarted && challengeStartTime) {
            // If hackathon is started but not submitted, only allow access to screen4
            if (currentPath !== '/screen4') {
                router.replace('/screen4');
            }
        } else {
            // If hackathon isn't started, don't allow access to screen4 or success
            if (currentPath === '/screen4' || currentPath === '/success') {
                router.replace('/');
            }
        }
    }, [router]);
}; 