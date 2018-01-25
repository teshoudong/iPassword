import React from 'react';
import './all.scss';
import AddModal from './addModal';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdd: false
        };
    }

    handleAdd() {
        this.setState({
            showAdd: true
        });
    }

    render() {
        const { showAdd } = this.state;
        return (
            <div className="pw-list">
                <div className="list-header">
                    <div className="search">
                        <input type="text" placeholder="搜索所有项目"/>
                    </div>
                    <div className="add" onClick={() => this.handleAdd()}></div>
                </div>
                <div className="list-content">
                    <div className="list-group">
                        <h1 className="list-title">百</h1>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-group">
                        <h1 className="list-title">百</h1>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="img">
                                <img src=""/>
                            </div>
                            <div className="content">
                                <p className="title">百度密码</p>
                                <p className="subtitle">markpop753951</p>
                            </div>
                        </div>
                    </div>
                </div>
                <AddModal visible={showAdd}/>
            </div>
        );
    }
}

class Detail extends React.Component {
    render() {
        return (
            <div className="pw-detail">
                <div className="detail-img">
                    <img src=""/>
                </div>
                <h1 className="detail-title">百度密码</h1>
                <div className="detail-list">
                    <div className="item">
                        <p className="title">用户名</p>
                        <p className="content">markpop772452853</p>
                    </div>
                    <div className="item">
                        <p className="title">密码</p>
                        <p className="content">markpop772452853</p>
                    </div>
                    <div className="item">
                        <p className="title">网站</p>
                        <p className="content">http://www.tmall.com</p>
                    </div>
                    <div className="item">
                        <p className="title">创建时间</p>
                        <p className="content">2018年11月12日 23:59:59</p>
                    </div>
                    <div className="item">
                        <p className="title">最后修改时间</p>
                        <p className="content">2018年11月12日 23:59:59</p>
                    </div>
                </div>
            </div>
        );
    }
}

class All extends React.Component {
    render() {
        return (
            <div className="pw-all">
                <List/>
                <Detail/>
            </div>
        );
    }
}

export default All;