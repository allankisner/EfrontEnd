import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../styles/Style.css'


export default function Venda() {

    const baseUrl = 'https://localhost:7282/vendas';

    const [info, setInfo] = useState([]);
    const [vendaSelected, setVendaSelected] = useState
        ({ idVenda: '', idCliente: '', idProduto: '', qtdVenda: '', vlrUnitarioVenda: '', dthVenda: '', vlrTotalVenda: '' })
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

    const getVenda = async () => {
        const data = await fetch(baseUrl)
        const vendas = await data.json();

        setInfo(vendas)
    }

    //Cria Venda
    const postVenda = async () => {
        delete vendaSelected.idVenda;
        await axios.post(baseUrl, vendaSelected)
            .then(res => {
                setInfo(info.concat(res.data));
                openCloseIncludeModal();
            }).catch(err => console.log(err))
    }

    //Editar Cliente
    const editVenda = async () => {
        await axios.put(baseUrl + "/" + vendaSelected.idVenda, vendaSelected)
            .then(res => {
                var response = res.data;
                var dadoRecebido = info;
                dadoRecebido.map(venda => {
                    if (venda.idVenda === vendaSelected.idVenda) {
                        venda.idCliente = response.idCliente;
                        venda.idProduto = response.idProduto;
                        venda.qtdVenda = response.idCliente;
                        venda.vlrUnitarioVenda = response.vlrUnitarioVenda
                        venda.dthVenda = response.dthVenda;
                        venda.vlrTotalVenda = response.vlrTotalVenda;
                    }
                });
                openCloseEditModal();
            }).catch(err => console.log(err))
    }

    //Excluir Venda
    const vendaDelete = async () => {
        await axios.delete(baseUrl + '/' + vendaSelected.idVenda)
            .then(res => {
                setInfo(info.filter(venda => venda.idVenda !== res.data));
                openCloseModalDelete();
            }).catch(err => console.log(err))
    }


    useEffect(() => {
        getVenda();
    }, [])

    const handleChange = e => {
        const { name, value } = e.target;
        setVendaSelected({
            ...vendaSelected,
            [name]: value
        });
        console.log(vendaSelected);
    }

    //modal create
    const openCloseIncludeModal = () => {
        setIncludeModal(!includeModal);
    }

    //modal edit
    const openCloseEditModal = () => {
        setModalEditar(!modalEditar);
    }

    //modal remove
    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);
    }

    const selectVenda = (venda, option) => {
        setVendaSelected(venda);
        (option === "Editar") ?
            openCloseEditModal() : openCloseModalDelete();
    }


    return (
        <div className="container">
            <br />
            <h1>Vendas</h1>
            <div style={{ display: ' flex', justifyContent: 'space-between' }}>
            <header>
                <img alt=''></img>
                <button onClick={() => openCloseIncludeModal()} className="btn btn-success">Cadastrar Novo Venda</button>
            </header>
            <form>
                    <input className="searched" type='text'
                        placeholder="Procurar Venda"
                        onChange={(e) => SearchCliente(e.target.value)} />
                </form>
                </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Venda Id</th>
                        <th>Id Cliente</th>
                        <th>Id Produto</th>
                        <th>Qtd Venda</th>
                        <th>Valor Unitario da Venda</th>
                        <th>Data da Venda</th>
                        <th>Valor Total da Venda</th>
                        <th>Operação</th>
                    </tr>
                </thead>
                {searchInput.length > 0 ? (
                    <tbody>
                        {filtro.map(venda => (
                            <tr key={venda.idVenda}>
                                 <td>{venda.IdVenda}</td>
                                <td>{venda.idCliente}</td>                              
                                <td>{venda.idProduto}</td>
                                <td>{venda.qtdVenda}</td>
                                <td>{venda.vlrUnitarioVenda}</td>
                                <td>{venda.dthVenda}</td>
                                <td>{venda.vlrTotalVenda}</td>
                                <td>
                                    <button type="button" class="btn btn-primary" onClick={() => selectVenda(venda, "Editar")}>Editar</button>
                                    <button type="button" class="btn btn-danger" onClick={() => selectVenda(venda, "Excluir")}>Excluir</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        {info && info?.map(venda => (
                            <tr key={venda.idVenda}>
                                 <td>{venda.idVenda}</td>
                                <td>{venda.idCliente}</td>                              
                                <td>{venda.idProduto}</td>
                                <td>{venda.qtdVenda}</td>
                                <td>{venda.vlrUnitarioVenda}</td>
                                <td>{venda.dthVenda}</td>
                                <td>{venda.vlrTotalVenda}</td>
                                <td>
                                    <button type="button" class="btn btn-primary" onClick={() => selectVenda(venda, "Editar")}>Editar</button>
                                    <button type="button" class="btn btn-danger" onClick={() => selectVenda(venda, "Excluir")}>Excluir</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                )}
            </table>

            <Modal isOpen={includeModal}>
                <ModalHeader>Cadastrar Venda</ModalHeader>
                <ModalBody>
                    <div>
                        <label>Id Cliente </label>
                        <br />
                        <input type='text' name="idCliente" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Id Produto </label>
                        <br />
                        <input type='text' name="idProduto" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Quantidade de Venda </label>
                        <br />
                        <input type='text' name="qtdVenda" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Valor Unitario da Venda </label>
                        <br />
                        <input type='text' name="vlrUnitario" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Data Da Venda </label>
                        <br />
                        <input type='text' name="dthVenda" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Valor Total da Venda</label>
                        <br />
                        <input type='text' name="vlrTotalVenda" className="form-control" onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" class="btn btn-outline-primary" onClick={() => postVenda()}>Incluir</button>{"  "}
                    <button type="button" class="btn btn-outline-danger" onClick={() => openCloseIncludeModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Produto</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Id:</label>
                        <input type='text' readOnly value={vendaSelected && vendaSelected.idVenda} />
                        <br />
                        <label>Id Cliente: </label>
                        <input required type='text' value={vendaSelected && vendaSelected.idCliente} name="idCliente" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Id Produto: </label>
                        <br />
                        <input required type='text' value={vendaSelected && vendaSelected.idProduto} name="idProduto" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Quantidade de Venda: </label>
                        <br />
                        <input required type='text' value={vendaSelected && vendaSelected.qtdVenda} name="idProduto" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Valor Unitario: </label>
                        <br />
                        <input required type='text' value={vendaSelected && vendaSelected.vlrUnitarioVenda} name="idProduto" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Data da Venda: </label>
                        <br />
                        <input readOnly type='text' value={vendaSelected && vendaSelected.dthVenda} name="idProduto" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Valor Total da Venda: </label>
                        <br />
                        <input readOnly type='text' value={vendaSelected && vendaSelected.vlrTotalVenda} name="idProduto" className="form-control" onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" class="btn btn-outline-primary" onClick={() => editVenda()} >Editar</button>{"  "}
                    <button type="button" class="btn btn-outline-danger" onClick={() => openCloseEditModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Confirma a exclusão destes dados? : {vendaSelected && vendaSelected.idVenda}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => vendaDelete()}>Sim</button>
                    <button className="btn btn-secondary" onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>

        </div>
    )

}