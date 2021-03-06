import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Auth } from 'aws-amplify';


class Register extends Component {
  constructor(props) {
    super(props);
    console.log('props: ', this.props);
    this.state = {
      submitDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit() {
    console.log(this.state);
    
    try {
      const user = Auth.signUp({
        username: this.state.userName,
        password: this.state.passWord,
        attributes: {
          email: this.state.userName
        }
      });
      console.log({ user });
    } catch (error) {
      console.log('error signing up:', error);
      alert(error);
    }
    
    this.props.history.push('/login', { rhUser: this.state.userName });
  }
  
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
    if (this.state.userName && this.state.passWord) {
      this.setState({
        submitDisabled: false
      });
    }
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Use the same email and password as your Robinhood account.</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" placeholder="Robinhood Email" id='userName' onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" id='passWord' onChange={this.handleChange}/>
                    </InputGroup>
                    <Button color="success" block onClick={this.handleSubmit} disabled={this.state.submitDisabled}>Register RH Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Register);
