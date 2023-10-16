import React from "react";
//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';


const data = [
  { codigo: "asdadw123", rut: "15318013-k"},
];

/*const asociarClienteMedidor = async (idCliente, idMedidor) => {
    try {
      const query = 'INSERT INTO asociacion_cliente_medidor (id_cliente, id_medidor) VALUES ($1, $2)';
      await db.none(query, [idCliente, idMedidor]);
      console.log('Cliente asociado al medidor correctamente');
    } catch (error) {
      console.error('Error al asociar el cliente al medidor:', error);
      throw error;
    }
  };

  const obtenerMedidoresCliente = async (idCliente) => {
    try {
      const query = 'SELECT m.* FROM medidores m INNER JOIN asociacion_cliente_medidor a ON m.id = a.id_medidor WHERE a.id_cliente = $1';
      const medidores = await db.any(query, [idCliente]);
      return medidores;
    } catch (error) {
      console.error('Error al obtener los medidores del cliente:', error);
      throw error;
    }
  };

  const verificarLimiteMedidoresCliente = async (idCliente) => {
    try {
      const query = 'SELECT COUNT(*) FROM asociacion_cliente_medidor WHERE id_cliente = $1';
      const count = await db.one(query, [idCliente], (data) => +data.count);
      return count >= 3;
    } catch (error) {
      console.error('Error al verificar el límite de medidores del cliente:', error);
      throw error;
    }
  };

  const agregarMedidorCliente = async (idCliente, idMedidor) => {
    try {
      const limiteAlcanzado = await verificarLimiteMedidoresCliente(idCliente);
      if (!limiteAlcanzado) {
        await asociarClienteMedidor(idCliente, idMedidor);
        console.log('Medidor asociado al cliente correctamente');
      } else {
        console.log('El cliente ya tiene tres medidores asociados');
      }
    } catch (error) {
      console.error('Error al agregar el medidor al cliente:', error);
    }
  };*/


class Asociacion extends React.Component {
  state = {
    data: data,
    form:{
      codigo:'',
      rut:'',
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
        lista[contador].rut = dato.rut;
      }
      contador++;
    });
    this.setState({ data: lista, modalEditar: false});
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Esta seguro de eliminar la asociacion que tiene el cliente con rut: "+dato.rut );
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
          
          <h2>Asociación entre Cliente y Medidor</h2>
          <br></br>
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Asociar</Button>
          <br /><br />

          <Table>
            <thead><tr><th>Codigó del Medidor</th>
              <th>Rut del Cliente</th>
              <th>Acciones</th>
            </tr></thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.codigo}</td>
                  <td>{elemento.rut}</td>
                  <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"    "}
                    <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
                </tr>
              ))}

            </tbody>
          </Table>

        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Realizar Asociacion</h3></div>
          </ModalHeader>

          <ModalBody>
          <FormGroup>
              <label>
                Codigó Medidor*:
              </label>
              <input className="form-control" required name="codigo" type="text" onChange={this.handleChange} />
            </FormGroup>
            
            <FormGroup>
              <label>
                Rut del Cliente*:
              </label>
              <input className="form-control" required name="rut" type="text" onChange={this.handleChangeClient}/>
            </FormGroup>
            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=> this.insertar(this.state.form)}>Agregar</Button>
            <Button color="danger" onClick={()=> this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>

        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar Asociacion</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Codigó*:
              </label>
              <input className="form-control" required name="codigo" type="text" onChange={this.handleChange} value={this.state.form.codigo}/>
            </FormGroup>
            
            <FormGroup>
              <label>
                Rut*:
              </label>
              <input className="form-control" required name="rut" type="text" onChange={this.handleChangeClient} value={this.state.form.rut}/>
            </FormGroup>
            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
          
        </Modal>
         
      </>
      
    )
  }
}



export default Asociacion;


