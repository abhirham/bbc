import React from 'react';
import {reduxForm, FieldArray, Field} from 'redux-form';

class PaymentForm extends React.Component{

    renderError({error,touched}){
		if(error && touched){
			return (
				<div className="ui pointing red basic label">
					{error}
				</div>
			)
		}
	}

    renderInput = ({input, meta}) => {
        return (
            <div className="required seven wide field">
                <label>Amount</label>
                <div className="ui right labeled input">
                    <input type="text" {...input} autoComplete="off" placeholder="00.00" />
                    <div className="ui tag label">CAD</div>
                </div>
                {this.renderError(meta)}
            </div>
        )
    }

    renderDeleteButton(fields,index){
        if(fields.length>1)
         return (
             <span className="ui field ">
                <label style={{color:'white'}}>.</label>
                <button className="ui red button " onClick={e => {
                        e.preventDefault();
                        fields.remove(index);
                    }}>
                    <i className="trash icon"></i>
                </button>
            </span>
        )
    }

    renderSelect = ({input, meta}) => {
        return (
            <div className="required seven wide field">
                <label>Category</label>
                <select className="ui fluid dropdown" {...input}>
                    <option value=""></option>
                    <option value="membership">Membership</option>
                    <option value="tests">Tests</option>
                    <option value="product">Product</option>
                </select>
                {this.renderError(meta)}
            </div>
        )
    }

    renderFields = ({fields}) => {
       return (
            <>
                {fields.map((field,index) => {
                     return (
                        <div className="fields" key={index}>
                            <Field name={`${field}.category`} component={this.renderSelect} />
                            <Field name={`${field}.amount`} component={this.renderInput} />
                            {this.renderDeleteButton(fields,index)}
                        </div>
                    )}
               ) }
                <button className="ui green button" onClick={e=> {
                        e.preventDefault();
                        fields.push({})
                    }}>+</button>
            </>
        )
    }

    render(){
        return (
            <form className="ui error form">
                <FieldArray name="purchases" component={this.renderFields} />
            </form>
        )
    }

}

const validate = ({purchases}) => {
    const error = {};
    if (purchases && purchases.length) {
       const paymentsArrayErrors = []
        purchases.forEach((purchase, index) => {
        const purchaseErrors = {}
        if (!purchase || !purchase.category) {
            purchaseErrors.category = "Select a valid option";
            paymentsArrayErrors[index] = purchaseErrors
        }
        if (!purchase || !purchase.amount) {
            purchaseErrors.amount = "Enter a valid amount";
            paymentsArrayErrors[index] = purchaseErrors
        }
        });
        if (paymentsArrayErrors.length) {
            error.purchases = paymentsArrayErrors
        }
    }
    return error;
}

export default reduxForm({
    form: "paymentForm",
    validate
})(PaymentForm);