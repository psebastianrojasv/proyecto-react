import React from "react";
//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const data = [
  { id: 1, rut: "15318013-k", nombre: "Paulo Rojas", direccion: "Hola Mundo"},
];

class Client extends React.Component {
  state = {
    data: data,
    form:{
      id:'',
      rut:'',
      nombre:'',
      direccion:'',
    },
    modalInsertar: false,
    modalEditar: false,
  }
  
  handleChangeClient=e=>{
  this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value,
    }
  })
  }

  mostrarModalInsertarClient=()=>{
    this.setState({modalInsertarClient: true});
  }

  ocultarModalInsertarClient=()=>{
    this.setState({modalInsertarClient: false});
  }

  mostrarModalEditarClient=(registro)=>{
    this.setState({modalEditarClient: true, form: registro});
  }

  ocultarModalEditarClient=()=>{
    this.setState({modalEditarClient: false});
  }

  mostrarModalActualizarClient = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  insertarClient=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertarClient: false});
  }

  editarClient = (dato) => {
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id == registro.id) {
        lista[contador].rut = dato.rut;
        lista[contador].nombre = dato.nombre;
        lista[contador].direccion = dato.direccion;
      }
      contador++;
    });
    this.setState({ data: lista, modalEditarClient: false});
  };

  eliminarClient = (dato) => {
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
      this.setState({ data: lista, modalActualizarClient: false});
    }
  };


  render() {
    return (
      <>
        <Container>
          <br></br>
          <h2>Clientes</h2>
          <br></br>
          <Button color="success" onClick={()=>this.mostrarModalInsertarClient()}>Agregar Nuevo Cliente</Button>
          <br /><br />

          <Table>
            <thead><tr><th>Id</th>
              <th>Rut</th>
              <th>Nombre cliente</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr></thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.rut}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.direccion}</td>
                  <td><Button color="primary" onClick={()=>this.mostrarModalEditarClient(elemento)}>Editar</Button>{"    "}
                    <Button color="danger" onClick={()=>this.eliminarClient(elemento)}>Eliminar</Button></td>
                </tr>
              ))}

            </tbody>
          </Table>

        </Container>

        <Modal isOpen={this.state.modalInsertarClient}>
          <ModalHeader>
            <div><h3>Agregar Cliente</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>
            <FormGroup>
              <label>
                Rut*:
              </label>
              <input className="form-control" required name="rut" type="text" onChange={this.handleChangeClient}/>
            </FormGroup>
            <FormGroup>
              <label>
                Nombre*:
              </label>
              <input 
                className="form-control" required name="nombre" type="text" onChange={this.handleChangeClient} />
            </FormGroup>
            <FormGroup>
              <label>
                Dirección*:
              </label>
              <input className="form-control" required name="direccion" type="text" onChange={this.handleChangeClient}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=> this.insertarClient(this.state.form)}>Agregar</Button>
            <Button color="danger" onClick={()=> this.ocultarModalInsertarClient()}>Cancelar</Button>
          </ModalFooter>

        </Modal>

        <Modal isOpen={this.state.modalEditarClient}>
          <ModalHeader>
            <div><h3>Editar Cliente</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>
            <FormGroup>
              <label>
                Rut*:
              </label>
              <input className="form-control" required name="rut" type="text" onChange={this.handleChangeClient} value={this.state.form.rut}/>
            </FormGroup>
            <FormGroup>
              <label>
                Nombre*:
              </label>
              <input 
                className="form-control" required name="nombre" type="text" onChange={this.handleChangeClient} value={this.state.form.nombre}/>
            </FormGroup>
            <FormGroup>
              <label>
                Dirección*:
              </label>
              <input className="form-control" required name="direccion" type="text" onChange={this.handleChangeClient} value={this.state.form.direccion}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editarClient(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditarClient()}>Cancelar</Button>
          </ModalFooter>

        </Modal>
      </>
    )
  }
}

export default Client;
