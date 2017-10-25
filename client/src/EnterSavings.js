import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

//form for entering
class EnterSavings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isSaved = true, should it be included here...
      savings: [],
      Description: "",
      Category: "",
      Amount: ""
    };
    //thisis the binding line necessary to keep this bound correctly
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === "Description") {
      this.setState({
        Description: value
      });
    } else if (name === "Category") {
      this.setState({
        Category: value
      });
    } else {
      this.setState({
        Amount: value
      });
    }
  }

  handleSubmit(e) {
    console.log("Description: ", this.state.Description);
    console.log("Category: ", this.state.Category);
    console.log("Amount: ", this.state.Amount);
    e.preventDefault();
    let Description = this.state.Description;
    let Category = this.state.Category;
    let Amount = this.state.Amount;

    //add all three variables to object {} -- let Object = {insert object of three variables}
    let newObject = {
      Description: Description,
      Category: Category,
      Amount: Amount,
      isSaved: true,
      userId: 10
    }
    //data: Ojbect of the three variables

    //re-set state based on updated form information...
    let tempArr = [];
    tempArr.push(this.state.savings);
    tempArr.push("newObject: ", newObject);
    //add the new object (Object) to tempArr -- Google: ".shift() for objects"
    //setState to tempArr (which is already done below)
    console.log("state: ", this.state.savings);
    let a = this;
    axios.post('/bankRecords/savedList', {
      data: newObject//insert object of the three variables
    }).then(function (response) {
      a.setState({
        savings: tempArr
      })
    }).catch(function (error) {
      console.log("error: ", error);
    })

  }

  componentDidMount(){
    fetch("/bankRecords/savedList")
    .then((response) => response.json())
    .then((response) => this.setState({savings: response}))
  }

  render() {

    return (
      <div className="EnterSavingsWrapper flow-text medium ">
        <h1>Choose your savings</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>

          {/* <label htmlFor="Description">
            What is the thing you are saving on: 
          </label> 
          <input type="text" name="Description" placeholder="saving on" onChange={this.handleChange}/> */}
          {/* test */}
          <div class="row highlight">
        <div class="input-field col s12">
          <input id="Description" type="text" class="validate" onChange={this.handleChange}/>
          <label for="Description">Saved on...</label>
        </div>
      </div>
      {/* end test */}
          <div>
            {/* test */}
            <div class="row highlight">
        <div class="col s12">
         <h5>Category:</h5> 
            <select name="Category " value={this.state.value} onChange={this.handleChange}>
                <option  value="" disabled selected> </option>
                <option value="bills">Bills</option>
                <option value="groceries">Groceries</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="clothes">Clothes</option>
                <option value="dining Out">Dining Out</option>
                <option value="vices">Vices</option>
                <option value="debt">Debt</option>
                <option value="housing">Housing</option>
                <option value="savings">Savings</option>
                <option value="health">Health</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
         
        </div>
        </div>
            {/* test 2 */}
            {/* <label htmlFor="Category flow-text medium">
             Category:  
            </label>   
              <select name="Category " value={this.state.value} onChange={this.handleChange}>
                <option  value="" disabled selected>Choose your Category</option>
                <option value="bills">Bills</option>
                <option value="groceries">Groceries</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="clothes">Clothes</option>
                <option value="dining Out">Dining Out</option>
                <option value="vices">Vices</option>
                <option value="debt">Debt</option>
                <option value="housing">Housing</option>
                <option value="savings">Savings</option>
                <option value="health">Health</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select> */}
          </div>  

          
          <br />
          <label htmlFor="Amount">
            Money saved ($): 
          </label> 
          <input type="number" name="Amount" placeholder="enter number" onChange={this.handleChange}/>
          <input type="submit" value="Submit" />
          
        </form>
      </div>
    );
  }
}
export default EnterSavings;
