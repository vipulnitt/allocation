import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from './Layout/MetaData';

const Admin = () => {
  

  return (
    <div>
      <MetaData title={'Admin'}/>
    
      <br/>
      <div className='ml-2 container'>
      <Link to="/admin/editnorms">APPLICATION FOR ALLOTMENT OF PG / QIP/ RSB QUARTERS</Link><br/>
<Link to="/admin/quarterallocation">APPLICATION FOR ALLOTMENT / RENEWAL / CHANGE OF RESIDENTIAL QUARTERS</Link>
      </div>

    </div>
  )
}

export default Admin