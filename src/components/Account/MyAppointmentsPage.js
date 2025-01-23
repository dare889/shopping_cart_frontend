import React, { useState, useEffect } from 'react';
import '../../assets/css/MyAppointmentsPage.css';

const appointmentsData = [
  {
    date: '2024-07-02',
    name: '張賢君',
    gender: 'Female',
    birthYear: '1980',
    email: 'example@example.com',
    phone: '123456789',
    appointmentTime: '10:00 AM',
    status: 'Pending',
    doctor: '張賢君醫師',
    actions: 'Cancel'
  },
  // Add more sample data as needed
];

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments data from an API or use local data
    setAppointments(appointmentsData);
  }, []);

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <h2>我的醫師預約記錄</h2>
        <div className="appointments-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>日期</th>
                <th>名字</th>
                <th>性別</th>
                <th>出生年份</th>
                <th>郵箱</th>
                <th>聯繫電話</th>
                <th>預約時間</th>
                <th>狀態</th>
                <th>預約醫師</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>{appointment.date}</td>
                    <td>{appointment.name}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.birthYear}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.phone}</td>
                    <td>{appointment.appointmentTime}</td>
                    <td>{appointment.status}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.actions}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">沒有數據</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyAppointmentsPage;
