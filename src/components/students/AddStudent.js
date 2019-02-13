import React, {Component} from 'react';
import {connect} from 'react-redux';
import api from '../../api';
import history from '../../history';

import StudentForm from './StudentForm';
import {addStudent} from '../../actions/student';


class AddStudent extends Component {
    state={newId:null};

    async componentDidMount(){
        const reponse = await api.get('/students/nextId').then(res => res.data);
        this.setState({newId:reponse.id});
    }

    handleAdd = () => {
        this.refs.studentform.submit();
    }

    onStudentSubmit = formValues => {
        this.props.addStudent(formValues,this.state.newId);
    }

    render(){
        return (
            <>
                <h1 className="ui header">
                    Student Registration
                    <button className="ui right floated negative button" onClick={()=> history.push('/')}>Cancel</button>
                    <button className="ui right floated positive button" onClick={this.handleAdd}>Save</button>
                </h1>
                <StudentForm ref="studentform" disable={true} onSubmit={this.onStudentSubmit} />
            </>
        )
    }
}

export default connect(null,{addStudent})(AddStudent);