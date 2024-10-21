import React, { useState } from 'react';
import { DollarSign, FileText, Plus } from 'lucide-react';

interface Invoice {
  id: number;
  patientName: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export const Billing: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, patientName: 'Max', date: '2023-03-15', amount: 150, status: 'Paid' },
    { id: 2, patientName: 'Luna', date: '2023-03-20', amount: 200, status: 'Pending' },
    { id: 3, patientName: 'Rocky', date: '2023-03-18', amount: 180, status: 'Overdue' },
    { id: 4, patientName: 'Bella', date: '2023-03-22', amount: 120, status: 'Paid' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);

  const handleAddEdit = (invoice: Invoice | null) => {
    setCurrentInvoice(invoice || { id: 0, patientName: '', date: '', amount: 0, status: 'Pending' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentInvoice) {
      if (currentInvoice.id) {
        setInvoices(invoices.map(inv => inv.id === currentInvoice.id ? currentInvoice : inv));
      } else {
        setInvoices([...invoices, { ...currentInvoice, id: invoices.length + 1 }]);
      }
    }
    setIsModalOpen(false);
    setCurrentInvoice(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Billing</h2>
        <button
          onClick={() => handleAddEdit(null)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Invoice
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">${invoice.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleAddEdit(invoice)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FileText className="w-5 h-5" />
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
              {currentInvoice?.id ? 'Edit Invoice' : 'New Invoice'}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Patient Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                value={currentInvoice?.patientName || ''}
                onChange={(e) => setCurrentInvoice({ ...currentInvoice!, patientName: e.target.value })}
                required
              />
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                value={currentInvoice?.date || ''}
                onChange={(e) => setCurrentInvoice({ ...currentInvoice!, date: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                value={currentInvoice?.amount || ''}
                onChange={(e) => setCurrentInvoice({ ...currentInvoice!, amount: parseFloat(e.target.value) })}
                required
              />
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                value={currentInvoice?.status || 'Pending'}
                onChange={(e) => setCurrentInvoice({ ...currentInvoice!, status: e.target.value as 'Paid' | 'Pending' | 'Overdue' })}
                required
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
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