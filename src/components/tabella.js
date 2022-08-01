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
        <tbody>
        {this.state.activeElements.map((item, index) => (
          <Row
            key={index}
            firstName={item.first_name}
            lastName={item.last_name}
            phone={item.phone}
            image={item.image}
          />
        ))}
        </tbody>
      </table>
      </div>

    );
  }
}

export class Row extends React.Component {
  render() {

    
    const rowStyle = {
        backgroundColor: "beige",
    }

    const columnStyle = {
        border: "1px solid black",
    }

    const imgStyle = {
        width: "100px",
        height: "100px",
    }

    return (
      <tr style={rowStyle}>
        <td style={columnStyle}> {this.props.firstName} </td>
        <td style={columnStyle}> {this.props.lastName} </td>
        <td style={columnStyle}> {this.props.phone} </td>
        <td style={columnStyle}>
          <img style={imgStyle} src={this.props.image} />
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

        const inputStyle = {
            border: "3px solid black"
        }

        return <input style={inputStyle} name="search" value={this.state.value} onChange={this.onChange} placeholder={"Type here to search"}/>
    }
}