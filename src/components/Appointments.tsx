import React, { useState } from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';

export const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    { id: 1, time: '09:00 AM', patient: 'Max', owner: 'John Doe', reason: 'Annual Checkup' },
    { id: 2, time: '10:30 AM', patient: 'Luna', owner: 'Jane Smith', reason: 'Vaccination' },
    { id: 3, time: '02:00 PM', patient: 'Rocky', owner: 'Mike Johnson', reason: 'Dental Cleaning' },
    { id: 4, time: '03:30 PM', patient: 'Bella', owner: 'Emily Brown', reason: 'Follow-up' },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Appointments</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          New Appointment
        </button>
      </div>
      <div className="flex items-center mb-4">
        <Calendar className="w-6 h-6 mr-2 text-blue-500" />
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      <h3 className="text-xl font-semibold mb-4">{formatDate(selectedDate)}</h3>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-400" />
                    {appointment.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.patient}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.owner}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};