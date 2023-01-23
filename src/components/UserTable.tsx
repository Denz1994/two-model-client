import React from "react";

class UserTable extends React.Component{
    
    state = {
        userData: [
            { id: 1, name: 'John', age: 30 },
            { id: 2, name: 'Sara', age: 25 },
            { id: 3, name: 'Mike', age: 35, }
        ],
        
        formDataEntries: {
            id:'',
            name:'',
            age:'',
            birth:''
        }
    }
    udpateUsers = ()=>{}

    onSubmit = (event:any) => {
        event.preventDefault();
        fetch('http://localhost:3001/users/')
            .then(res=>res.json())
            .then(data => {
                this.state.userData = data[0]
            })
            .catch(err=>console.log(err));
        this.setState({ formData: {
            ...this.state.formDataEntries,
            [event.target.name]: event.target.value 
            }
         });
      }

    onChangeHandler = (event:any) => {
        this.setState({ formData: {
            ...this.state.formDataEntries,
            [event.target.name]: event.target.value 
            }
         });
      }
    
    render(){
        return(
            <div>
            <form onSubmit={this.onSubmit}>
                <label>
                    First Name:
                    <input type="text" name="First Name" onChange={this.onChangeHandler}/>
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" name="Last Name" onChange={this.onChangeHandler}/>
                </label>
                <label>
                    Start:
                    <input type="date" name="Start" onChange={this.onChangeHandler}/>
                </label>
                <label>
                    End:
                    <input type="date" name="End" onChange={this.onChangeHandler}/>
                </label>
                <label>
                    Profession:
                    <input type="text" name="Profession" onChange={this.onChangeHandler}/>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <table>
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Date Created</th>
                    <th>Profession</th>
                    <th>Country</th>
                    <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.userData.map((entry:any) => (
                    <tr key={entry.id}>
                        <td>{entry.firstName}</td>
                        <td>{entry.lastName}</td>
                        <td>{entry.email}</td>
                        <td>{entry.dateCreated}</td>
                        <td>{entry.profession}</td>
                        <td>{entry.country}</td>
                        <td>{entry.city}</td>
                    </tr>
                    ))}
                </tbody>
                </table> 
            </div>
        )
    }
}

export default UserTable;