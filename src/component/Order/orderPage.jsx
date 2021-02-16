import React, { Component } from 'react';
import { connect } from 'react-redux';
import './orderPage.css';
import {cartActions} from '../../action/cartAction';

class OrderPage extends Component {

    componentDidMount() {
       this.props.emptyCart();
    }

    render() {
        const data = this.props.addressInfo;
        const cartAddedData = this.props.cartData && this.props.cartData.length &&
            this.props.cartData.map(item => {
                return (
                    <tr key={item.id}>
                        <td className="">
                            <img className="orderPageimg" src={item.image} alt={item.image} />
                        </td>
                        <td className="product-detail">
                            Title: {item.title} <br />
                            Price: {item.price} <br />
                            Quantity: {item.quantity} <br />
                        </td>
                    </tr>
                )
            })
        return ( 
            this.props.cartData && this.props.cartData.length > 0 ? 
            <div>
            <h3 style={{ textAlign: 'center' }}>Your order has been placed Successfully.</h3>
            <div>
                <h5 style={{ textAlign: 'center' }}>Order Details:</h5>
                <div className="invoice">
                    <table>
                        <tbody>
                            {cartAddedData}
                            <tr>
                                <td>
                                    <h4>Delivery Address:</h4>
                                    <h6>{data.fullName} <br /> {data.address} <br />
                                    {data.email} <br />
                                    Contact Number:  {data.phoneNumber} </h6>
                                </td>
                                <td className="price">
                                    <h4>Total Price: $ {this.props.total && this.props.total.toFixed(2)}</h4>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div> : <h3 style={{ textAlign: 'center' }}>No Ordered Item</h3>);
    }
}
const mapStateToProps = (state) => {
    const item = state.order && state.order.data;
    return {
        addressInfo: item.addressInfo,
        cartData: item.addedItem,
        total: item.total
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        emptyCart: () => {dispatch(cartActions.emptyCart())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)