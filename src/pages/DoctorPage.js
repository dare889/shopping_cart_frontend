import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import importAll from '../assets/units/importImages';

const doctorImages = importAll(require.context('../assets/images', false, /\.(PNG|JPG|jpg|png|jpe?g|svg)$/));

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5">
          {doctors.map((doctor, index) => (
            <div key={index} className="col-lg-12 mb-4">
              <div className="doctor-card">
                <div className="row">
                  <div className="col-md-3">
                    <img src={doctorImages[doctor.image]} alt="Doctor" className="doctor-image" />
                  </div>
                  <div className="col-md-6">
                    <div className="doctor-info">
                      <h4>{doctor.name}</h4>
                      <p><strong>{doctor.doctor_category}</strong></p>
                      <p>{doctor.introductory}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="doctor-appointment">
                      <h5>可預約時間</h5>
                      <p>{doctor.start_week} - {doctor.end_week}</p>
                      <p><i className="fa fa-clock-o"></i> {doctor.start_time} - {doctor.end_time}</p>
                      <button className="btn btn-primary">立即預約</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorPage;
