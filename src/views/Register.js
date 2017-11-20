import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

//Will get hardcoded users data from users JSON file in data
import users from '../../data/userInfo.json';

class Register extends Component {
  constructor(props){
  		super(props);
      // vaiables which update should not create re-render
  		this.info = {};

      //state variables
  		this.state = {
  			"message": "",
  			"userName":"",
  			"primary":false
  		};
  }

  submit(event){
  	if(!this.info.userName)
  		return this.setState({
  			"message":"Enter valid username!!"
  		});
  	if(users[this.info.userName])
  		return this.setState({
  			"message":"Username already registered!!"
  		});
  	if(!this.info.firstName)
  		return this.setState({
  			"message":"Enter First Name!!"
  		});
  	if(!this.info.lastName)
  		return this.setState({
  			"message":"Enter Last Name!!"
  		});
  	if(!this.info.password)
  		return this.setState({
  			"message":"Enter password!!"
  		});
  	if(this.info.password != this.info.passwordRep)
  		return this.setState({
  			"message":"Repeated password doesn't match!!"
  		});
  	this.setState({
  		"userName":this.info.userName
  	});

    //default role member for dummy data
  	this.info.role= "member";
    //default subscribed programs - empty
  	this.info.subscriptions= [];
    //Will push to local object as imported files are cached. So all components will have same object and
    // modifications will be made to single object.
  	users[this.info.userName]= this.info;
  	this.togglePrimary();
  }

  togglePrimary() {
    //Will be invoked to hide/show modal dialog
    this.setState({
      primary: !this.state.primary
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <p style={{"color":"red"}}>{this.state.message}</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                    <Input type="text" placeholder="Username" onChange={(e)=>this.info.userName=e.target.value}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon><i className="icon-notebook"></i></InputGroupAddon>
                    <Input type="text" placeholder="First Name" onChange={(e)=>this.info.firstName=e.target.value}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon><i className="icon-notebook" ></i></InputGroupAddon>
                    <Input type="text" placeholder="Last Name" onChange={(e)=>this.info.lastName=e.target.value}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                    <Input type="password" placeholder="Password" onChange={(e)=>this.info.password=e.target.value}/>
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                    <Input type="password" placeholder="Repeat password" onChange={(e)=>this.info.passwordRep=e.target.value}/>
                  </InputGroup>
                  <Button color="success" block onClick={(e)=>this.submit(e)}>Create Account</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.primary} toggle={()=>this.togglePrimary()}
               className={'modal-primary ' + this.props.className}>
          <ModalHeader toggle={()=>this.togglePrimary()}>Success</ModalHeader>
          <ModalBody>
            <strong>
            	Your account is created with username "{this.state.userName}"!
            </strong>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" href="#">Login</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Register;
