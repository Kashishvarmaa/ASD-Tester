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
      <div className="col-lg-12 mb-4">
      <div className="border p-4 shadow d-flex flex-column h-100">
      <div className="flex-grow-1">
          <div className="d-flex justify-content-between mb-3">
            <h4 className="mb-4">
            Hey, {currentUser?.displayName}!!
            <br>

            </br> Ready to dive into “Autism Detector,” where fun and insight collide? 😎 The ultimate autism quiz is calling your name—get ready to challenge yourself and learn something new! 🧠✨ And that’s not all! Chat with our awesome Gemini-powered bot (because AI pals are just cool 🤖), and test your skills with games like finger tapping, emoji guessing, memory challenges, and ball clicking.
            <br>
            </br> 🎯 It’s a total brain party, and you’re invited! Let’s get started and see what’s up! 🚀🎈
            </h4>
            <div className="d-flex justify-content-center mt-auto">
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <button className="btn btn-sm btn-success">Export Result</button>
            </DownloadTableExcel>
          </div>
          </div>
          </div>
          {Object.keys(ejData).length > 0 ? (
            <table className="table table-striped table-hover table-bordered border-primary" ref={tableRef}>
              <thead>
                <tr>
                  <th colSpan="4"><h6>Name: {currentUser?.displayName}</h6></th>
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
                
              </tbody>
            </table>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
