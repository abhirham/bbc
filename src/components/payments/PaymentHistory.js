import React, {Component} from 'react'
import {connect} from 'react-redux';
import moment from 'moment';

import AddPayment from './AddPayment';
import {addPayment} from '../../actions/payments';
import Loader from '../Loader';

class PaymentHistroy extends Component{

	state={showModal: false};
	
	renderTableBody(){
		return this.props.payments.map(payment => {
			const purchases = payment.purchases;
			let category = purchases[0].category;
			let amount = 0;
			if(purchases[1])
				category+= `, ${purchases[1].category}`;
				if(purchases.length>2)
					category+=`...`;
			purchases.forEach(purchase => {
				amount+= purchase.amount;
			})
			return (
				<tr key={payment._id}>
					<td>{`RCPT-${payment._id.substring(15)}`}</td>
					<td>{category}</td>
					<td>{amount}</td>
					<td>{moment(payment.date).format('DD/MMM/YYYY')}</td>
				</tr>
			)
		})
	}

	renderPaymentDetails(){

		if(this.props.payments.length===0)
			return <div>There are not payments made by this student.</div>
		return(
			<table className="ui very basic table">
				<thead>
					<tr>
						<th>Receipt No</th>
						<th>Purchase Category</th>
						<th>Purchase Amount</th>
						<th>Purchase Date</th>
					</tr>
				</thead>
				<tbody>
					{this.renderTableBody()}
				</tbody>
			</table>
		)
	}

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
					{this.renderPaymentDetails()}
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