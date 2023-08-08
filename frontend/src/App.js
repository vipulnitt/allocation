
import React, { useEffect } from "react";
import Header from './components/Layout/Header';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Layout/Home";
import Login from "./components/Login";
import Student from './components/Student/index'
import Admin from "./components/Admin";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/adminAction";
import ProtectedRoute from "./routes/ProtectedRoute";
import Form from "./components/Student/Form";
import EditNorms from "./components/EditNorms";
import QuartersForm from "./components/QuartersForm";
import QuarterAllocation from "./components/QuarterAllocation";
import AdminNotification from "./components/Layout/AdminNotification";
import Quarter from "./components/Student/quarter";
import ProtectedRouteUser from "./routes/ProtectedRoute";
import Adminprofile from "./components/Adminprofile";
import UpdatePassword from "./components/UpdatePassword";
import Form1Data from "./components/Form1Data";
import Form2Data from "./components/Form2Data";
import MetaData from "./components/Layout/MetaData";
import Navbar from "./components/Layout/Navbar/Navbar"
import Pdfdownload from "./components/web/PdfDownload";
const App = () => {
  const {isAuthenticated,loading,user} = useSelector(state=> state.auth);
  const {isUserAuthenticated} = useSelector(state=>state.userAuth);
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
 return (

 <div className="App ">
  <meta name="viewport" content="width=device-width, initial-scale=1" />

       <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      href="//db.onlinewebfonts.com/c/157c6cc36dd65b1b2adc9e7f3329c761?family=Amazon+Ember"
      rel="stylesheet"
      type="text/css"
    />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
    <MetaData title={'NITT'}/>
    
    <Router>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/pdf' Component={Pdfdownload}/>
      <Route path='/admin/login' Component={Login}/>
      <Route path='/staff/quarterallocation' element={
        <ProtectedRouteUser isLoggedIn={isUserAuthenticated}>
          <QuartersForm/>
        </ProtectedRouteUser>
      } exact/>
      <Route path='/student' Component={Student} />
      <Route path='/staff' Component={Quarter}/>
      <Route path='/admin' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <Admin/>
      </ProtectedRoute>
    } exact/>
     <Route path='/profile' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
       <Adminprofile/>
      </ProtectedRoute>
    } exact/>
     <Route path='/admin/updatepassword' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <UpdatePassword/>
      </ProtectedRoute>
    } exact/>
     <Route path='/student/form' element={
      <ProtectedRouteUser isLoggedIn={isUserAuthenticated}>
      <Form/>
    </ProtectedRouteUser>
    } exact/>
     <Route path='/admin/editnorms' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <EditNorms/>
      </ProtectedRoute>
    } exact/>
    <Route path='/admin/form1submissions' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
       <Form1Data/>
       </ProtectedRoute>
    } exact/>
     <Route path='/admin/form2submissions' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
      <Form2Data/>
       </ProtectedRoute>
    } exact/>
    <Route path='/admin/quarterallocation' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <QuarterAllocation/>
      </ProtectedRoute>
    } exact/>
     <Route path='/admin/notification' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
       <AdminNotification/>
      </ProtectedRoute>
    } exact/>
    </Routes>
    </Router>

 

 </div>
 );
};

export default App;
