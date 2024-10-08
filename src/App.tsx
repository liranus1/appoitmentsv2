import React, { useState, useEffect } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CalendarComponent from './components/Calendar'
import AppointmentForm from './components/AppointmentForm'
import CustomerList from './components/CustomerList'
import Reports from './components/Reports'
import Login from './components/Login'
import Register from './components/Register'

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('calendar')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'check_login' }),
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'logout' }),
        credentials: 'include',
      });
      setUser(null);
      setActiveView('login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          {activeView === 'login' ? (
            <Login setUser={setUser} setActiveView={setActiveView} />
          ) : (
            <Register setActiveView={setActiveView} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar setActiveView={setActiveView} isAdmin={user.is_admin} />
        <main className="flex-1 p-6">
          {activeView === 'calendar' && <CalendarComponent />}
          {activeView === 'appointments' && <AppointmentForm />}
          {activeView === 'customers' && user.is_admin && <CustomerList />}
          {activeView === 'reports' && user.is_admin && <Reports />}
        </main>
      </div>
    </div>
  )
}

export default App