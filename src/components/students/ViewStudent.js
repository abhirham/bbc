import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';

import {fetchStudent} from '../../actions/student';
import {fetchAchievements} from '../../actions/achievement';
import {getPayments} from '../../actions/payments';
import Loader from '../Loader';
import PayHisTable from '../payments/PayHisTable';
import '../../stylesheets/ViewStudent.css'

class ViewStudent extends Component{

    componentDidMount(){
        this.props.fetchStudent(this.props.match.params.id);
        this.props.fetchAchievements(this.props.match.params.id);
        this.props.getPayments(this.props.match.params.id);
    }

    renderStudentDetails(student){
        return (
            <div className="description">
                <div className="ui small feed"><b>ID: </b>{student.id}</div>
                <div className="ui small feed"><b>Rank: </b><div className={`ui ${student.rank.color} large horizontal label`}>{student.rank.color.toUpperCase()}</div></div>
                <div className="ui small feed"><b>Date of join: </b>{student.doj}</div>
                <div className="ui small feed"><b>Email: </b>{student.email}</div>
                <div className="ui small feed"><b>Phone: </b>{student.phoneNumber}</div>
                <div className="ui small feed"><b>Date of birth: </b>{student.dob}</div>
            </div>
        )
    }

    renderParentDetails(student){
        return (
            <div className="description">
                <div className="ui small feed"><b>Email: </b>{student.parentEmail}</div>
                <div className="ui small feed"><b>Phone: </b>{student.parentPhoneNumber}</div>
            </div>
        )
    }

    renderParentCard(student){
        if(student.parentFirstName)
            return (
                <div className="ui segment column">
                    <h2 className="ui header">{student.parentFirstName} {student.parentLastName}</h2>
                    <div className="meta">{student.relation}</div>
                    {this.renderParentDetails(student)}
                </div>
            )
    }

    renderAchievements(){
        const ranks = this.props.achievements.map(rank => {
            return (
                <div className="item" key={rank.date}>
                    <div className={`ui ${rank._id.color} large horizontal label`}>{rank._id.color} Belt</div>
                    {moment(rank.date).format('DD/MMM/YYYY')}
                </div>
            )
        })
        return (
            <div className="ui divided list">
                {ranks}
            </div>
        )
    }
    
    render(){
        const {student} = this.props;
        if(!student)
            return <Loader />
        return (
            <>
                <h1 className="ui header">
                    Student Details
                    <Link className="ui right floated primary button" to="/">Back</Link>
                    <Link className="ui right floated yellow button" to={`/students/${student._id}/edit`}>Edit</Link>
                </h1>
                <div className="ui equal width grid">
                    <div class="equal width row">
                        <div className="ui segment column">
                            <h2 className="ui header">{student.firstName} {student.lastName}</h2>
                            {this.renderStudentDetails(student)}
                        </div>
                        {this.renderParentCard(student)}
                        <div className="ui segment column">
                            <h2 className="ui header">Achievements</h2>
                            {this.renderAchievements()}
                        </div>
                    </div>
                </div>
                <div className="ui green segment">
                    <h1 className="ui header">Payment History</h1>
                    <PayHisTable payments={this.props.payments} />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        student: state.students[ownProps.match.params.id],
        achievements: state.achievements,
        payments: state.payments
    };
}

export default connect(mapStateToProps,{fetchStudent,fetchAchievements,getPayments})(ViewStudent);