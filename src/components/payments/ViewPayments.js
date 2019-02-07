import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchStudents} from '../../actions/student';
import {getPayments} from '../../actions/payments';
import PaymentHistroy from './PaymentHistory';

class ViewPayments extends Component {

	state = {text:'',student:null, err:''};

	componentDidMount(){
		this.props.fetchStudents();
	}

	renderDataList(){
		return this.props.students.map(student => {
			return <option key={student._id} value={`${student.firstName} ${student.lastName} (${student.id})`} />
		})
	}

	renderSearchInput = () => {
		return (
			<div className="required six wide field">
				<label>Search student</label>
				<div className="ui left icon input">
					<input type="text" list="student" autoComplete="off" value={this.state.text}
						onChange={e=> this.setState({text:e.target.value})} placeholder="Search student..." />
					<datalist id="student">
						{this.renderDataList()}
					</datalist>
					<i className="users icon"></i>
				</div>
				{this.renderError(this.state.err)}
			</div>
		)
	}

	handleSearch = () => {
		const student = this.props.students.find(student => student.firstName === this.state.text.split(' ')[0]);
		if(student && this.state.text.match(/[a-z][a-z0-9]*/)){
			this.setState({student,text:'',err:''});
			this.props.getPayments(student._id);
		}else
			this.setState({text:'',err:'Student not found!'});
	}

	handleChange = e => {
		this.setState({text:e.target.value});
	}

	renderError(error){
		if(error)
			return (
				<div class="ui pointing red basic label">
					{error}
				</div>
			)
	}

	renderPaymentHistory(){
		const {student} = this.state;
		if(student)
			return <PaymentHistroy student={student} />;
	}

	render(){
		if(this.props.students.length===0)
			return <h1>There are no students in the database</h1>
		return (
			<>
				<h1 className="ui header">Payments</h1>
				<div className="ui segment">
					<div className="ui form">
						{this.renderSearchInput()}
						<button className="ui green button" onClick={this.handleSearch}>Search</button>
					</div>
				</div>
				{this.renderPaymentHistory()}
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		students: Object.values(state.students),
		payments: state.payments
	};
}

export default connect(mapStateToProps,{fetchStudents,getPayments})(ViewPayments);