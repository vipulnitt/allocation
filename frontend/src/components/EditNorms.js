import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNorms, exportData, fetchNorms } from '../actions/formAction';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Loader from '../Loader';

const EditNorms = () => {
  const [normsArray, setNorms] = useState([]);
  const [newNorm, setNewNorm] = useState('');
  const dispatch = useDispatch();
  const { norms, loading} = useSelector(state => state.form);

  useEffect(() => {
    dispatch(fetchNorms());
  }, [dispatch]);

  useEffect(() => {
    if (norms) {
      setNorms(norms.map(norm => norm.statement));
    }
  }, [norms]);

  const addNorm = () => {
    if (newNorm.trim() !== '') {
      setNorms(prevNorms => [...prevNorms, newNorm]);
      setNewNorm('');
    }
  };

  const deleteNorm = index => {
    const updatedNorms = normsArray.filter((_, i) => i !== index);
    setNorms(updatedNorms);
  };

  const handleSave = () => {
    const data = normsArray.map(norm => ({ statement: norm }));
    const convertedData = {
      norms: data
    };
    dispatch(editNorms(convertedData));
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Norms have been updated.',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleExport = () => {
    dispatch(exportData());
  };
 const {data}= useSelector(state=>state.res);
  useEffect(() => {
    if (data) {
      customFunction(data.form);
    }
  }, [data]);

  const customFunction = data => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(fileData, 'exported_data.xlsx');
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div>
            <br />
            <button id="ExportData" className="ml-2" onClick={handleExport}>
              Export Data
            </button>
          </div>
          <h2>Norms</h2>
          <ul>
            {normsArray.map((norm, index) => (
              <li key={index}>
                {norm}
                <i className="fa fa-trash btn btn-danger delete_norm" onClick={() => deleteNorm(index)}></i>
              </li>
            ))}
          </ul>
          <div className="norm">
            <input id="normInput" type="text" value={newNorm} onChange={e => setNewNorm(e.target.value)} />
            <br />
            <button id="addnorm" className="ml-2" onClick={addNorm}>
              Add Norm
            </button>
            <br /> <br /> <br />
            <button id="savenorm" className="ml-2" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditNorms;
