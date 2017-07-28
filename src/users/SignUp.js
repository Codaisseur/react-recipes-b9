import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { history } from '../store'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import signUp from '../actions/user/sign-up'
import Title from '../components/Title'

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

export class SignUp extends PureComponent {
  state = { errors: {} }

  submitForm(event) {
    if (!this.checkPasswords()) return

    const user = {
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    }
    this.props.signUp(user)
  }

  checkPasswords() {
    const { password, passwordConfirmation } = this.refs
    if (passwordConfirmation.getValue() !== password.getValue()) {
      this.setState({ errors: { passwordConfirmation: 'Passwords do not match!' }})
      return false
    }
    this.setState({ errors: { passwordConfirmation: null }})
    return true
  }

  signIn() {
    history.push('/sign-in')
  }

  render() {
    const { errors } = this.state

    return (
      <Paper style={ dialogStyle }>
        <Title content="Sign Up" />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField ref="name" hintText="Your name" />
          </div>
          <div className="input">
            <TextField ref="email" type="email" hintText="Email address" />
          </div>
          <div className="input">
            <TextField ref="password" type="password" hintText="Password"  />
          </div>
          <div className="input">
            <TextField
              ref="passwordConfirmation"
              type="password"
              onChange={this.checkPasswords.bind(this)}
              errorText={errors.passwordConfirmation}
              hintText="Confirm password" />
          </div>
          <FlatButton
            onClick={ this.signIn }
            label="Sign in" />
          <RaisedButton
            style={ buttonStyle }
            onClick={ this.submitForm.bind(this) }
            label="Sign up"
            primary={true} />
        </form>
      </Paper>
    )
  }
}

export default connect(null, { signUp })(SignUp)
