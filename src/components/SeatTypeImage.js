import { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../constants/routes';

const SeatTypeImage = ({ seatTypeId }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        axios.get(`${routes}/seatType/image/${seatTypeId}`)
            .then(response => setImageSrc(response.data.image))
            .catch(error => console.error('Error fetching image:', error));
    }, [seatTypeId]);

    return imageSrc ? <img src={imageSrc} alt="Seat Type" className="seat-image" /> : <p>Loading...</p>;
};
