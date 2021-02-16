import React from 'react';
import './checkoutPage.css';
import { history } from '../../helper/history';
import {cartActions} from '../../action/cartAction';
import { connect } from 'react-redux'

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            validForm: false,
            errors: {
                fullName: '',
                email: '',
                address: '',
                phoneNumber: ''
            }
        };
    }

    validEmailRegex = new RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    phoneno = RegExp(/^\d{10}$/);
    
    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        this.setState({
            validForm: valid
        })
    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        }, ()=> {
            this.validateForm();
        });
    }

    validateForm() {
        let errors = this.state.errors;
        errors.fullName =
            this.state.fullName.length <= 0
                ? 'Name is required'
                : '';
        errors.email =
            this.validEmailRegex.test(this.state.email)
                ? ''
                : 'Please Enter valid email id';

        errors.phoneNumber =
        this.phoneno.test(this.state.phoneNumber)
                ? ''
                : 'Please Enter Valid Contact Number';
        errors.address =
            this.state.address.length <= 0
                ? 'Please Enter Valid Address'
                : '';

        this.setState({ errors }, ()=>{
            this.validate(this.state.errors);
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.validateForm();
        if (this.state.validForm) {
            this.props.submitOrder(this.props.items,this.props.total, this.state);
           history.push('./order')
        } else {
            return null;
        }
    }

    render() {
        const { errors } = this.state;
        return (
                <div className='form-wrapper'>
                    <h3>Please Enter Details</h3>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className='fullName'>
                            <label htmlFor="fullName">Full Name</label>
                            <input type='text' name='fullName' onChange={this.handleChange} noValidate />
                            {errors.fullName.length > 0 &&
                                <span className='error'>{errors.fullName}</span>}
                        </div>
                        <div className='email'>
                            <label htmlFor="email">Email</label>
                            <input type='email' name='email' onChange={this.handleChange} noValidate />
                            {errors.email.length > 0 &&
                                <span className='error'>{errors.email}</span>}
                        </div>
                        <div className='phoneNumber'>
                            <label htmlFor="phoneNumber">Contact Number</label>
                            <input type='text' name='phoneNumber' onChange={this.handleChange} noValidate />
                            {errors.phoneNumber.length > 0 &&
                                <span className='error'>{errors.phoneNumber}</span>}
                        </div>

                        <div className='address'>
                            <label htmlFor="address">Address</label>
                            <textarea type='text' name='address' onChange={this.handleChange} noValidate>
                            </textarea>
                            {errors.address.length > 0 &&
                                <span className='error'>{errors.address}</span>}
                        </div>
                        <button className="btn">Checkout</button>
                    </form>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.cart.addedItems,
        total: state.cart.total
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        submitOrder: (addedItem, total, orderData) => { dispatch(cartActions.confirmOrder(addedItem, total, orderData)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
