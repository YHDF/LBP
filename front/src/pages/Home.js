import React from 'react';
import axios from 'axios';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: [] };
    }
    componentDidMount() {
        axios.get(`http://localhost:5000/products/all`)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
    }

    render() {
        let productList = this.state.products.map((item, index) => {
            return (
                <div className="column">
                    <div className="card" style={{width : "18rem", height : "400px"}}>
                        <img src={item.image} className="card-img-top" alt="Not Found" style={{height:"200px"}} />
                        <div className="card-body">
                            <div style={{height : "100px"}}><h5 className="card-title" style={{overflow:"hidden"}}>{item.name}</h5></div>
                            <p className="card-text">{item.price} $</p>
                            <a href={item.link} className="btn btn-primary" >visiter le site</a>
                        </div>
                    </div>

                </div>
            )
        });
        return (
            <div>
                {productList}
            </div>
        )
    }
}