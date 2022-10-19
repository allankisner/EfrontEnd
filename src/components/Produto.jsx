import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from "axios";


export default function Produto() {

    const baseUrl = 'https://localhost:7282/produtos';

    const [info, setInfo] = useState([]);
    const [produtoSelected, setProdutoSelected] = useState({ idProduto: '', dscProduto: '', vlrUnitario: '' })
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


    // Listar Produto
    const getProduto = async () => {
        const data = await fetch(baseUrl)
        const produtos = await data.json();

        setInfo(produtos)
    }

    //Criar Produto
    const postProduto = async () => {
        delete produtoSelected.idProduto;
        await axios.post(baseUrl, produtoSelected)
            .then(res => {
                setInfo(info.concat(res.data));
                openCloseIncludeModal();
            }).catch(err => console.log(err))
    }

    //Editar Produto
    const editProduto = async () => {
        await axios.put(baseUrl + "/" + produtoSelected.idProduto, produtoSelected)
            .then(res => {
                var response = res.data;
                var dadoRecebido = info;
                dadoRecebido.map(produto => {
                    if (produto.idProduto === produtoSelected.idProduto) {
                        produto.dscProduto = response.dscProduto;
                        produto.vlrUnitario = response.vlrUnitario;
                    }
                });
                openCloseEditModal();
            }).catch(err => console.log(err))
    }

    //Excluir Produto
    const produtoDelete = async () => {
        await axios.delete(baseUrl + '/' + produtoSelected.idProduto)
            .then(res => {
                setInfo(info.filter(produto => produto.idProduto !== res.data));
                openCloseModalDelete();
            }).catch(err => console.log(err))
    }


    useEffect(() => {
        getProduto();
        console.log(info)
    }, [])

    const handleChange = e => {
        const { name, value } = e.target;
        setProdutoSelected({
            ...produtoSelected,
            [name]: value
        });
        console.log(produtoSelected);
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

    const selectProduto = (produto, option) => {
        setProdutoSelected(produto);
        (option === "Editar") ?
            openCloseEditModal() : openCloseModalDelete();
    }


    return (
        <div className="container">
            <br />
            <h1>Produtos</h1>
            <div style={{ display: ' flex', justifyContent: 'space-between' }}>
                <header>
                    <img alt=''></img>
                    <button onClick={() => openCloseIncludeModal()} className="btn btn-success">Cadastrar Novo Produto</button>
                </header>
                <form>
                    <input className="searched" type='text'
                        placeholder="Buscar Produto"
                        onChange={(e) => SearchCliente(e.target.value)} />
                </form>
            </div>
            <table className="table table table-striped">
                <thead>
                    <tr>
                        <th>Produto Id</th>
                        <th>Descrição</th>
                        <th>Valor Unitário</th>
                        <th>Operação</th>
                    </tr>
                </thead>
                {searchInput.length > 0 ? (
                    <tbody>
                        {filtro.map(produto => (
                            <tr key={produto.idProduto}>
                                <td>{produto.idProduto}</td>
                                <td>{produto.dscProduto}</td>
                                <td>{produto.vlrUnitario}</td>
                                <td>
                                    <button type="button" class="btn btn-primary" onClick={() => selectProduto(produto, "Editar")}>Editar</button>
                                    <button type="button" class="btn btn-danger" onClick={() => selectProduto(produto, "Excluir")}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                    { info && info?.map(produto => (
                        
                            <tr key={produto.idProduto}>
                                <td>{produto.idProduto}</td>
                                <td>{produto.dscProduto}</td>
                                <td>{produto.vlrUnitario}</td>
                                <td>
                                    <button type="button" class="btn btn-primary" onClick={() => selectProduto(produto, "Editar")}>Editar</button>
                                    <button type="button" class="btn btn-danger" onClick={() => selectProduto(produto, "Excluir")}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    )} 
            </table>

            <Modal isOpen={includeModal}>
                <ModalHeader>Cadastrar Produto</ModalHeader>
                <ModalBody>
                    <div>
                        <label>Descrição do produto </label>
                        <br />
                        <input type='text' name="dscProduto" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Valor </label>
                        <br />
                        <input type='text' name="vlrUnitario" className="form-control" onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" class="btn btn-outline-primary" onClick={() => postProduto()}>Incluir</button>{"  "}
                    <button type="button" class="btn btn-outline-danger" onClick={() => openCloseIncludeModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Produto</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Id:</label>
                        <input type='text' readOnly value={produtoSelected && produtoSelected.idProduto} />
                        <br />
                        <label>Descrição: </label>
                        <input required type='text' value={produtoSelected && produtoSelected.dscProduto} name="dscProduto" className="form-control" onChange={handleChange} />
                        <br />
                        <label>Valor Unitário: </label>
                        <br />
                        <input required type='text' value={produtoSelected && produtoSelected.vlrUnitario} name="vlrUnitario" className="form-control" onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" class="btn btn-outline-primary" onClick={() => editProduto()} >Editar</button>{"  "}
                    <button type="button" class="btn btn-outline-danger" onClick={() => openCloseEditModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Confirma a exclusão destes dados? : {produtoSelected && produtoSelected.dscProduto}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => produtoDelete()}>Sim</button>
                    <button className="btn btn-secondary" onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>

        </div>
    )

}