import React from 'react';
import moment from 'moment';

const renderPaymentDetails = payments => {
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
				{renderTableBody(payments)}
			</tbody>
		</table>
	)
}

const renderTableBody = payments => {
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
			<tr key={payment._id}>
				<td>{`RCPT-${payment._id.substring(15)}`}</td>
				<td>{category}</td>
				<td>{amount}</td>
				<td>{moment(payment.date).format('DD/MMM/YYYY')}</td>
			</tr>
		)
	})
}

const PayHisTable = ({payments}) => {
	return (
		renderPaymentDetails(payments)
	)
}

export default PayHisTable;