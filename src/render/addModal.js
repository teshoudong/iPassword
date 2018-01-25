import React from 'react';
import './addModal.scss';
import Modal from './modal';

class AddModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        this.newProps = Object.assign({}, this.props, {
            title: '添加密码'
        });
        
        return (
            <Modal {...this.newProps}>
                <div className="pw-addModal">
                    <form className="addModal-form" ref={form => this.form = form}>
                        <div className="item">
                            <p className="title">用户名</p>
                            <div className="content">
                                <input type="text"/>
                            </div>
                        </div>
                        <div className="item">
                            <p className="title">密码</p>
                            <div className="content">
                                <input type="text"/>
                            </div>
                        </div>
                        <div className="item">
                            <p className="title">网站</p>
                            <div className="content">
                                <input type="text"/>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default AddModal;