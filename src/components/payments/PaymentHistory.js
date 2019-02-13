import React, {Component} from 'react'
import {connect} from 'react-redux';

import AddPayment from './AddPayment';
import {addPayment} from '../../actions/payments';
import Loader from '../Loader';
import PayHisTable from './PayHisTable';

class PaymentHistroy extends Component{

	state={showModal: false};
	
	handleSubmit = (formValues) => {
		this.props.addPayment({purchases:formValues.purchases,studentId:this.props.student._id});
		this.setState({showModal:false});
	}

	renderAddPayment(){
		if(this.state.showModal)
			return <AddPayment onDismiss={()=>{this.setState({showModal:false})}} 
				handleSubmit={this.handleSubmit} />
	}
    
	render(){
		const {student,payments} = this.props;
		if(payments.length>0 && !payments.some(item => item.studentId===student._id))
			return <Loader />
		return (
			<>
				<div className="ui segment">
					<h1 className="ui header">Payment history for {student.firstName} {student.lastName}
						<button className="ui button green right floated" 
							onClick={()=>{this.setState({showModal:true})}}>Add payment</button>
					</h1>
					<PayHisTable payments={this.props.payments} />
				</div>
				{this.renderAddPayment()}
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {payments:state.payments}
}

export default connect(mapStateToProps,{addPayment})(PaymentHistroy);