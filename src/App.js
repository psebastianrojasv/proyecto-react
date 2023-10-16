import React, { useState } from "react";
//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import Client from "./Cliente";
import Asociacion from "./Asociacion";


const data = [
  { id: 1, codigo: "asdadw123", nombre: "Paulo Rojas", fecha: 15, descripcion: "Hola Mundo"},
];

const [codigo, setCodigos] = ([useState]);

  const generarCodigos = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const longitud = 8;
    const cantidadCodigos = 5;
    let codigosGenerados = [];

    for (let i = 0; i < cantidadCodigos; i++) {
      let codigoGenerado = "";
      for (let j = 0; j < longitud; j++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigoGenerado += caracteres.charAt(indice);
      }
      codigosGenerados.push(codigoGenerado);
    }

    setCodigos(codigosGenerados);
  };

class App extends React.Component {
  state = {
    data: data,
    form:{
      id:'',
      codigo:'',
      nombre:'',
      fecha:'',
      descripcion:'',
    },
    modalInsertar: false,
    modalEditar: false,
  }

  handleChange=e=>{
  this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value,
    }
  })
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  mostrarModalInsertarCliente=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
  }

  editar = (dato) => {
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id == registro.id) {
        lista[contador].codigo = dato.codigo;
        lista[contador].nombre = dato.nombre;
        lista[contador].fecha = dato.fecha;
        lista[contador].descripcion = dato.descripcion;
      }
      contador++;
    });
    this.setState({ data: lista, modalEditar: false});
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Esta seguro de eliminar el registro "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if (dato.id == registro.id) {
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: lista, modalActualizar: false});
    }
  };


  render() {
    return (
      <>
        <Container>
          <br></br>
          <h1>Proyecto Evol Services</h1>
          <br></br>
          <hr></hr>
          <h2>Medidores</h2>
          <br></br>
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Agregar Nuevo Medidor</Button>
          <br /><br />

          <Table>
            <thead><tr><th>Id</th>
              <th>codigo</th>
              <th>medidor</th>
              <th>Fecha de creación</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr></thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.codigo}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.fecha}</td>
                  <td>{elemento.descripcion}</td>
                  <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"    "}
                    <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
                </tr>
              ))}

            </tbody>
          </Table>

        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Agregar Medidor</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>
            <FormGroup>
              <label>
                Codigó*:
              </label>
              <br></br>
              <Button color="success" onClick={()=>this.generarCodigos()}>Generar Codigo</Button>
              <br></br>
              <input className="form-control" readOnly required name="codigo" type="text" onChange={this.handleChange}/>
              
            </FormGroup>
            <FormGroup>
              <label>
                Nombre*:
              </label>
              <input 
                className="form-control" required name="nombre" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>
                Fecha*:
              </label>
              <input className="form-control" required name="fecha" type="date" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>
                Descripción:
              </label>
              <input className="form-control" required name="descripcion" type="text" onChange={this.handleChange}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=> this.insertar(this.state.form)}>Agregar</Button>
            <Button color="danger" onClick={()=> this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>

        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar Medidor</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>
            <FormGroup>
              <label>
                Codigó*:
              </label>
              <input className="form-control" readOnly required name="codigo" type="text" onChange={this.handleChange} value={this.state.form.codigo}/>
            </FormGroup>
            <FormGroup>
              <label>
                Nombre*:
              </label>
              <input 
                className="form-control" required name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre}/>
            </FormGroup>
            <FormGroup>
              <label>
                Fecha*:
              </label>
              <input className="form-control" required name="fecha" type="date" onChange={this.handleChange} value={this.state.form.fecha}/>
            </FormGroup>
            <FormGroup>
              <label>
                Descripción:
              </label>
              <input className="form-control" required name="descripcion" type="text" onChange={this.handleChange} value={this.state.form.descripcion}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
          
        </Modal>
        
      <div>
        <br></br>
        <hr></hr>
        <Client/>
        <br></br>
        <hr></hr>
        <Asociacion/>
      </div>  
      </>
      
    )
  }
}



export default App;


