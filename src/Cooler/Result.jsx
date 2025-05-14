import { useLocation } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const { result } = location.state || {};

    return (
        <div className="result-container">
            <h2>Calculation Result</h2>
            {result ? (
                <div>
                    <p>Calculated Result: {result}</p>

                </div>
            ) : (
                <p>No result found.</p>
            )}
        </div>
    );
};

export default Result;
