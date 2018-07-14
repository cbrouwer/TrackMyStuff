import React, { Component } from 'react';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Autocomplete from 'react-autocomplete'
import QrReader from 'react-qr-reader'

import moment from 'moment';
import axios from 'axios';

class NewStuff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Barcode: "",
      Expires: moment().format("YYYY-MM-DD"),
      items: [],
      delay: 2000,
      result: 'No result',
      status: 0,
      errMsg: "", 

    }
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleScan = this.handleScan.bind(this)

  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

   handleScan(data){
    if(data){
      this.setState({
        result: data,
      })
    }
  }
  handleError(err){
    console.error(err)
  }



  save() {
    if (!this.state.Name) {
      this.setState({status: -1, errMsg: 'Name is empty'});
      return;
    }
    const expires = moment(this.state.Expires);
    if (expires.isBefore(moment())) {
      this.setState({status: -1, errMsg: 'Expiry date cannot be in the past'});
      return;
    }

    const context = this;
    axios.post('/_app/stuff', {
        name: this.state.Name,
        expires: this.state.Expires,
        barcode: this.state.Barcode,
      })
      .then(function (response) {
        context.setState({status: 1, Name: "", Expires: "", errMsg: ""})
      })
      .catch(function (error) {
        context.setState({status: -1, errMsg: error})
      });

  }

  getItems(text) {
    const context = this;
    this.setState({Name : text}); 
    axios.post('/_app/products', {
        name: text,
      })
      .then(function (response) {
        context.setState({items: response.data});
      })
      .catch(function (error) {
        context.setState({status: -1, errMsg: error})
      });
  }

  render() {
    var alert = <div/>;
    if (this.state.status === 1) {
      alert = (<Alert color="success">
        Successfully added some stuff!
      </Alert>);
    } else if (this.state.status === -1) {
      alert = (<Alert color="danger">
        Error adding stuff: {this.state.errMsg}
      </Alert>);
    }
    return (
      <div>
        <h2> New stuff </h2>
        {alert}
        <Container>
          <Row>
             <Col sm={{ size: 6, offset: 1 }}>
               <Form>
               <FormGroup>
                <Label >Name </Label>

                <Autocomplete
                  getItemValue ={(item) => item.Name}
                  items={this.state.items}
                  renderItem={(item, isHighlighted) =>
                    <div key={item.Name} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                      {item.Name}
                    </div>
                  }
                  value={this.state.Name}
                  onChange={(e) => this.getItems(e.target.value)}
                  onSelect={(val) => this.setState({Name: val})}
                />

               
                </FormGroup>
                <FormGroup hidden={false}>
                  <Label >Barcode</Label>
                  <div>
                  <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                    />
                  <p>{this.state.result}</p>
                </div>
                </FormGroup>
                <FormGroup>
                  <Label >Expires</Label>
                  <Input
                  type="date"
                  name="Expires"
                  id="expires"
                  value={this.state.Expires}
                  onChange={this.handleChange} />
                </FormGroup>

                <Button onClick={this.save}>Save</Button>
              </Form>
             </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default NewStuff;
