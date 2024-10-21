import React from 'react';
import { UserCircle, Mail, Phone } from 'lucide-react';

export const Staff: React.FC = () => {
  const staffMembers = [
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Veterinarian', email: 'sarah.johnson@vetclinic.com', phone: '(555) 123-4567' },
    { id: 2, name: 'Michael Lee', role: 'Veterinary Technician', email: 'michael.lee@vetclinic.com', phone: '(555) 234-5678' },
    { id: 3, name: 'Emily Davis', role: 'Receptionist', email: 'emily.davis@vetclinic.com', phone: '(555) 345-6789' },
    { id: 4, name: 'Dr. David Wilson', role: 'Veterinarian', email: 'david.wilson@vetclinic.com', phone: '(555) 456-7890' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Staff</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMembers.map((staff) => (
          <div key={staff.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <UserCircle className="w-12 h-12 text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">{staff.name}</h3>
                <p className="text-gray-600">{staff.role}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2" />
                <span>{staff.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2" />
                <span>{staff.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};