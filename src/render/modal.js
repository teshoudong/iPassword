import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    hide() {
        this.setState({
            visible: false
        });
    }

    show() {
        this.setState({
            visible: true
        });
    }
    

    handleOk() {
        this.props.onOk();
    }

    handleCancel() {
        this.hide();
        this.props.onCancel();
    }

    render() {
        if (this.state.visible) {
            return (
                <div className="pw-modal" onClick={() => this.hide()}>
                    <div className="modal-container" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            {this.props.title && <p className="modal-title">{this.props.title}</p>}
                            <div className="modal-close" onClick={() => this.hide()}></div>
                        </div>
                        <div className="modal-content">{this.props.children}</div>
                        <div className="modal-footer">
                            <button type="button" className="modal-cancel" onClick={() => this.handleCancel()}>取消</button>
                            <button type="button" className="modal-ok" onClick={() => this.handleOk()}>确定</button>
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
    onOk: () => {},
    onCancel: () => {}
};

Modal.propTypes = {
    title: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};

export default Modal;