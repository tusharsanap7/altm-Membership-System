import React, { Component } from 'react';
import {Badge, Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';

//Will get hardcoded subscriptions data from subscriptions JSON file in data
import subscriptions from '../../data/subscriptions.json';
//Will get hardcoded offers data from offerss JSON file in data
import offers from '../../data/offers.json';

class OfferList extends Component {
 constructor(props){ 
    super(props);
    //subscription Id to name mapping is needed for computations
    let subcriptionList={};
    for(let item of subscriptions)
    	subcriptionList[item.id]=item.name;

    //getting list of valid subscritions programs under each offer
    for(let i in offers){
    	if(Array.isArray(offers[i].programsIncluded))
	    	for(let j in offers[i].programsIncluded)
	    		offers[i].programsIncluded[j] = subcriptionList[offers[i].programsIncluded[j]];

    	offers[i].programsIncluded = offers[i].programsIncluded.toString();	
    }

    //setting up state variable with offers
    this.state = {
      "offers": offers
    };
  }

  render() {
    return (
      <div className="animated fadeIn" style={{marginTop:25}}>
	      <Row>
	      	<Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Offers
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Offer Name</th>
                    <th>Valid Programs</th>
                    <th>Type</th>
                    <th>Benefit</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.offers.map(item => {
                      return <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.programsIncluded}</td>
                        <td>{item.type}</td>
                        <td>{item.benefit}</td>
                      </tr> 
                    })
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
	      </Row>
      </div>
    )
  }
}

export default OfferList;
