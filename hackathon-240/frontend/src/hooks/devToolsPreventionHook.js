// devToolsPreventionHook.js
import { useEffect } from 'react';

const usePreventDevTools = () => {
    useEffect(() => {
        const preventDevTools = () => {
            // Method 1: Detect devtools through window.outerWidth/Height difference
            const checkDevTools = () => {
                const threshold = 160;
                const widthThreshold = window.outerWidth - window.innerWidth > threshold;
                const heightThreshold = window.outerHeight - window.innerHeight > threshold;

                if (widthThreshold || heightThreshold) {
                    handleDevToolsOpen();
                }
            };

            // Method 2: Detect through console.log timing
            const detectDevToolsConsole = () => {
                const startTime = new Date();
                console.log('Checking for dev tools');
                console.clear();
                const endTime = new Date();

                if (endTime - startTime > 100) {
                    handleDevToolsOpen();
                }
            };

            // Method 3: Detect through debugger keyword
            const preventDebugger = () => {
                debugger;
            };

            // Handle when dev tools are detected
            const handleDevToolsOpen = () => {
                // Option 1: Redirect
                window.location.href = '/access-denied';

                // Option 2: Disable right-click
                document.addEventListener('contextmenu', (e) => e.preventDefault());

                // Option 3: Clear console and show warning
                console.clear();
                console.warn('Developer tools are not allowed on this site');
            };

            // Add event listeners
            window.addEventListener('resize', checkDevTools);
            window.addEventListener('mousemove', detectDevToolsConsole);
            setInterval(preventDebugger, 1000);

            // Initial check
            checkDevTools();
            detectDevToolsConsole();

            // Cleanup function
            return () => {
                window.removeEventListener('resize', checkDevTools);
                window.removeEventListener('mousemove', detectDevToolsConsole);
            };
        };

        preventDevTools();
    }, []);
};

export default usePreventDevTools;