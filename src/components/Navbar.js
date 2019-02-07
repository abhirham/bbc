import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 

class Navbar extends Component {
    
    checkActive(path){
        if(window.location.pathname===path)
            return "active";
    }

    render(){
        return (
            <div className="ui inverted vertical pointing menu">
                <Link className={`${this.checkActive("/students")} item`} to="/students">View Students</Link>
                <Link className={`${this.checkActive("/students/new")} item`} to="/students/new">Register New Student</Link>
                <Link className={`${this.checkActive("/students/payments")} item`} to="/students/payments">Student Payments</Link>
            </div>
        )
    }
}

export default Navbar;