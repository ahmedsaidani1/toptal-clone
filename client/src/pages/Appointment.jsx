import React, { useEffect, useState } from 'react';
import WorkforceSidebar from '../components/WorkforceSidebar';
import axios from 'axios';
import { Table, Spinner, Alert, Button, Modal } from 'flowbite-react';
import { FaTrashAlt } from 'react-icons/fa';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/appointments/${appointmentToDelete}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== appointmentToDelete));
      setShowModal(false);
      setAppointmentToDelete(null);
    } catch (error) {
      setError(error.message);
      setShowModal(false);
    }
  };

  const openModal = (id) => {
    setAppointmentToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setAppointmentToDelete(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Section */}
      <WorkforceSidebar tab="appointments" />

      {/* Main Content Section */}
      <div className="flex-grow p-4 mt-5">
        {/* Header Section */}
        <header className="flex justify-center w-full p-1 mt-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">Appointments</h1>
        </header>

        {/* Appointments Table Section */}
        <main className="flex-grow flex items-center justify-center mb-2 w-full">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg w-full max-w-2xl">
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner size="lg" />
              </div>
            ) : error ? (
              <Alert color="failure">
                <span>{error}</span>
              </Alert>
            ) : (
              <Table hoverable className="w-full">
                <Table.Head>
                  <Table.HeadCell className="text-gray-900 dark:text-gray-200">Developer</Table.HeadCell>
                  <Table.HeadCell className="text-gray-900 dark:text-gray-200">Date</Table.HeadCell>
                  <Table.HeadCell className="text-gray-900 dark:text-gray-200">Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
                  {appointments.map((appointment) => (
                    <Table.Row key={appointment._id} className="bg-white dark:bg-gray-700">
                      <Table.Cell className="text-gray-900 dark:text-gray-200">{appointment.developer}</Table.Cell>
                      <Table.Cell className="text-gray-900 dark:text-gray-200">{new Date(appointment.date).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>
                        <Button
                          color="failure"
                          size="sm"
                          onClick={() => openModal(appointment._id)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      <Modal
        show={showModal}
        onClose={closeModal}
      >
        <Modal.Header className="text-gray-900 dark:text-gray-200">
          Confirm Deletion
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this appointment? This action cannot be undone.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Appointments;
