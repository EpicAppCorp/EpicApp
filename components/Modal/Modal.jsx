import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, show }) {
  //it'll render in server first
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false);
  }, []);

  if (!show || !isClient) return null;

  return createPortal(
    <main className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/70 p-10">
      <div className="absolute h-full w-full backdrop-blur-lg" />
      <div className="relative">{children}</div>
    </main>,
    document.querySelector('#modal-root'),
  );
}
