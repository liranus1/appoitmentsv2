import React from 'react'
import { Calendar, Users, BarChart2, Settings } from 'lucide-react'

interface SidebarProps {
  setActiveView: (view: string) => void;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveView, isAdmin }) => {
  return (
    <aside className="bg-gray-800 text-white w-64 p-6">
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveView('calendar')}
              className="flex items-center space-x-2 hover:text-blue-300 w-full text-left"
            >
              <Calendar size={20} />
              <span>Calendar</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveView('appointments')}
              className="flex items-center space-x-2 hover:text-blue-300 w-full text-left"
            >
              <Users size={20} />
              <span>Appointments</span>
            </button>
          </li>
          {isAdmin && (
            <>
              <li>
                <button
                  onClick={() => setActiveView('customers')}
                  className="flex items-center space-x-2 hover:text-blue-300 w-full text-left"
                >
                  <Users size={20} />
                  <span>Customers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('reports')}
                  className="flex items-center space-x-2 hover:text-blue-300 w-full text-left"
                >
                  <BarChart2 size={20} />
                  <span>Reports</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar