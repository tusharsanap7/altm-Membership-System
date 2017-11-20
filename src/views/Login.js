import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';


class Login extends Component {
  constructor(props){
    super(props);
    //state update is not needed to not using state variable
    this.info = {
      "username":"",
      "password":""
    }
  }
  
  updateUserName(value){
    //Not need to set in state variable as view doesn't need to be updated
    this.info.username = value;
  };

  updatePassword(value){
    //Not need to set in state variable as view doesn't need to be updated
    this.info.password = value;
  };

  login(){
    //Now will call parent's login method with data
    this.props.login(this.info);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <p style={{"color":"red"}}>{this.props.loginMessage}</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input type="text" placeholder="Username" onChange={(event)=>this.updateUserName(event.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input type="password" placeholder="Password" onChange={(event, newValue)=>this.updatePassword(event.target.value)}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={(event)=>this.login()}>Login</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h1>Membership System</h1>
                      <Button color="primary" href="/#/register" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
