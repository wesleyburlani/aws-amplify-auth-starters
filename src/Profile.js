import React from 'react'
import { css } from 'glamor'
import { Auth } from 'aws-amplify'
import Container from './Container'
import Button from './Button'

class Profile extends React.Component {

  state = {
    phoneNumber: ''
  }

  render() {
    return (
      <Container>
        <h1>Profile</h1>
        <input
          placeholder='phone number'
          onChange={e => this.setState({ phoneNumber: e.target.value })}
          {...css(styles.input)}
        />
        <Button
          title="Set Phone Number"
          onClick={getInfo()}
        />
        <Button
          title="Enable MFA"
          onClick={enableSMS()}
        />
        <Button
          title="Sign Out"
          onClick={signOut}
        />
      </Container>
    )
  }
}

function enableSMS() {
  Auth.currentAuthenticatedUser().then((user) =>{
    Auth.enableSMS(user);
  }).catch(() => console.log('error'))
}

function getInfo() {
  Auth.currentAuthenticatedUser().then((user) =>{
    Auth.updateUserAttributes(user, { phone_number: this.state.phoneNumber}).then(str => {
    }).catch(() => console.log('error2'))
  }).catch(() => console.log('error'))
}

function signOut() {
  Auth.signOut()
    .then(() => {
      this.props.history.push('/auth')
    })
    .catch(() => console.log('error signing out...'))
}


const styles = {
  input: {
    padding: 8,
    height: 40,
    width: 225,
    border: '1px solid #ddd'
  }
}

export default Profile
