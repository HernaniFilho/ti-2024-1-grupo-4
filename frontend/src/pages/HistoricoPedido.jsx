import React from 'react'
import Header from '../componentes/header/Header.jsx'
import Footer from '../componentes/footer/Footer.jsx'
import Lista from '../componentes/Lista/setuplista_function.jsx'

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPedidosByUser, fetchPedido } from '../redux/listapedidos/ListaPedidoSlice.js';

/**
 * Retorna a página HistoricoPedido
 * 
 */
const HistoricoPedido = () => {
    const pedidos = useSelector((rootReducer)=> rootReducer.pedidoSlice.pedidos);
    const dispatch = useDispatch();
    const status = useSelector((rootReducer) => rootReducer.pedidoSlice.status);
    const error = useSelector((rootReducer) => rootReducer.pedidoSlice.error);
    const currentUser = useSelector((rootReducer) => rootReducer.userSlice.currentUser) || {};
    const { isAdmin } = useSelector((rootReducer) => rootReducer.userSlice) || {};

    useEffect(() => {
        if ((status === 'not_loaded' || status === 'saved' || status === 'deleted')) {
          dispatch(fetchPedidosByUser(currentUser));
        }
    }, [status, dispatch]);

    return (
      <>
        <div className=''>
          <Header/>
          <div className="d-flex flex-column">
                {Object.values(pedidos).map((Pedido) => (
                        
                    <div key="Pedido.id" className="card m-2 p-2 bg-banana-mania">
                        <Lista {...Pedido} />
                    </div>
                ))}
          </div>
          <Footer/>
        </div>
      </>
    )
  }
  
  export default HistoricoPedido