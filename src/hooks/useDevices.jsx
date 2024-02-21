import { useEffect, useState } from 'react';

const useDevices = () => {
    const [devices, setDevices] = useState({
        isMobile: false,
        isDesktop: false,
    });

    const handleResize = () => {
        const isMobile = window.innerWidth <= 768;
        const isDesktop = !isMobile;
        setDevices({
            isMobile: isMobile,
            isDesktop: isDesktop,
        });
    };

    useEffect(() => {
        handleResize(); // Xác định loại thiết bị khi component được mount
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return devices;
};

export default useDevices;
