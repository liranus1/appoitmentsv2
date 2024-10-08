import React from 'react'
import { Calendar, LogOut } from 'lucide-react'

interface User {
  name: string;
  is_admin: boolean;
}

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="mr-2" />
          <h1 className="text-2xl font-bold">Appointment Manager</h1>
        </div>
        {user && onLogout && (
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user.name} ({user.is_admin ? 'Admin' : 'User'})</span>
            <button onClick={onLogout} className="flex items-center hover:text-blue-200">
              <LogOut className="mr-1" size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header