import React from 'react';
import axios from 'axios';
import TableManager from "../localComponents/TableManager";


export default class Provider extends React.Component {

    constructor(props) {
        super(props);
        this.state = { products: [] };
        this.provider = React.createRef();
        this.admin = React.createRef();
        this.modify = this.modify.bind(this);
        this.validate = this.validate.bind(this);
        this.cat_id = null;
        this.name = "Fournisseur";
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/provider')
            .then(res => {
                const products = res.data;
                console.log(res.data)
                this.setState({ products });
            })
    }

    delete(item) {
        const value = item.providers.id_provider;
        console.log(value);
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };
        axios({
            method: 'delete',
            url: 'http://localhost:5000/products/deleteprovider',
            params: value,
            headers: headers
        }).then(response => {
            this.componentDidMount()
        });
    }


    modify(item) {
        this.provider.current.value = item.providers.name;
        this.admin.current.value = item.admin_name;
        this.prov_id = item.providers.id_provider;
    }

    async validate() {

        const values = {
            provider: this.provider.current.value,
            admin: this.admin.current.value,
            prov_id: this.prov_id,
        }
        console.log(this.prov_id);
        const headers = {
            'Access-Control-Allow-Origin' : '*'
        };
        axios({
            method: 'post',
            url: 'http://localhost:5000/products/modifyprovider',
            data : values,
            headers : headers
        }).then(res => {
            console.log(res);
        });

    }

    render() {
        let buttonList = this.state.products.map((item, index) => {
            return (
                <tbody>
                    <tr>
                        <th scope="row">{item.providers.id_provider}</th>
                        <td>{item.providers.name}</td>
                        <td>{item.admin_name}</td>
                        <td>
                            <div>
                                <button type="button" className="btn btn-danger" style={{ display: "inline-block" }} onClick={
                                    () => this.delete(item)}> Supprimer</button>
                                <button type="button" className="btn btn-warning" style={{ display: "inline-block", marginLeft: "10%" }} onClick={
                                    () => this.modify(item)
                                }>Modifier</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            )
        });
        return (
            <div style={{ height: "100%" }}>
                
                <TableManager name= {this.name} category={this.provider} admin={this.admin} modifi_f={this.validate} />
                <div className="category_table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col">id</th>
                                <th className="col">Name</th>
                                <th className="col">Admin</th>
                                <th className="col">Actions</th>
                            </tr>
                        </thead>
                        {buttonList}
                    </table>

                </div >
            </div>

        );
    }
}
