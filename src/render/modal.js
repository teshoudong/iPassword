import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        });
    }

    handleClose() {
        this.setState({
            visible: false
        });
    }

    handleOk() {
        this.props.onOk();
    }

    handleCancel() {
        this.handleClose();
        this.props.onCancel();
    }

    render() {
        if (this.state.visible) {
            return (
                <div className="pw-modal">
                    <div className="modal-container">
                        <div className="modal-header">
                            {this.props.title && <p className="modal-title">{this.props.title}</p>}
                            <div className="modal-close" onClick={() => this.handleClose()}></div>
                        </div>
                        <div className="modal-content">{this.props.children}</div>
                        <div className="modal-footer">
                            <button className="modal-cancel" onClick={() => this.handleCancel()}>取消</button>
                            <button className="modal-ok" onClick={() => this.handleOk()}>确定</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
        
    }
}

Modal.defaultProps = {
    visible: false,
    onOk: () => {},
    onCancel: () => {}
};

Modal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};

export default Modal;