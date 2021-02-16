import React, { Component } from 'react';
import { connect } from 'react-redux'
import {cartActions} from '../../action/cartAction';
import './cart.css';
import { history } from '../../helper/history';

class Cart extends Component {

    //to remove the item completely
    handleRemove = (item) => {
        this.props.removeItem(item);
    }
    //to add the quantity
    handleAddQuantity = (item) => {
        this.props.addQuantity(item);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (item) => {
        this.props.subtractQuantity(item);
    }

    emptyCart = () => {
        this.props.emptyCart();
    }

    cardClicked(id) {
        history.push({
            pathname:"product-detail",
            state:id
        });
    }

    checkout(isLoggedIn) {
        isLoggedIn ? 
            history.push('./checkout') :
            history.push('./login');
    }

    render() {
        const loggingIn = this.props.authentication && this.props.authentication.loggingIn;
        let addedItems = this.props.items && this.props.items.length ?
            (
                this.props.items.map(item => {
                    return (

                        <li className="collection-item avatar" key={item.id}>
                            <div className="item-img" onClick={() => {this.cardClicked(item.id)}}>
                                <img src={item.image} alt={item.image} />
                            </div>

                            <div className="item-desc">
                                <span className="title">{item.title}</span>
                                <p><b>Price: {item.price}$</b></p>
                                <p>
                                    <b>Quantity: {item.quantity}</b>
                                </p>
                                <div className="add-remove">
                                <i className="material-icons" onClick={()=>{this.handleAddQuantity(item)}}>arrow_drop_up</i>
                                <i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item)}}>arrow_drop_down</i>
                                </div>
                                <button className="waves-effect waves-light btn pink remove" onClick={() => { this.handleRemove(item) }}>Remove</button>
                            </div>
                        </li>
                    )
                })
            ) : null
        return (
            this.props.items && this.props.items.length ?
            <div className="container">
                <div className="cart">
                    <div style={{display:"flex"}}>
                        <h5>Cart List:</h5>
                         <button className="btn btn-primary empty-cart" onClick={() => {this.emptyCart()}}>Empty Cart</button>
                    </div>
                    
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
               <div className="total">
                    <h4>SubTotal ({this.props.items.length} items): $ {this.props.total.toFixed(2)}</h4>
                    <button className="btn btn-primary proceedBtn" style={{float: 'right'}} onClick={() => {this.checkout(loggingIn)}}>Proceed to Buy</button>
                </div>
            </div> :  <h3 style={{ textAlign: 'center' }}>No Items are added to the cart.</h3>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.cart.addedItems,
        total: state.cart.total,
        authentication: state.authentication
    }
    
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (item) => { dispatch(cartActions.removeItem(item)) },
        addQuantity: (item) => { dispatch(cartActions.addQuantity(item)) },
        subtractQuantity: (item) => { dispatch(cartActions.subtractQuantity(item)) },
        emptyCart: () => {dispatch(cartActions.emptyCart())}

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)