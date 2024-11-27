import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { User } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);  // Error state
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          console.log("User is signed in:", user.uid);
          setUser(user);
          setLoading(false);
        } else {
          console.log("No user signed in");
          setUser(null);
        }
      },
      (err) => {
        console.error('Error during authentication state change:', err);
        setError('Error during authentication. Please try again.');
      }
    );

    return () => unsubscribe();
  }, []);

  return { user, error,loading  }; // Return error as well
}
