import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  species: string;
  breed: string;
  owner: string;
  lastVisit: string;
}

export const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'Max', species: 'Dog', breed: 'Labrador', owner: 'John Doe', lastVisit: '2023-03-15' },
    { id: 2, name: 'Luna', species: 'Cat', breed: 'Siamese', owner: 'Jane Smith', lastVisit: '2023-03-20' },
    { id: 3, name: 'Rocky', species: 'Dog', breed: 'German Shepherd', owner: 'Mike Johnson', lastVisit: '2023-03-18' },
    { id: 4, name: 'Bella', species: 'Cat', breed: 'Persian', owner: 'Emily Brown', lastVisit: '2023-03-22' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEdit = (patient: Patient | null) => {
    setCurrentPatient(patient);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentPatient) {
      if (currentPatient.id) {
        setPatients(patients.map(p => p.id === currentPatient.id ? currentPatient : p));
      } else {
        setPatients([...patients, { ...currentPatient, id: patients.length + 1 }]);
      }
    }
    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <button
          onClick={() => handleAddEdit(null)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Patient
        </button>
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.species}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.breed}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.owner}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.lastVisit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleAddEdit(patient)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {currentPatient?.id ? 'Edit Patient' : 'Add New Patient'}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                value={currentPatient?.name || ''}
                onChange={(e) => setCurrentPatient({ ...currentPatient!, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Species"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                value={currentPatient?.species || ''}
                onChange={(e) => setCurrentPatient({ ...currentPatient!, species: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Breed"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                value={currentPatient?.breed || ''}
                onChange={(e) => setCurrentPatient({ ...currentPatient!, breed: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Owner"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                value={currentPatient?.owner || ''}
                onChange={(e) => setCurrentPatient({ ...currentPatient!, owner: e.target.value })}
                required
              />
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                value={currentPatient?.lastVisit || ''}
                onChange={(e) => setCurrentPatient({ ...currentPatient!, lastVisit: e.target.value })}
                required
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};