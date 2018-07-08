import React, { Component } from 'react';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
var moment = require('moment');


class ListStuff extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };


    this.getProducts();
  }


  getProducts() {
    var context = this;
    axios.get('/_app/products')
    .then(function (response) {
      response.data.forEach(e=> e.Expires = moment(e.Expires) )
      context.setState({products: response.data})
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  render() {
    return (
      <Container>
        <Table
          responsive={true}
          >
          <thead>
            <tr>
              <th>Name</th>
              <th>Items</th>
              <th>Expire</th>
              <th>Ops</th>
            </tr>
          </thead>
          <tbody>
          {this.state.products.map(e => {
            return (<tr key={e.Name+e.Expires}>
                <td>{e.Name } </td>
                <td>{e.NrItems } </td>
                <td>{e.Expires.format("dddd, MMMM Do YYYY") } </td>
                <td>
                  <Button className="ButtonOps"> Used </Button>
                  <Button className="ButtonOps"> Moved </Button>
                </td>
              </tr>);
          })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default ListStuff;
