import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductActions } from '../../action/productAction';
import './homePage.css'
import { history } from '../../helper/history';
import Filters from '../category/filter';
import Rating from '@material-ui/lab/Rating';

class Home extends Component {
    constructor(props) {
        super(props);
        this.cardClicked = this.cardClicked.bind(this);
        this.state = {
            list: []
        }
    }

    cardClicked(id) {
        history.push({
            pathname:"product-detail",
            state:id
        });
    }

    componentDidMount() {
        this.props.getProductList();
        this.setState({
            list: []
        })
    }

    handleData = (data) => {
        this.setState({
            list: data[0] || []
        })
    }

    handleSearchData = (data) => {
        this.setState({
            list: data || []
        })
    }

    handleRating = () =>{

    }

    render() {
        const items = this.state.list.length > 0 ? this.state.list : this.props.items;
        let itemList = items.map(item => {
            return (
                <div className="card" key={item.id} onClick={() => {this.cardClicked(item.id)}}>
                    <div className="card-image">
                        <img className="img" src={item.image} alt={item.title} />

                    </div>
                    <div className="card-content">
                        <span className="card-title">{item.title}</span>
                        <span><b>Price: {item.price}$</b></span>
                        <div>
                        <Rating name="read-only" value={item.rating} readOnly />
                        </div>
                    </div>
                </div>

            )
        })

        return (
            <div>
                {this.props.isLoading ? 
                <div className="preloader-wrapper active"style={{left:'50%'}}>
                    <div className="spinner-layer spinner-red-only">
                        <div className="circle-clipper left" >
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div> :
                <div>
                    <Filters data={this.handleData} search={this.handleSearchData} />
                    <div className="box">
                        {itemList}
                    </div>
                </div>}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const data = state.getProductList.data || state.getProductList.state.data;

    return {
        items: data.list,
        isLoading: data.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProductList: () => { dispatch(ProductActions.getProductList()) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)