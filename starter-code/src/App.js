import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';
import foods from './foods.json'
import FoodBox from './FoodBox'

class App extends Component {

  state = {
    allFoods: foods,
    filterFoods: foods,
    show: false,
    foodList: {
      // pizza: {
      //   quantity:5,
      //   calories:200000
      // },
      // watermelon: {
      //   quantity:2,
      //   calories:0
      // }
    }
  }
  showFoods = () => this.state.filterFoods.map((eachFood, i) => ( 
    <FoodBox 
      key={i} 
      {...eachFood}  
      updateFoodList={ this.updateFoodList} />) 
  )
  
  addFoodToList = (e) => {
    e.preventDefault()
    // console.log(e.target.elements.name.value, e.target.elements.calories.value, e.target.elements.image.value)
    let newFoods = [...this.state.allFoods] //made a copy of allFoods
    newFoods.unshift({ name: this.state.name, calories: this.state.calories, image: this.state.image }) //pushed our newly typed food into newFoods 
    this.setState({
      filterFoods: newFoods,  //update filterFoods with brand new food 
      allFoods: newFoods
    })
    
    this.toggleFoodForm() //hide form on submit 
  }
  
  addingFoodToState = (e) => {
    //console.log(e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value //create dynamic key and add that value 
    })
  }
  
  toggleFoodForm = () => this.setState({ show: !this.state.show })
  
  search = (e) => {
    let filterFoods = this.state.allFoods.filter(eachFood => {
      return eachFood.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    this.setState({
      filterFoods
    })
  }

  updateFoodList = (food) => {
    console.log(food)
    let foodListCopy = { ...this.state.foodList }
    //foodListCopy['hello'] = 'world '+Date.now()
    foodListCopy[ food.name ] = food
    //foodListCopy [ Pizza ] = { quantity: 5, calories: 2000, name: Pizza }
    this.setState({ foodList:foodListCopy })
  }

  showFoodList = () => {
    let foodListCopy = { ... this.state.foodList }
    return Object.keys(foodListCopy).map(function(key) {
      return <li value={key}>
              <span >{foodListCopy[key].name} | </span>
              <span >{foodListCopy[key].calories}| </span>
              <span >{foodListCopy[key].quantity}  </span>
            </li>
    });

  }


  countTotal = () => {
    let total = 0; 
    let foodListCopy = { ...this.state.foodList }
    for(let key in foodListCopy){
      console.log('key is',key, ' calories is ',foodListCopy[key].calories)
      total += Number( foodListCopy[key].calories )
      //key is "Pizza" calories is foodListCopy["Pizza"].calories 
    }
    return total

  }



  render() {
    return (
      <div className="App">
        <h2>Iron Nutrition</h2>

        <input type="text" onChange={this.search} placeholder="Search for food...."/>
        {this.showFoodList()}
        <br></br>
        Total: {this.countTotal()}


        <br></br>
        <br></br>
        {this.state.show ?
          <form onSubmit={this.addFoodToList}>
            <input type="text" name="name" onChange={this.addingFoodToState} />
            <input type="text" name="calories" onChange={this.addingFoodToState} />
            <input type="text" name="image" onChange={this.addingFoodToState} />
            <button>Submit</button>
          </form>
          : 
          <button onClick={this.toggleFoodForm}>Add New Food</button>

        }

        {this.showFoods()}
      </div>
    );
  }
}

export default App;
