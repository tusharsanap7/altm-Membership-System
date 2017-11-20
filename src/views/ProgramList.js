import React, { Component } from 'react';
import {Badge, Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';

//Will get hardcoded subscriptions data from subscriptions JSON file in data
import subscriptions from '../../data/subscriptions.json';

class ProgramList extends Component {
  constructor(props){ 
    super(props);
    //user subscriptions
    const userSubscriptions = {};

    //Will get user's subscribed programs
    let subscribed = sessionStorage.getItem("subscriptions");
    if(!subscribed)
      subscribed = [];
    for(let id of subscribed)
        userSubscriptions[id] = true;
          
    this.state = {
      "subscriptions": subscriptions,
      "userSubscriptions": userSubscriptions,
      "subscribedLength": subscribed.length
    };
  }

  render() {
    return (
      <div className="animated fadeIn" style={{marginTop:25}}>
	      <Row>
	      	<Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Subscription Programs
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Program Name</th>
                    <th>Area</th>
                    <th>Price (INR)</th>
                    {this.state.subscribedLength !=0 && <th>Status</th>}
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.subscriptions.map(item => {
                      return <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.area}</td>
                        <td>{item.price}</td>                        
                        {this.state.subscribedLength !=0 && this.state.userSubscriptions[item.id] && <td>
                          <Badge color="success">Subscribed</Badge>
                        </td>}
                        {this.state.subscribedLength !=0 && !this.state.userSubscriptions[item.id] && <td>
                          <Badge color="warning">Not Subscribed</Badge>
                        </td>}
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

export default ProgramList;
