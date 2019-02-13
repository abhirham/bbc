import React, {Component} from 'react';
import moment from 'moment';
import ViewPayment from '../modal';
import '../../stylesheets/PayHisTable.css';


class PayHisTable extends Component {

	state = {showModal: false,payment:null}

	renderPaymentDetails = payments => {
		if(payments.length===0)
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
					{this.renderTableBody(payments)}
				</tbody>
			</table>
		)
	}

	renderTableBody = payments => {
		return payments.map(payment => {
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
				<tr key={payment._id} onClick={()=>this.handlePaymentClick(payment)}>
					{/* eslint-disable-next-line  */}
					<td><a>{`RCPT-${payment._id.substring(15)}`}</a></td>
					<td>{category}</td>
					<td>{amount}</td>
					<td>{moment(payment.date).format('DD/MMM/YYYY')}</td>
				</tr>
			)
		})
	}

	handlePaymentClick(payment){
		this.setState({showModal:true,payment})
	}

	renderSinglePaymentTable(){
		return (
			<table className="ui celled green table">
				<thead>
					<tr >
						<th  className="greenHeader">Category</th>
						<th  className="greenHeader">Amount</th>
					</tr>
				</thead>
				<tbody>
					{this.state.payment.purchases.map((purchase,index) => {
						return (
							<tr key={index}>
								<td>{purchase.category}</td>
								<td>{purchase.amount}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		)
	}

	renderModal(){
		if(this.state.showModal){
			return (
				<ViewPayment 
					onDismiss={()=>{this.setState({showModal:false})}}
					closeBtn="Close"
					header={`Receipt of purchase made on ${moment(this.state.payment.date).format('DD/MMM/YYYY')}`}
				>
					{this.renderSinglePaymentTable()}
				</ViewPayment>
			)
		}
	}

	render(){
		return (
			<>
				{this.renderPaymentDetails(this.props.payments)}
				{this.renderModal()}
			</>

		)
	}
}

export default PayHisTable;