import React from 'react';
import ReactDOM from 'react-dom';




class AddPayment extends React.Component {

    render(){
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" onClick={this.props.onDismiss}>
                <div className="ui active tiny modal" onClick={e=>e.stopPropagation()}>
                    <div className="header">{this.props.header}</div>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <div className="actions">
                        {this.props.actions}
                        <div className="ui negative button" onClick={this.props.onDismiss}>{this.props.closeBtn}</div>
                    </div>
                </div>
            </div>,
            document.querySelector('#model')
        )
    }
} ;

export default AddPayment;