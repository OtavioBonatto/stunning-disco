import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions = () => (
        <div>
            <button onClick={() => this.props.deleteStream(this.props.match.params.id)}  className="ui button negative">Deletar</button>
            <Link to='/' className="ui button">Cancelar</Link>
        </div>
    );

    renderContent() {
        if(!this.props.stream) {
            return <div>Tem certeza que deseja deletar a stream?</div>
        }

        return (
            <div>{`tem certeza que deseja remover a stream: ${this.props.stream.title}`}</div>
        );
    
    }

    render() {
        return (
            <Modal title='Deletar Stream' content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push('/')}/>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);