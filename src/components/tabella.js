import React from "react";
import db from "../data/db";

export class Table extends React.Component {
  state = {
    list: db,
    activeElements: db
  };

  handleFilterList = (text) => {
  const filterd = this.state.list.filter((item) => text === "" || item.first_name.includes(text) || item.last_name.includes(text))
  console.log(text, filterd)
    this.setState ({
        activeElements: filterd
    }) 
  }

  render() {
    return (
        <div>
            <SearchInput filter={this.handleFilterList}/>
      <table>
        {this.state.activeElements.map((item, index) => (
          <Row
            key={index}
            firstName={item.first_name}
            lastName={item.last_name}
            phone={item.phone}
            image={item.image}
          />
        ))}
      </table>
      </div>

    );
  }
}

export class Row extends React.Component {
  render() {
    return (
      <tr>
        <td> {this.props.firstName} </td>
        <td> {this.props.lastName} </td>
        <td> {this.props.phone} </td>
        <td>
          <img src={this.props.image} />
        </td>
      </tr>
    );
  }
}

export class SearchInput extends React.Component {

    state = {
        value: ""
    }

    onChange = (event) => {
        const value = event.target.value

        this.setState ({
            value: value
        })

        this.props.filter(value)

    }

    render () {
        return <input name="search" value={this.state.value} onChange={this.onChange} />
    }
}