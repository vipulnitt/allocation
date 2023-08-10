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

         
          <View style={{marginTop:"2px" ,flexDirection:'row'}}>
          <View style={{marginTop:"2px" ,flex:1}}>
          <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Name:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Staff Number:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Designation:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Department:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Scale of Pay:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Basic Pay drawn per Month:</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Pay Level:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Date of Joining Institute: </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Date of Joining Cadre:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Present Residential Address:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Marital Status:</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Application Type:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> SC Or ST:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Presently Allocated Quarter:  </Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Date of occupation in the present quarters:</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Remarks: </Text>
          </View>
          <View style={{marginTop:"2px" ,flex:1}}>
          <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.name+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.staffNumber+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.designation+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.department+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.scalePay+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.basicPay+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.gradePay+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.joiningInstitute+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.joiningCadre+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.presentResidentialAddress+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.maritalStatus+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.applicationType+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.scOrST+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.quarterPresentlyAllocated+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.occupationDate+" "}</Text>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>{modelData.modelData.remarks+" "}</Text>
          </View>
        
         </View>
         <View>
         <Text style={{fontSize:12, textAlign:'left', marginTop:'4px',  fontFamily: 'Helvetica-Bold'}}> Priority List (StreetNumber / QuarterNumber)</Text>
         {modelData.modelData.priorityChoices.map((choice, index) => (
             
             <Text style={{fontSize:12, textAlign:'left', marginTop:'4px', marginLeft:"1px"}}>{index+1}. { choice.choice.streetNumber} / { choice.choice.quarterNumber}</Text>
            ))}


       
  
        </View>
        <View>
          
<Text style={{fontSize:13, textAlign:'center', marginTop:'4px', fontFamily: 'Helvetica-Bold',  fontWeight: 'bolder'}} >CERTIFICATE</Text>
<Text style={{fontSize:12, textAlign:'left', marginTop:'4px'  ,lineHeight: 1.3 }} >This is to certify that I .......................................................... son/daughter/wife/husband of .......................................................... am working as ......................................... in the section/department of ................................ hereby state that I and/or my spouse do not own and/or inherit a house within a prohibited radial distance of 8 km from the Institute.</Text>
        </View>
      <View>
      
     <View style={{flex:'1',marginTop:"10px"}}>
      <Text  style={{fontSize:12, textAlign:'left', marginTop:'4px'}}>Name of Applicant:</Text>
      <Text  style={{fontSize:12, textAlign:'right', marginTop:'4px', marginRight:"100px"}}>Signature:</Text>
     </View>
     <View style={{flex:'1',marginTop:"20px"}}>
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