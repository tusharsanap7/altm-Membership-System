import React, { Component } from 'react';
import {Row, Col, Button, DropdownMenu, DropdownItem, Card, CardHeader, CardFooter, CardBody, Form, FormGroup, FormText, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

//Will get hardcoded subscriptions data from subscriptions JSON file in data
import subscriptions from '../../data/subscriptions.json';
//Will get hardcoded offers data from offerss JSON file in data
import offers from '../../data/offers.json';
//Will get hardcoded users data from users JSON file in data
import userInfo from '../../data/userInfo.json';

class ProgramRenewal extends Component {

  constructor(props){
		super(props);

    //Will get list of user's subscribed programs
		this.userSubscriptions = {};
    let subscribed = sessionStorage.getItem("subscriptions").split(",");
    if(!subscribed)
      subscribed = [];
    for(let id of subscribed)
        this.userSubscriptions[id] = true;
		this.subscriptionList = subscriptions;

		this.user = userInfo[sessionStorage.getItem("userName")];

    //Will create subscription Id ro data mapping 
		this.offerList = offers;
		this.offerApplicable = {};
		this.subsciptionPriceList = {};
		for(let subscription of subscriptions){
			this.subsciptionPriceList[subscription.id] = subscription;
		}

    //Will generate valid offers list for eacg program
		for(let offer of offers){
			for(let subId of offer.programsIncluded){
				if(!this.offerApplicable[subId])
					this.offerApplicable[subId] = [];

			  this.offerApplicable[subId].push({
					id: offer.id,
					name: offer.name,
					benefit: offer.benefit
				});
			}
		}
    // vaiables which update should not create re-render
		this.info = {
			"id": new Date().getTime(),
			"name":"",
			"programsIncluded":[],
			"type":"Monthly",
			"benefit": ""
		}
    //state variables
		this.state ={
			"applicableOffers":[],
			"price":"-",
			"priceFinal":"-",
			"offer":"0% Off",
			"subscriptionName":"",
			"primary":false
		};
	}

	togglePrimary() {
    //Will show and hide modal dialog
    this.setState({
      primary: !this.state.primary
    });
  }

	newSubscription(){
    //Will be invoked when subscription payment is confirmed
		this.togglePrimary();
    //Will push to local object as imported files are cached. So all components will have same object and
    // modifications will be made to single object.
		this.user.subscriptions.push(this.state.subscriptionId);
    //Will update user's subscribed programs, So it will reflect in list
		sessionStorage.setItem("subscriptions", this.user.subscriptions.toString());
	}

	programSelect(value){
    //Will be invoked when programs is selected or changed
    //Will change valid offers as per selected program
		this.setState({
			"applicableOffers": this.offerApplicable[value],
			"subscriptionName": this.subsciptionPriceList[value].name,
			"subscriptionId":value,
			"price": this.subsciptionPriceList[value].price,
			"priceFinal": this.caluculateOfferPrice(Number(this.state.offer.split("%")[0]), this.subsciptionPriceList[value].price)
		});
	}

	caluculateOfferPrice(percentage, price){
    //Will calculate and return final price after offer
		return price-(price*percentage/100);
	}

	updateOffer(value){
    //Will update the selected offer
		let percentage = Number(value.split("%")[0]);
		this.setState({
			"priceFinal": this.caluculateOfferPrice(percentage, this.state.price)
		});
	}
  
  render() {
    return (
      <div className="animated fadeIn" style={{marginTop:25}}>
	      <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Renew or Get New Subscription</strong>
              </CardHeader>
              <CardBody>
              <Card>
              <CardHeader>
                <strong>Subscription Details</strong>
              </CardHeader>
              <CardBody>
              		<FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Select Subscrition Programs</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="select" id="select" onChange={(e)=>this.programSelect(e.target.value)}>
                      	<option key="-1" disabled selected value="-1">Select Program</option>
                      	{
                      		this.subscriptionList.map(item=> {
                      			if(!this.userSubscriptions[item.id])
                      				return <option key={item.id} value={item.id}>{item.name}</option>
                      		})
                      	}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Price (INR)</Label>
                    </Col>
                    <Col xs="12" md="9">
                    	<Label htmlFor="text-input">{this.state.price}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Choose Offer</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="select" id="select" onChange={(e)=>this.updateOffer(e.target.value)}>
                      	<option key="0" value="(0% Off)">No Offer - N/A </option>
                      	{
                      		this.state.applicableOffers.map(item=> {
                      				return <option key={item.id} value={item.benefit}>{item.name} ({item.benefit})</option>
                      		})
                      	}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Final Price (INR)</Label>
                    </Col>
                    <Col xs="12" md="9">
                    	<strong><Label htmlFor="text-input">{this.state.priceFinal}</Label></strong>
                    </Col>
                  </FormGroup>
              </CardBody>
              </Card>

            <Card>
              <CardHeader>
                <strong>Credit Card</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" required id="name" placeholder="Enter your name" required/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Credit Card Number</Label>
                      <Input type="text"  required id="ccnumber" placeholder="0000 0000 0000 0000" required/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Month</Label>
                      <Input type="select" required name="ccmonth" id="ccmonth">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccyear">Year</Label>
                      <Input type="select" required name="ccyear" id="ccyear">
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="cvv">CVV/CVC</Label>
                      <Input type="text" required id="cvv" placeholder="123" required/>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm"  color="primary" onClick={()=>this.togglePrimary()}><i className="fa fa-dot-circle-o"></i>Make Payment</Button>
              </CardFooter>
            </Card>
          </Col>
          <Modal isOpen={this.state.primary} toggle={()=>this.togglePrimary()}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={()=>this.togglePrimary()}>Confirm Payment</ModalHeader>
                  <ModalBody>
                    <strong>
                    	Do you want to confirm payment of {this.state.priceFinal} (INR) for {this.state.subscriptionName} ?
                    </strong>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" href="/#/subscription/programs" onClick={()=>this.newSubscription()}>Yes</Button>
                    <Button color="secondary" onClick={()=>this.togglePrimary()}>Cancel</Button>
                  </ModalFooter>
                </Modal>
      </div>
    )}
}

export default ProgramRenewal;
