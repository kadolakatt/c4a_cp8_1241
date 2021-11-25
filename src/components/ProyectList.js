import ProyectListItem from "./ProyectListItem";
import Paginator from "./Paginator";
import FormProyecto from "./FormProyecto";

import { Modal } from 'react-bootstrap';
import { Fragment, useState } from "react";

function ProyectList(props) {

    const vProyectos = props.proyectos;
    //const [show, setShow] = useState(false);
    const [ paramModal, setParamModal ] = useState({
        titulo: "",
        mostrar: false,
        modo: "nuevo",
        onGuardar: null,
        proyecto: null
    });
  
    const onCancelarModal = function () {
        const paramNuevos = {...paramModal};
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    } 
    const onRegistrarProyecto = function (evt) {
        evt.preventDefault();
        const paramNuevos = {...paramModal};
        paramNuevos.modo = "nuevo";
        paramNuevos.mostrar = true;
        paramNuevos.titulo = "Registrar Proyecto";
        paramNuevos.onGuardar=props.agregarProyecto;
        setParamModal(paramNuevos);
    }

    const onEditarProyecto = function (proyect) {
        const paramNuevos = {...paramModal};
        paramNuevos.modo = "editar";
        paramNuevos.mostrar = true;
        paramNuevos.titulo = "Actualizar Proyecto";
        paramNuevos.onGuardar=props.actualizarProyecto;
        paramNuevos.proyecto = proyect;
        setParamModal(paramNuevos);
    }
    //Modificamos la forma como enviamos props a nuestra lista de componentes ProyectListItem
    /*const listaProyectos = vProyectos.map ( p => 
            <ProyectListItem 
                id= { p.id }
                nombre = { p.nombre }
                descripcion = { p.descripcion }
                fecha = { p.fecha }
                director = { p.director }
            />
        );
    */
    //Esta forma de enviar los props hace lo mismo que la de arriba
    //pero al utilizar destructuracion se vuelve más dinamica porque 
    //cualquier atributo nuevo de proyecto va a ser enviado automaticamente 
    //como prop a ProyectListItem
    const listaProyectos = vProyectos.map ( p => 
        <ProyectListItem 
            key={ p.id }
            completarProyecto={ props.completarProyecto } 
            eliminarProyecto={ props.eliminarProyecto }
            editarProyecto={ onEditarProyecto }
            {...p}
        />
    );

    return (
        <Fragment>
            <div className="container">
                <div className="card mt-lg-5">
                    <div className="card-body">
                        <button className="btn btn-success float-sm-end"
                                onClick={ onRegistrarProyecto }>
                            Registrar Proyecto
                        </button>
                        <h3>Dashboard</h3>
                        <h5 className="text-muted">Bienvenido al sistema</h5>
                    </div>
                </div>
                <div className="list-group mt-lg-5">{listaProyectos}</div>
                <Paginator />
                <Modal show={ paramModal.mostrar } onHide={onCancelarModal} >
                    <Modal.Header closeButton className="bg-primary text-white">
                        <Modal.Title>{ paramModal.titulo }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormProyecto modo={paramModal.modo}
                                      onCancelar={ onCancelarModal }
                                      onGuardar={ paramModal.onGuardar }
                                      proyecto={ paramModal.proyecto } />
                    </Modal.Body>
                </Modal>
            </div>
        </Fragment>
        
    );
}

export default ProyectList;