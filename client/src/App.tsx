import React, { useEffect, useState } from 'react';
import './style.css';
import Pagination from './Pagination';
import { EstateInterface } from './interfaces/Estate';

const App: React.FC = () => {
    
    const [estates, setEstates] = useState<EstateInterface[]>([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const url = 'http://localhost:3000/api/estate';

    useEffect(() => {
        fetch(`${url}?page=${page}&limit=10`)
            .then((response) => response.json())
            .then((data) => {
                setEstates(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [page]);

    useEffect(() => {
        fetch(`${url}?page=${page + 1}&limit=10`)
            .then((response) => response.json())
            .then((data) => {
                setHasNextPage(data.length > 0);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [page]);

    useEffect(() => {
        setHasPreviousPage(page > 1);
    }, [page]);

    const urlSRealityDetail = 'https://www.sreality.cz/detail/1/2/3/4';

    return (
        <div className="container">
            <h1>Offers</h1>
            <Pagination
                page={page}
                setPage={setPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
            />
            <div className="content">
                <table>
                    <thead>
                    <tr>
                        <th>Link to Sreality</th>
                        <th>Title</th>
                        <th>Thumbnail</th>
                    </tr>
                    </thead>
                    <tbody>
                    {estates.map((estate) => (
                        <tr key={estate.id}>
                            <td>
                                <a
                                    href={`${urlSRealityDetail}/${estate.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="estate-link"
                                >
                                    {estate.id}
                                </a>
                            </td>
                            <td>{estate.name}</td>
                            <td>
                                <img
                                    src={estate.image_link}
                                    alt={estate.name}
                                    className="thumbnail"
                                    loading="lazy"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
            />
        </div>
    );
};

export default App;
