import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../styles/Style.css'

export default function Cliente() {

    const baseUrl = 'https://localhost:7282/clientes';

    const [info, setInfo] = useState([]);
    const [clienteSelected, setClienteSelected] = useState({ idCliente: '', nmCliente: '', cidade: '' })
    const [includeModal, setIncludeModal] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    // filtrar dados
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);

    const SearchCliente = (searchValue) => {

        setSearchInput(searchValue);

        if (searchInput !== ' ') {
            const dadosFiltrados = info.filter((item) => {
                return Object.values(item).join('').toLowerCase()
                    .includes(searchInput.toLowerCase())
            });
            setFiltro(dadosFiltrados);
        }
        else {
            setFiltro(info);
        }
    }


    //Listar Clientes
    const getCliente = async () => {
        const data = await fetch(baseUrl)
        const clientes = await data.json();

        setInfo(clientes)
    }

    //Adicionar Novo Cliente
    const postCliente = async () => {
        delete clienteSelected.idCliente;
        await axios.post(baseUrl, clienteSelected)
            .then(res => {
                setInfo(info.concat(res.data));
                openCloseIncludeModal();
            }).catch(err => console.log(err))
    }

    //Editar Cliente
    const editCliente = async () => {
        await axios.put(baseUrl + "/" + clienteSelected.idCliente, clienteSelected)
            .then(res => {
                var response = res.data;
                var dadoRecebido = info;
                dadoRecebido.map(cliente => {
                    if (cliente.idCliente === clienteSelected.idCliente) {
                        cliente.nmCliente = response.nmCliente;
                        cliente.cidade = response.cidade;
                    }
                });
                openCloseEditModal();
            }).catch(err => console.log(err))
    }

    //Excluir Cliente
    const clienteDelete = async () => {
        await axios.delete(baseUrl + '/' + clienteSelected.idCliente)
            .then(res => {
                setInfo(info.filter(cliente => cliente.idCliente !== res.data));
                openCloseModalDelete();
            }).catch(err => console.log(err))
    }


    useEffect(() => {
        getCliente();

    }, [info])

    const handleChange = e => {
        const { name, value } = e.target;
        setClienteSelected({
            ...clienteSelected,
            [name]: value
        });
        console.log(clienteSelected);
    }

    const openCloseIncludeModal = () => {
        setIncludeModal(!includeModal);
    }

    const openCloseEditModal = () => {
        setModalEditar(!modalEditar);
    }

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);
    }

    const selectCliente = (produto, option) => {
        setClienteSelected(produto);
        (option === "Editar") ?
            openCloseEditModal() : openCloseModalDelete();
    }

    return (
        <div className="container">
            <br />
            <h1>Clientes</h1>
            <div style={{ display: ' flex', justifyContent: 'space-between' }}>
                <header>
                    <img alt=''></img>
                    <button onClick={() => openCloseIncludeModal()} className="btn btn-success">Cadastrar Novo Cliente</button>
                </header>
                <form>
                    <input className="searched" type='text'
                        placeholder="Buscar Cliente"
                        onChange={(e) => SearchCliente(e.target.value)} />
                </form>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Cliente Id</th>
                        <th>Nome</th>
                        <th>Cidade</th>
                        <th>Operação</th>
                    </tr>
                </thead>
                {searchInput.length > 0 ? (
                    <tbody>
                        {filtro.map(cliente => (
                            <tr key={cliente.idCliente}>
                                <td>{cliente.idCliente}</td>
                                <td>{cliente.nmCliente}</td>
                                <td>{cliente.cidade}</td>
                                <td>
                                    <button type="button" onClick={() => selectCliente(cliente, "Editar")} class="btn btn-primary">Editar</button>
                                    <button type="button" onClick={() => selectCliente(cliente, "Excluir")} class="btn btn-danger">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        {info.map(cliente => (
                            <tr key={cliente.idCliente}>
                                <td>{cliente.idCliente}</td>
                                <td>{cliente.nmCliente}</td>
                                <td>{cliente.cidade}</td>
                                <td>
                                    <button type="button" onClick={() => selectCliente(cliente, "Editar")} class="btn btn-primary">Editar</button>
                                    <button type="button" onClick={() => selectCliente(cliente, "Excluir")} class="btn btn-danger">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            <Modal isOpen={includeModal}>
                <ModalHeader>Cadastrar Cliente</ModalHeader>
                <ModalBody>
                    <div>
                        <label>Nome: </label>
                        <br />
                        <input required type='text' name="nmCliente" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Cidade: </label>
                        <br />
                        <input required type='text' name="cidade" className="form-control" onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" class="btn btn-outline-primary" onClick={() => postCliente()}>Incluir</button>{"  "}
                    <button type="button" class="btn btn-outline-danger" onClick={() => openCloseIncludeModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Cliente</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Id:</label>
                        <input type='text' readOnly value={clienteSelected && clienteSelected.idCliente} />
                        <br />
                        <label>Nome: </label>
                        <input required type='text' value={clienteSelected && clienteSelected.nmCliente} name="nmCliente" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Cidade: </label>
                        <br />
                        <input required type='text' value={clienteSelected && clienteSelected.cidade} name="cidade" className="form-control" onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" class="btn btn-outline-primary" onClick={() => editCliente()} >Editar</button>{"  "}
                    <button type="button" class="btn btn-outline-danger" onClick={() => openCloseEditModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Confirma a exclusão destes dados? : {clienteSelected && clienteSelected.nmCliente}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => clienteDelete()}>Sim</button>
                    <button className="btn btn-secondary" onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>

        </div>
    )

}