import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { downloadPdf, fetchNotification } from '../../actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';

const NoticeBoard = () => {
  const dispatch = useDispatch();
  const { notification, loading } = useSelector(state => state.Notifications);
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setNotices(notification);
    }
  }, [loading, notification]);

  const handleDownload = (arg) => {
    const data = { "filepath": arg };
    dispatch(downloadPdf(data));
  };

  return (
    <div className="card mb-2 w-100 h-100">
      <div className="card-header notificationbg " style={{backgroundColor: '#041570'}}>
        <span className="text-white notification">
          <i className="fa fa-bullhorn"></i> Notice Board 
        </span>
      </div>
      <div className="card-body notificationbody border border-primary notice-board" >
        <div className="marquee">
          {notices &&
            notices.map((notice, index) => (
              <div key={index} className="marquee-item">
                <i className="fa fa-info-circle"></i>
                {notice.file ? (
                  <Link onClick={() => handleDownload(notice.file)}>
                    {notice.statement}
                  </Link>
                ) : (
                  <>{notice.statement}</>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
