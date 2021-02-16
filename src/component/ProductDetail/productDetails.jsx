import React from 'react';
import { connect } from 'react-redux';
import { ProductActions } from '../../action/productAction';
import { history } from '../../helper/history';
import {cartActions} from '../../action/cartAction';
import './productDetail.css';

class ProductDetail extends React.Component {

    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            id: 1,
            addedtoCart: false,
            quantity: 1,
            item : {}
        }
    }

    componentDidMount() {
        this.setState({
            id: history.location.state
        }, ()=>{
            this.props.getProductDetailList(this.state.id);
        })
    }


    handleClick = ()=>{
        this.setState((prevState) => {
            return {
                addedtoCart: true,
                item: {...prevState.item,quantity:prevState.quantity}
            }
        }, ()=> {
            this.props.addToCart(this.state.item);
            history.push('./cart');
        })
        
        
    }

    //to add the quantity
    handleAddQuantity = () => {
        this.setState(prevState => {
            return {
            quantity: prevState.quantity+1,
            }
        })
    }
    //to substruct from the quantity
    handleSubtractQuantity = () => {
        this.setState(prevState => {
            const qty = prevState.quantity > 1 ? prevState.quantity -1 : 1;
            return {
            quantity: qty
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const alreadyItem = this.props.addedItems && this.props.addedItems.find(item => {
            return item.id === this.props.items.id ? item : null;
        })
        const qty = alreadyItem ? alreadyItem.quantity : prevState.quantity;
        if (prevProps.items.id !== this.props.items.id) {
            this.setState({
                quantity: qty,
                item: {...this.props.items, quantity: qty}
            })
        }
        
    }
    render() {
        return (
            <div>
                <h3 style={{color: 'crimson',textAlign: 'center'}}>{this.state.item.title}</h3>
                {
                    this.props.isLoading ?
                        <div className="preloader-wrapper active" style={{ left: '50%' }}>
                            <div className="spinner-layer spinner-red-only">
                                <div className="circle-clipper left" >
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div> : <div className="app">
                            <div className="details" key={this.state.item.id}>
                                <div className="big-img">
                                    <img src={this.state.item.image} alt="" />
                                    {/* <h5 style={{color: 'crimson',textAlign: 'center'}}>{this.state.item.title}</h5> */}
                                </div>
                                <div className="box-product-detail">
                                    <div className="price">
                                        <span>${this.state.item.price}</span>
                                    </div>
                                    <p>{this.state.item.description}</p>
                                    <p>Category : {this.state.item.category}</p>
                                    <div className="qtyBtn">
                                    <button className="btn cart" onClick={() => {this.handleClick(this.state.item)}}>Add to cart</button>
                                    <div className="amount">
                                        <span className="qtyLink">Qty: </span>
                                        <button onClick={() => { this.handleAddQuantity() }}> + </button>
                                        <span>{this.state.quantity}</span>
                                        <button onClick={() => { this.handleSubtractQuantity() }}> - </button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    };
}
const mapStateToProps = (state) => {
    const data = state.getProductDetailList.data;
    return {
        items: data.list,
        isLoading: data.isLoading,
        addedItems: state.cart.addedItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProductDetailList: (id) => { dispatch(ProductActions.getProductDetailList(id)) },
        addToCart: (item)=>{dispatch(cartActions.addToCart(item))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)