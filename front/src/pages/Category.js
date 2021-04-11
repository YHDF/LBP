import React from 'react';
import axios from 'axios';
import TableManager from "../localComponents/TableManager";

let cardList

export default class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = { products: [] };
        this.category = React.createRef();
        this.admin = React.createRef();
        this.modify = this.modify.bind(this);
        this.validate = this.validate.bind(this);
        this.cat_id = null;
        this.name = "Catégorie";
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/category')
            .then(res => {
                const products = res.data;
                this.setState({ products });
            });
    }

    delete(item) {
        const value = item.categories.id_category;
        console.log(value);
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };
        axios({
            method: 'delete',
            url: 'http://localhost:5000/products/deletecategory',
            params: value,
            headers: headers
        }).then(response => {
            this.componentDidMount()
        });
    }

    modify(item) {
        this.category.current.value = item.categories.name;
        this.admin.current.value = item.admin_name;
        this.cat_id = item.categories.id_category;
    }

    async validate() {

        const values = {
            category: this.category.current.value,
            admin: this.admin.current.value,
            catid: this.cat_id,
        }
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };
        axios({
            method: 'post',
            url: 'http://localhost:5000/products/modifycategory',
            data: values,
            headers: headers
        }).then(res => {
            this.componentDidMount()
        });

    }

    render() {
         cardList = this.state.products.map((item, index) => {
            return (
                <tbody>
                    <tr>
                        <th scope="row">{item.categories.id_category}</th>
                        <td>{item.categories.name}</td>
                        <td>{item.admin_name}</td>
                        <td>
                            <div>
                                <button type="button" className="btn btn-danger" style={{ display: "inline-block" }} onClick={
                                    () => this.delete(item)} >Supprimer</button>
                                <button type="button" className="btn btn-warning" style={{ display: "inline-block", marginLeft: "10%" }} onClick={
                                    () => this.modify(item)}>Modifier</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            )
        });
        return (
            <div style={{ height: "100%" }}>

                <TableManager name={this.name} category={this.category} admin={this.admin} modifi_f={this.validate} />
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
                        {cardList}
                    </table>

                </div >
            </div>

        );
    }
}
