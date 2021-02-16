import React from 'react'
import './filter.css';
import { connect } from 'react-redux';

function Filters(props) {
    let arr = [];
    let menuItem;
    const [selectedValue, updateFilterValue] = React.useState('');
    const [search, setSearch] = React.useState('');
    const data = props.productList;
    if (data.length > 0) {
        let obj = {}
        data.forEach(item => {
            if (obj[item.category]) {
                obj[item.category].push(item);

            } else {
                obj[item.category] = [];
                obj[item.category].push(item);
            }

        });
        arr.push(obj);
        menuItem = Object.keys(arr[0]).map((item, index) => {
            return <option value={item} key={index} className="capitalize">
                {item}
            </option>
        })
    }


    const handleChange = (event) => {
        updateFilterValue(event.target.value);
        setSearch('');
        const FilteredData = arr.map(item => {
            return item[event.target.value];
        })
        props.data(FilteredData);
    };

    const handleSearch = (event) => {
        updateFilterValue('');
        setSearch(event.target.value);
        let searchData = [];
        arr.map(item => {
            Object.keys(item).map(ele=>{
                item[ele].filter(res=>{
                   if(res.title.toLowerCase().startsWith(event.target.value && event.target.value.toLowerCase())){
                    searchData.push(res)
                   }
                })
            })
            return searchData;
        })
        props.search(searchData);
    }



    return (
        <div className="filter_menu">
            <div className="">
                <select name="category" value={selectedValue} onChange={handleChange} className="capitalize" >
                    <option value=''>All Products</option>
                    {
                        menuItem
                    }
                </select>
            </div>
            <input type="text" value={search} placeholder="Enter your search!" onChange={handleSearch}
            />
        </div>
    )
}
const mapStateToProps = (state) => {
    const data = state.getProductList.data || state.getProductList.state.data;

    return {
        productList: data.list,
    }
}


export default connect(mapStateToProps)(Filters)