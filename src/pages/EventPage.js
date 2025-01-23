import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';

const EventPage = () => {
  const [years, setYears] = useState([]);
  const [events, setEvents] = useState({});
  const [eventsImages, setEventsImages] = useState({});
  const [selectedYear, setSelectedYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/events/years`);
        let fetchedYears = response.data;

        // Move '較早年份' to the end of the list
        fetchedYears = fetchedYears.filter(year => year.meta_title !== '較早年份');
        fetchedYears.push({ category_id: '10', meta_title: '較早年份' });

        setYears(fetchedYears);
        setSelectedYear(fetchedYears[0].category_id); // Default to the first year
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/events/desc`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchEventsImages = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/events`);
        const imagesMap = {};
        response.data.forEach(event => {
          imagesMap[event.post_id] = event.image;
        });
        setEventsImages(imagesMap);
      } catch (error) {
        console.error('Error fetching event images:', error);
      }
    };

    fetchYears();
    fetchEvents();
    fetchEventsImages();
  }, []);

  const filteredEvents = events[selectedYear] || [];

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIdx = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIdx, startIdx + eventsPerPage);

  const handleViewMore = (postId) => {
    navigate(`/events/${postId}`);
  };

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5">
          <div className="col-lg-3">
            <div className="sidebar">
              <input type="text" className="search-input form-control mb-3" placeholder="輸入關鍵字" />
              <ul className="year-list list-group">
                {years.map((year) => (
                  <li
                    key={year.category_id}
                    className={`year-item list-group-item ${selectedYear === year.category_id ? 'active' : ''}`}
                    onClick={() => { setSelectedYear(year.category_id); setCurrentPage(1); }}
                  >
                    {year.meta_title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="event-list row gx-4 gx-lg-5">
              {currentEvents.map((event) => (
                <div key={event.post_id} className="col-md-6 col-lg-4 mb-5">
                  <div className="card h-100 event-card">
                    <img
                      src={eventsImages[event.post_id] ? `${config.backendUrl}/${eventsImages[event.post_id]}` : 'event_image_placeholder.jpg'}
                      alt={event.name}
                      className="card-img-top event-image"
                    />
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{event.name}</h5>
                        <p className="event-date">{event.keyword}</p>
                      </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <button className="btn btn-outline-dark mt-auto" onClick={() => handleViewMore(event.post_id)}>查看更多</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(1)}>«</button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>‹</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>›</button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(totalPages)}>»</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventPage;
