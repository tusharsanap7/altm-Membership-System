import React, { Component } from 'react';
import {Row, Col, Button, DropdownMenu, DropdownItem, Card, CardHeader, CardFooter, CardBody, Form, FormGroup, FormText, Label, Input} from 'reactstrap';

//Will get hardcoded subscriptions data from subscriptions JSON file in data
import subscriptions from '../../data/subscriptions.json';

class ProgramNew extends Component {
	constructor(props){
		super(props);
    //Attaching imported data to local object for modifications
		this.subscriptionList = subscriptions;

    //state upadte is not need so using local object instead of state object
		this.info = {
			"id": new Date().getTime(), // ID for the new new program
			"name":"",
			"area":"",
			"price":""
		}
	}

	newSubscription(){
    //Will push to local object as imported files are cached. So all components will have same object and
    // modifications will be made to single object.
		this.subscriptionList.push(this.info);
	}

  render() {
    return (
      <div className="animated fadeIn" style={{marginTop:25}}>
	      <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Create New Subscription Program</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Subscription Id</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.info.id}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Name of the program" onChange={(e)=>{this.info.name=e.target.value}}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Aread Covered</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Area covered by the program" onChange={(e)=>{this.info.area=e.target.value}}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Price (INR)</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Cost of the program" onChange={(e)=>{this.info.price=e.target.value}}/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" href="/#/subscription/programs" color="primary" onClick={()=>this.newSubscription()}><i className="fa fa-dot-circle-o"></i> Create</Button>
              </CardFooter>
            </Card>
          </Col>
      </div>
    )
  }
}

export default ProgramNew;
