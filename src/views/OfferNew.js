import React, { Component } from 'react';
import {Row, Col, Button, DropdownMenu, DropdownItem, Card, CardHeader, CardFooter, CardBody, Form, FormGroup, FormText, Label, Input} from 'reactstrap';

//Will get hardcoded subscriptions data from subscriptions JSON file in data
import subscriptions from '../../data/subscriptions.json';
//Will get hardcoded offers data from offerss JSON file in data
import offers from '../../data/offers.json';

class OfferNew extends Component {
  constructor(props){
		super(props);
    //Attaching imported data to local object for modifications
		this.subscriptionList = subscriptions;
		this.offerList = offers;

    //state upadte is not need so using local object instead of state object
		this.info = {
			"id": new Date().getTime(),
			"name":"",
			"programsIncluded":[],
			"type":"Monthly",
			"benefit": ""
		}
		this.selectedPrograms = {};

    //creating array with percentage values
		this.off = [];
		for(let i=0;i<=100;i++)
			this.off.push(i+"% Off");
	}

	newOffer(){
    //Invoked when offer is to be created with entered details
    //will call programs select to get selected subscriptions
		this.programSelect();

    //Will push to local object as imported files are cached. So all components will have same object and
    // modifications will be made to single object.
		this.offerList.push(this.info);
	}

	programSelect(){
    //Will get selected programs
		const select = document.getElementById("multipleProgramSelect");
	    const selected = [];
	    for (var i = 0; i < select.length; i++) {
	        if (select.options[i].selected) selected.push(select.options[i].value);
	    }
	    this.info.programsIncluded = selected;
	}

  render() {
    return (
      <div className="animated fadeIn" style={{marginTop:25}}>
	      <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Create New Offer</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Offer Id</Label>
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
                      <Input type="text" id="text-input" name="text-input" placeholder="Name of the Offer" onChange={(e)=>{this.info.name=e.target.value}}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Included Programs</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="multiple-select" id="multipleProgramSelect" multiple onChange={(e)=>this.programSelect()}>
                      	{
                      		this.subscriptionList.map(item=> {
                      			return <option key={item.id} value={item.id}>{item.name}</option>
                      		})
                      	}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="select" id="select" onChange={(e)=>this.info.type=e.target.value}>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Benefit</Label>
                    </Col>
                    <Col xs="12" md="9">
                       <Input type="select" name="select" id="select" onChange={(e)=>this.info.benefit=e.target.value}>
                       {
                       		this.off.map(item=>{
                       			return <option key={item} value={item}>{item}</option>                       			
                       		})
                       }
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" href="/#/offers/list" color="primary" onClick={()=>this.newOffer()}><i className="fa fa-dot-circle-o"></i> Create</Button>
              </CardFooter>
            </Card>
          </Col>
      </div>
    )}
}

export default OfferNew;
