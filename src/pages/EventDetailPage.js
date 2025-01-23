import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../config';

const EventDetailPage = () => {
  const { post_id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/events/${post_id}`);
        setEvent(response.data);
      } catch (error) {
        setError('Error fetching event details');
      }
    };

    fetchEventDetails();
  }, [post_id]);

  if (error) {
    return <div className="container mt-5"><h2>{error}</h2></div>;
  }

  if (!event) {
    return <div className="container mt-5"><h2>Loading...</h2></div>;
  }

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row">
          <div className="col-md-12">
            <h2>{event.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailPage;
