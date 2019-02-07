import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import api from '../../api';

import StudentForm from './StudentForm';
import {fetchStudent,editStudent} from '../../actions/student';

class EditStudent extends Component{

    componentDidMount(){
        this.props.fetchStudent(this.props.match.params.id);
    }

    handleSubmit = formValues => {
				this.props.editStudent(formValues,this.props.match.params.id);
				if(formValues.rank!==this.props.student.rank.color)
					api.post(`/achievements/${this.props.match.params.id}`,{rank:formValues.rank});
    }

    handleUpdate = () => {
        this.refs.studentform.submit();
    }

	render(){
		console.log(this.props.student);
		if(!this.props.student)
			return (
				<div >
					<div className="ui active inverted dimmer">
						<div className="ui text loader">Loading</div>
					</div>
				</div>
			)
		return (
			<>
				<h1 className="ui header">
						Student Registration
						<button className="ui right floated negative button">Cancel</button>
						<button className="ui right floated positive button" onClick={this.handleUpdate}>Update</button>
				</h1>
				<StudentForm ref="studentform" initialValues={_.omit({...this.props.student,rank:this.props.student.rank.color},'_id')} 
					onSubmit={this.handleSubmit} />
			</>
		)
	}
}

const mapStateToProps = (state,ownProps) => {
    return {student: state.students[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchStudent,editStudent})(EditStudent);