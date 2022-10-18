import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



export default function Venda() {

    const baseUrl = 'https://localhost:7282/vendas';

    const [info, setInfo] = useState([]);
    const [vendaSelected, setVendaSelected] = useState
    ({ idVenda: '', idCliente: '', idProduto: '', qtdVenda: '', vlrUnitarioVenda: '', dthVenda: '', vlrTotalVenda: '' })
    const [includeModal, setIncludeModal] = useState(false);

    const getVenda = async () => {
        const data = await fetch(baseUrl)
        const vendas = await data.json();

        setInfo(vendas)
    }

    const postVenda = async () =>{
        delete vendaSelected.idVenda;
        await axios.post(baseUrl, vendaSelected)
        .then(res =>{
            setInfo(info.concat(res.data));
            openCloseIncludeModal();          
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getVenda();
        console.log(info)
    }, [])

    const handleChange = e => { 
        const{name, value} = e.target;
        setVendaSelected({
            ...vendaSelected,
            [name]: value
        });
        console.log(vendaSelected);
    }

    const openCloseIncludeModal = ()=>{
        setIncludeModal(!includeModal);
    }

    return (
        <div className="container">
            <br />
            <h1>Vendas</h1>
            <header>
                <img alt=''></img>
                <button onClick={()=> openCloseIncludeModal()} className="btn btn-success">Cadastrar Novo Venda</button>
            </header>
            <table className="table table-bordered">
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
                <tbody>
                    {info && info?.map(venda => (
                        
                        <tr key={venda.idVenda}>                           
                            <td>{venda.idCliente}</td>
                            <td>{venda.venda}</td> 
                            <td>{venda.idProduto}</td>
                            <td>{venda.qtdVenda}</td>                           
                            <td>{venda.vlrUnitarioVenda}</td>
                            <td>{venda.dthVenda}</td>
                            <td>{venda.vlrTotalVenda}</td>                          
                            <td>                            
                            <button type="button" class="btn btn-primary">Editar</button>
                            <button type="button" class="btn btn-danger">Excluir</button>                          
                            </td>
                        </tr>
                            
                    ))}
                </tbody>
            </table>

            <Modal isOpen={includeModal}>
                <ModalHeader>Cadastrar Venda</ModalHeader>
                <ModalBody>
                    <div>
                        <label>Id Cliente </label>
                        <br />
                        <input type='text'  name="idCliente" className="form-control" onChange={handleChange} />
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
                    <button type="button" class="btn btn-outline-primary" onClick={()=> postVenda()}>Incluir</button>{"  "}
                    <button type="button" class="btn btn-outline-danger" onClick={()=> openCloseIncludeModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>


        </div>
    )

}