import React from 'react'
import {Row,Col,Container,ListGroup,Image,Form,Button, Card,FormContainer, ListGroupItem, Alert,Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../store'
import { store } from '../store/store'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'


function Orders() {

    const {userInfo}=useSelector(state=>state.user)
    const {orders}=useSelector(state=>state.orders)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    useEffect(() => {
        if(userInfo.token===undefined) navigate('/')
        const loadOrders=()=>{dispatch(actions.getOrders(userInfo.token))}
        loadOrders()
    }, [])
    
    if(orders===undefined){
        return(
            <>
            No Orders
            </>
        )
    }
    else{
        return (
            <>
            <Container>
            {orders.length===0?<h1 className='my-3'>No Orders to Display</h1>:
            <>
                <h1 className='my-4'>Orders:</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date Ordered</th>
                            <th>Total</th>
                            <th>Delivered</th>
                            <th>Payment</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order=>(
                                
                                <tr key={order._id}>
                                    
                                    <td>{order.tempId}</td>
                                    <td>{(order.createdAt).slice(0,10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isDelivered?'Yes':'No'}</td>
                                    <td>{order.isPaid?'Yes':'No'}</td>
                                    <th><Link to={`/order/${order._id}`}>View</Link></th>
                                </tr>
                                
                            ))
                        }
                    </tbody>
                </Table>
            </>
    }
    </Container>
            </>
          )
    }
  
}

export default Orders