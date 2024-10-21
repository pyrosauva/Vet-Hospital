import React from 'react';
import { Users, Calendar, DollarSign, Activity, AlertTriangle, Bell } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Patients', value: 1250, icon: Users, color: 'bg-blue-500' },
    { label: 'Appointments Today', value: 28, icon: Calendar, color: 'bg-green-500' },
    { label: 'Revenue This Month', value: '$52,000', icon: DollarSign, color: 'bg-yellow-500' },
    { label: 'Active Cases', value: 45, icon: Activity, color: 'bg-red-500' },
  ];

  const lowStockItems = [
    { name: 'Vaccine A', quantity: 5, reorderPoint: 10 },
    { name: 'Antibiotic B', quantity: 3, reorderPoint: 15 },
  ];

  const upcomingAppointments = [
    { time: '10:00 AM', patient: 'Max', owner: 'John Doe' },
    { time: '11:30 AM', patient: 'Luna', owner: 'Jane Smith' },
    { time: '2:00 PM', patient: 'Rocky', owner: 'Mike Johnson' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className={`inline-flex p-3 rounded-full ${stat.color} text-white mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
            Low Stock Alerts
          </h3>
          <ul className="space-y-4">
            {lowStockItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{item.name}</span>
                <span className="text-red-500 font-semibold">
                  {item.quantity} / {item.reorderPoint}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Bell className="w-6 h-6 text-blue-500 mr-2" />
            Upcoming Appointments
          </h3>
          <ul className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <li key={index} className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-700 mr-2">{appointment.time}</span>
                <span className="font-semibold">{appointment.patient}</span>
                <span className="text-gray-500 ml-2">({appointment.owner})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};