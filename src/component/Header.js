import React, { useState, useEffect, useContext, useRef } from "react";
import Axios from "axios";
import { AuthContext } from '../context/Auth';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const Header = () => {
  const tableRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;

  const [aqData, setAQData] = useState({});
  const [ftData, setFTData] = useState({});
  const [ejData, setEJData] = useState({});
  const [bfData, setBFData] = useState({});
  const [mtData, setMTData] = useState({});
  const [bcData, setBCData] = useState({});

  const [average, setAverage] = useState(0);
  const [mtaverage, setMTAverage] = useState(0);
  const [btaverage, setBTAverage] = useState(0);

  const [alphaAverage, setAlphaAverage] = useState(0);
  const [betaAverage, setBetaAverage] = useState(0);
  const [gammaAverage, setGammaAverage] = useState(0);
  const [deltaAverage, setDeltaAverage] = useState(0);
  const [thethaAverage, setthethaAverage] = useState(0);

  useEffect(() => {
    if (currentUser?.email) {
      getAqData();
      getFTData();
      getEJData();
      getBFData();
      getMTData();
      getBCData();
    }
  }, [currentUser]);

  const getAqData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/aqtest/${userId}.json`)
      .then((response) => setAQData(response.data || {}))
      .catch((error) => console.log(error));
  };

  const getFTData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/fingertapping/${userId}.json`)
      .then((response) => {
        const data = response.data || {};
        setFTData(data);
        const entries = Object.entries(data);
        const grandTotal = entries.reduce((acc, [_, value]) => acc + value.score, 0);
        setAverage(entries.length ? grandTotal / entries.length : 0);
      })
      .catch((error) => console.log(error));
  };

  const getEJData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/emojitest/${userId}.json`)
      .then((response) => setEJData(response.data || {}))
      .catch((error) => console.log(error));
  };

  const getBFData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/brainfrequency/${userId}.json`)
      .then((response) => {
        const data = response.data || {};
        setBFData(data);
        const entries = Object.entries(data);
        setAlphaAverage(entries.reduce((acc, [_, value]) => acc + value.alpha, 0) / entries.length || 0);
        setBetaAverage(entries.reduce((acc, [_, value]) => acc + value.beta, 0) / entries.length || 0);
        setGammaAverage(entries.reduce((acc, [_, value]) => acc + value.gamma, 0) / entries.length || 0);
        setDeltaAverage(entries.reduce((acc, [_, value]) => acc + value.delta, 0) / entries.length || 0);
        setthethaAverage(entries.reduce((acc, [_, value]) => acc + value.thetha, 0) / entries.length || 0);
      })
      .catch((error) => console.log(error));
  };

  const getMTData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/memorytest/${userId}.json`)
      .then((response) => {
        const data = response.data || {};
        setMTData(data);
        const entries = Object.entries(data);
        const grandTotal = entries.reduce((acc, [_, value]) => acc + value.total, 0);
        setMTAverage(entries.length ? grandTotal / entries.length : 0);
      })
      .catch((error) => console.log(error));
  };

  const getBCData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/Balltest/${userId}.json`)
      .then((response) => {
        const data = response.data || {};
        setBCData(data);
        const entries = Object.entries(data);
        const grandTotal = entries.reduce((acc, [_, value]) => acc + value.total, 0);
        setBTAverage(entries.length ? grandTotal / entries.length : 0);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="row justify-content-start">
      <div className="col-lg-10">
        <div className="border p-4 shadow">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="mb-4">Patient Name: {currentUser?.displayName}</h1>
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <button className="btn btn-sm btn-success">Export Result</button>
            </DownloadTableExcel>
          </div>
          {Object.keys(ejData).length > 0 ? (
            <table className="table table-striped table-hover table-bordered border-primary" ref={tableRef}>
              <thead>
                <tr>
                  <th colSpan="4"><h6>Patient Name: {currentUser?.displayName}</h6></th>
                </tr>
                <tr>
                  <th scope="col"><h6>Test Type</h6></th>
                  <th scope="col"><h6>Total Score</h6></th>
                  <th scope="col"><h6>Range (Non Autistic)</h6></th>
                  <th scope="col"><h6>Remark</h6></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(aqData).map(([key, value]) => (
                  <tr key={key}>
                    <th scope="row">AQ -10</th>
                    <td>{value.score}</td>
                    <td>Less than 7</td>
                    <td>{value.status === 1 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Finger Tapping</th>
                  <td>{average.toFixed(0)}</td>
                  <td>Between 50 to 60</td>
                  <td>{average >= 50 && average <= 60 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
                {Object.entries(ejData).map(([key, value]) => (
                  <tr key={key}>
                    <th scope="row">Emoji Quiz</th>
                    <td>{value.score}</td>
                    <td>More than 4</td>
                    <td>{value.status === 1 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Memory test</th>
                  <td>{mtaverage.toFixed(0)}%</td>
                  <td>More than 70%</td>
                  <td>{mtaverage >= 70 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
                <tr>
                  <th scope="row">Ball Clicker test</th>
                  <td>{btaverage.toFixed(0)}%</td>
                  <td>More than 70%</td>
                  <td>{btaverage >= 70 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
                <tr>
                  <th colSpan="4">Brain Frequency</th>
                </tr>
                <tr>
                  <th scope="row">Alpha</th>
                  <td>{alphaAverage.toFixed(0)}</td>
                  <td>More than 10%</td>
                  <td>{alphaAverage > 10 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
                <tr>
                  <th scope="row">Beta</th>
                  <td>{betaAverage.toFixed(0)}</td>
                  <td>More than 10%</td>
                  <td>{betaAverage > 10 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
                <tr>
                  <th scope="row">Gamma</th>
                  <td>{gammaAverage.toFixed(0)}</td>
                  <td>More than 10%</td>
                  <td>{gammaAverage > 10 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
                <tr>
                  <th scope="row">Delta</th>
                  <td>{deltaAverage.toFixed(0)}</td>
                  <td>More than 10%</td>
                  <td>{deltaAverage > 10 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
                <tr>
                  <th scope="row">Theta</th>
                  <td>{thethaAverage.toFixed(0)}</td>
                  <td>More than 10%</td>
                  <td>{thethaAverage > 10 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
