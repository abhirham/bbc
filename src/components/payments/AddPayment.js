import React from 'react';
import ReactDOM from 'react-dom';

import PaymentForm from './PaymentForm';


class AddPayment extends React.Component {

    

    handleAdd = () => {
        this.refs.paymentForm.submit();
    }

    render(){
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" onClick={this.props.onDismiss}>
                <div className="ui active tiny modal" onClick={e=>e.stopPropagation()}>
                    <div className="header">Add new payment</div>
                    <div className="content">
                        <PaymentForm initialValues={{purchases: [{}]}} ref="paymentForm" onSubmit={this.props.handleSubmit} />
                    </div>
                    <div className="actions">
                        <div className="ui green button" onClick={this.handleAdd}>Add</div>
                        <div className="ui negative button" onClick={this.props.onDismiss}>Cancel</div>
                    </div>
                </div>
            </div>,
            document.querySelector('#model')
        )
    }
} ;

export default AddPayment;