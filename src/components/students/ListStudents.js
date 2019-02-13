import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import history from '../../history';
import '../../stylesheets/ListStudents.css'

import {fetchStudents} from '../../actions/student';
import Loader from '../Loader';

class ListStudents extends Component {

	componentDidMount(){
		this.props.fetchStudents();
	}

	renderStudents(){
		if(this.props.students.length===0)
			return (
				<Loader />
			)
		return this.props.students.map(student => {
			return (
				<tr key={student.id} onClick={()=>history.push(`/students/${student._id}`)}>
					<td>{student.id}</td>
					<td><Link to={`/students/${student._id}`}>{`${student.firstName} ${student.lastName} `}</Link></td>
					<td><div className={`ui ${student.rank.color} large label`}>{student.rank.color.toUpperCase()}</div></td>
					<td>{student.email}</td>
					<td>{student.phoneNumber}</td>
					<td>{student.doj}</td>
				</tr>
			)
		})
	}

	render(){
		return (
			<>
				<h1 className="ui header">List of Students</h1>
				<table className="ui single line table">
					<thead>
						<tr >
							<th>ID</th>
							<th>Name</th>
							<th>Rank</th>
							<th>Email</th>
							<th>Phone No</th>
							<th>Date of Join</th>
						</tr>
					</thead>
					<tbody>
						{this.renderStudents()}
					</tbody>
				</table>
			</>
		)
	}
}

const mapStateToProps = state => {
	return {students:Object.values(state.students)};
}

export default connect(mapStateToProps,{fetchStudents})(ListStudents);