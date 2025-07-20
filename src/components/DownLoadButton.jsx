import React, { useState, useEffect } from 'react';

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showiOSPrompt, setShowiOSPrompt] = useState(false);

  const isIOS = () => /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  const isInStandaloneMode = () =>
    'standalone' in window.navigator && window.navigator.standalone;

  useEffect(() => {
    // For Android / Chrome
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS Safari
    if (isIOS() && !isInStandaloneMode()) {
      setShowiOSPrompt(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    } else {
      console.log('User dismissed the PWA install prompt');
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <button onClick={handleInstallClick} style={styles.button}>
          📲 Install App
        </button>
      )}

      {showiOSPrompt && (
        <div style={styles.iosPrompt}>
          📱 To install this app: Tap <strong>Share</strong> then <strong>Add to Home Screen</strong>.
        </div>
      )}
    </>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  iosPrompt: {
    padding: '10px 15px',
    backgroundColor: '#fff3cd',
    color: '#856404',
    border: '1px solid #ffeeba',
    borderRadius: '5px',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default InstallPWAButton;
