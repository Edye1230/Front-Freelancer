import React, { useEffect, useState } from "react";
import { cloudinaryConfig } from './config';

import axios from "axios";

const App = () => {

const [image, setImage] = useState("https://talent2win.com/wp-content/uploads/2021/09/LogoDefault.png");
const [loading, setLoading] = useState(false);
const [newInvoice, setInvoice] = useState({
  Name: "",
  Title: "",
  Address: "",
  Currency: "",
  TotalAmmount: "",
  Description: "",
  DocName: "",
  DocType: "",
  Logo : "",
});


const uploadImage = async (e) => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", cloudinaryConfig.UPLOAD_PRESET);
  setLoading(true);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const file = await res.json();
  console.log(res);
  setImage(file.secure_url);
  setLoading(false);
};

const appendData = () => {
const formData = new FormData();
    
  formData.append("Currency", document.getElementById("currency").value);
  formData.append("TotalAmmount", document.getElementById("amount").value);
  formData.append("Title", document.getElementById("title").value);
  formData.append("Description", document.getElementById("description").value);
  formData.append("Address", document.getElementById("address").value);
  formData.append("Name", document.getElementById("name").value);
  formData.append("DocType", document.getElementById("docType").value);
  formData.append("DocNumber", document.getElementById("docNumber").value);
  formData.append("Logo", image);

return formData;

}
  const postData = async () => {    
   await axios.post("https://freelancerdeploy1.azurewebsites.net/home/index", appendData())  
  };


   const getPDF = async () => {
     await axios.get("https://freelancerdeploy1.azurewebsites.net/home/create", {
      params: {
        Currency: document.getElementById("currency").value,
        TotalAmmount: document.getElementById("amount").value,
        Title: document.getElementById("title").value,
        Description: document.getElementById("description").value,
        Address: document.getElementById("address").value,
        Name: document.getElementById("name").value,
        DocType: document.getElementById("docType").value,
        DocNumber: document.getElementById("docNumber").value,
        Logo: image,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
        responseType: "arraybuffer",
    })
       
       .then(function (response) {
         // handle success
         const blob = new Blob([response.data], { type: "application/pdf" });
         const link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = "TuRecibo.pdf";
         link.click();
       })
       .catch(function (error) {
         // handle error
         console.log(error);
       });
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    getPDF();
  };
  console.log(image);
  return (
    <div className="container">
      <h1 className="text-center mt-4">Generador de Recibos</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group d-inline-block mr-5">
          <label htmlFor="docType">Tipo de moneda</label>
          <select className="form-control" id="currency">
            <option value="sol">SOL | S/.</option>
            <option value="dolar">USD | $</option>
            <option value="euro">EUR | €</option>
          </select>
        </div>
        <div className="form-group d-inline-block">
          <label htmlFor="amount">Monto a cobrar</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            placeholder="Ingresa el monto a cobrar"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Ingresa el título"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <input
            className="form-control"
            id="description"
            rows="3"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección domicilio</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Ingresa la dirección domicilio"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombres de usuario freelancer</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Ingresa los nombres de usuario freelancer"
          />
        </div>
        <div className="form-group d-inline-block mr-5">
          <label htmlFor="docType">Tipo de documento</label>
          <select className="form-control" id="docType">
            <option>DNI</option>
            <option>PASAPORTE</option>
          </select>
        </div>
        <div className="form-group d-inline-block">
          <label htmlFor="docNumber">N° de documento</label>
          <input
            type="text"
            className="form-control"
            id="docNumber"
            placeholder="Ingresa el n° de documento"
          />
        </div>

        <div className="form-group">
          <input
            id="logo"
            name="file"
            type="file"
            onChange={uploadImage}
            />
         </div>
      
         <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="submit">Generar Recibo</button>
        </div>
      </form>
    </div>
    );

};
export default App;
