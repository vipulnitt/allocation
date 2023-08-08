import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, deleteNotification, downloadPdf, fetchNotification } from '../../actions/adminAction';
import { Link } from 'react-router-dom';

const AdminNotification = () => {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  
  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  const { notification, loading } = useSelector(state => state.Notifications);
  
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('statement', input);
    dispatch(addNotification(formData));
  };
  
  const handleDownload = (arg) => {
    const data = { "filepath": arg };
    dispatch(downloadPdf(data));
  };
  
  const handleDelete = (id) => {
    console.log(id + "");
    const data = { "id": id };
    dispatch(deleteNotification(data)).then(() => {
      // Fetch the updated list of notifications
      dispatch(fetchNotification());
    });
  };
  
  return (
    <Fragment>
      <div>
        <h2>Notifications</h2>
        <ul>
          {Array.isArray(notification) && notification.map((c, index) => (
            <li key={index}>
              {c.file ? (
                <>
                  <Link onClick={() => handleDownload(c.file)}>{c.statement}</Link>&nbsp;
                </>
              ) : (
                <>{c.statement}</>
              )}
              <i className="bi bi-x-circle-fill" onClick={() => handleDelete(c._id)}></i>
            </li>
          ))}
        </ul>
      </div>
      <div className="small-container mt-5">
        <input type="text" value={input} onChange={handleInputChange} />
        <input type="file" id="myFile" name="filename" onChange={handleFileChange} />
        <button className="ml-2"  style={{backgroundColor:'#041570'}} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </Fragment>
  );
};

export default AdminNotification;
