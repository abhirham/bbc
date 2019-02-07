import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import '../stylesheets/App.css';

import Navbar from './Navbar';
import AddStudent from './students/AddStudent';
import ListStudents from './students/ListStudents';
import ViewStudent from './students/ViewStudent';
import EditStudent from './students/EditStudent';
import ViewPayments from './payments/ViewPayments';

const App = () => {
	return (
		<Router history={history}>
			<div className="main">
				<div className="nav"><Navbar /></div>
				<div className="body">
					<Switch>
						<Route path="/students/payments" exact component={ViewPayments} />
						<Route path="/students/new" exact component={AddStudent} />
						<Route path="/students/:id/edit" exact component={EditStudent} />
						<Route path="/students/:id" exact component={ViewStudent} />
						<Route path="/students" exact component={ListStudents} />
						<Route path="/" exact component={()=> <Redirect to="/students" /> } />
					</Switch>
				</div>
			</div>
		</Router>
	)
}

export default App;