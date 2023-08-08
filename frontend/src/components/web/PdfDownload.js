import React from 'react';
import './style.css';
import logo from './logonew.png'
import { Document, Page, Text, View, PDFDownloadLink, PDFViewer, StyleSheet, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const modelData = {
  name: "Vipul Patel",
  staffNumber: "10",
  designation: "HOD",
  department: "htmlFormData.department",
  scalePay: "htmlFormData.scalePay",
  gradePay: "htmlFormData.gradePay",
  basicPay: "htmlFormData.basicPay",
  joiningInstitute: "htmlFormData.joiningInstitute",
  joiningCadre: "htmlFormData.joiningCadre",
  presentResidentialAddress: "htmlFormData.presentResidentialAddress",
  maritalStatus: "htmlFormData.maritalStatus",
  applicationType: "htmlFormData.applicationType",
  scOrST: "htmlFormData.scOrST",
  occupationDate: "htmlFormData.occupationDate",
  remarks: "htmlFormData.remarks",
  priorityChoices: [{"choice":{"streetNumber":"20","quarterNumber":"20"}}],
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  container: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: 2,
    borderBottomColor: 'black',
    paddingBottom: 5,
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  headertext: {
    flex: 1,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
   
  }
});




const Pdfdownload = (modelData) => {
  console.log(JSON.stringify(modelData));
return(
  <>
   <div>
      
    </div>
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src={logo}
            alt="My Logo"
          />
          <View style={styles.headertext}>
            <Text style={styles.text}>
              <Text style={{ fontSize: 15, fontFamily: 'Helvetica-Bold', textAlign: 'center' }}>
                QUARTERS ALLOTMENT ADVISORY COMMITTEE{'\n'}
                NATIONAL INSTITUTE OF TECHNOLOGY TIRUCHIRAPPALLI
              </Text>
            </Text>
            
          </View>
        </View>

      </View>
     <View style={{ flexDirection: 'row' }}>
      <Text  style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>Date: ____________</Text>
      <Text  style={{fontSize:12, marginLeft:'10px', marginTop:'4px'}}> Advt. No: ______________ </Text>
      <Text  style={{fontSize:12, marginLeft:'10px', marginTop:'4px'}}> Application No.: _____________(for office use only) </Text>
     </View>
      <View style={{marginTop:"15px"}}>
          <Text style={{fontSize:13,fontFamily: 'Helvetica-Bold', textAlign:'center'}}>APPLICATION FOR ALLOTMENT / RENEWAL / CHANGE OF RESIDENTIAL QUARTERS</Text>
          </View>

         
          <View style={{marginTop:"2px"}}>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Name:  {modelData.modelData.name}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Staff Number:  {modelData.modelData.staffNumber}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Designation:  {modelData.modelData.designation}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Department:  {modelData.modelData.department}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Scale of Pay:  {modelData.modelData.scalePay}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Basic Pay drawn per Month:  {modelData.modelData.basicPay}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Pay Level:  {modelData.modelData.gradePay}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Date of Joining Institute:  {modelData.modelData.joiningInstitute}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Date of Joining Cadre:  {modelData.modelData.joiningCadre}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Present Residential Address:  {modelData.modelData.presentResidentialAddress}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Marital Status:  {modelData.modelData.maritalStatus}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Application Type:  {modelData.modelData.applicationType}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> SC Or ST:  {modelData.modelData.scOrST}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Date of occupation in the present quarters:  {modelData.modelData.occupationDate}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Remarks:  {modelData.modelData.remarks}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}> Priority List (StreetNumber / QuarterNumber)</Text>
         {modelData.modelData.priorityChoices.map((choice, index) => (
             
             <Text style={{fontSize:12, textAlign:'left', marginTop:'4px', marginLeft:"1px"}}>{index+1}. { choice.choice.streetNumber} / { choice.choice.quarterNumber}</Text>
            ))}


       
  
        </View>
        <View>
          
<Text style={{fontSize:13, textAlign:'center', marginTop:'4px', fontFamily: 'Helvetica-Bold',  fontWeight: 'bolder'}} >CERTIFICATE</Text>
<Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}} >This is to certify that I .......................................................... son/daughter/wife/husband of .......................................................... am working as ......................................... in the section/department of ................................ hereby state that I and/or my spouse do not own and/or inherit a house within a prohibited radial distance of 8 km from the Institute.</Text>
        </View>
      <View>
      
     <View style={{flex:'1',marginTop:"10px"}}>
      <Text  style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>Name of Applicant:</Text>
      <Text  style={{fontSize:12, textAlign:'right', marginTop:'4px', marginRight:"100px"}}>Signature:</Text>
     </View>
     <View style={{flex:'1',marginTop:"10px"}}>
      <Text  style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>Place:</Text>
      <Text  style={{fontSize:12, textAlign:'right', marginTop:'4px', marginRight:"100px"}}>Date:</Text>
     </View>
      </View>
     
        

    </Page>
  </Document>
  </PDFViewer>
  </>
)

}


export default Pdfdownload;