import React from 'react'
import { useState, useEffect } from 'react';
import '../../styles/ApiReturn.css'

export default function FromApi() {

    const [infoC, setInfoC] = useState([]);
    const [infoP, setInfoP] = useState([]);
    const [infoV, setInfoV] = useState([]);

    const getApiCliente = async () => {
        const data = await fetch('https://localhost:7282/api/clientes')
        const clientesApi = await data.json();

        setInfoC(clientesApi)
    }

    const getApiProdutos = async () => {
        const data = await fetch('https://localhost:7282/api/produtos')
        const produtosApi = await data.json();

        setInfoP(produtosApi)
    }

    const getApiVendas = async () => {
        const data = await fetch('https://localhost:7282/api/vendas')
        const vendasApi = await data.json();

        setInfoV(vendasApi)
    }

    useEffect(() => {
        getApiCliente();
    }, [])

    useEffect(() => {
        getApiProdutos();
    }, [])

    useEffect(() => {
        getApiVendas();
    }, [])


    return (
        <div className='api-container'>
            <h1>Relação de Dados da Api</h1>
            <h3>Lista de Vendas da Api Campos Dealer</h3>
            <table responsive="sm">
                <thead>
                    <tr>
                        <th>IdVenda</th>
                        <th>idCliente</th>
                        <th>Cliente</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor Unitario</th>
                        <th>Data da Venda</th>
                        <th>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    {infoV && infoV?.map(venda => (
                        <tr key={venda.idVenda}>
                            <td>{venda.idVenda}</td>
                            <td>{venda.idCliente}</td>
                            <td>{venda.idCliente}</td>
                            <td>{venda.idProduto}</td>
                            <td>{venda.qtdVenda}</td>
                            <td>{venda.vlrUnitarioVenda}</td>
                            <td>{venda.dthVenda}</td>
                            <td>{venda.qtdVenda * venda.vlrUnitarioVenda}</td>
                        </tr>

                    ))}


                </tbody>
            </table>
            <h3>Lista de Clientes da Api Campos Dealer</h3>
            <table responsive="md">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Cliente</th>
                        <th>Cidade</th>
                        
                    </tr>
                </thead>
                <tbody>
                {infoC.map(cliente => (
                 <tr key={cliente.idCliente}>
                 <td>{cliente.idCliente}</td>
                 <td>{cliente.nmCliente}</td>
                 <td>{cliente.cidade}</td>
                 </tr>
        ))}
                </tbody>
            </table>
            <h3>Lista de Produtos da Api Campos Dealer</h3>
            <table responsive="lg">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descrição do Produto</th>
                        <th>Valor Unitario do Produto</th>
                       
                     
                    </tr>
                </thead>
                <tbody>
                    {infoP.map(produto => (
                        <tr key={produto.idProduto}>
                            <td>{produto.idProduto}</td>
                            <td>{produto.dscProduto}</td>
                            <td>{produto.vlrUnitario}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
