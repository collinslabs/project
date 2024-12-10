import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';

type CookieConsentProps = {
  onAccept?: () => void;
  onReject?: () => void;
};

const CookieConsent = ({ onAccept, onReject }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
    }
  }, []);

  const handleAction = (action: 'accept' | 'reject') => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('cookieConsent', action);
      if (action === 'accept') onAccept?.();
      else onReject?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-out
          ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Cookie className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Cookie Preferences</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            We value your privacy! We use cookies to create a more personalized experience 
            and analyze our traffic. Your data is always protected.
          </p>

          <div className="bg-purple-50 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-purple-900 mb-1">Your Privacy Matters</h3>
                <p className="text-sm text-purple-700">
                  You're in control. Choose how you want to share your data with us.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={() => handleAction('reject')}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={() => handleAction('accept')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg 
                transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-100"
            >
              Accept All
            </button>
          </div>
        </div>

        <button
          onClick={() => handleAction('reject')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;