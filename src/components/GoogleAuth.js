import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';
 
class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
           window.gapi.client.init({
            clientId: '720018437258-kujeg2qgv00oftn8f6urouq9i56s19pk.apps.googleusercontent.com',
            scope: 'email'
           }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
           });
        });
    };

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    renderAuthButton() {
        if(this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon" />
                    Sair
                </button>
            );
        }

        return (
            <button onClick={this.onSignIn} className="ui red google button">
                <i className="google icon" />
                Entrar
            </button>
        );
    };

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
};

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);