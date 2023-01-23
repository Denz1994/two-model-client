import React from "react";

class UserTable extends React.Component{
    
    state = {
        userData: [],
        formDataEntries: {firstName:null, lastName:null, start:null, end:null, profession:null}
    }

    buildPath = (formEntries:any):string=>{
        const {firstName, lastName, start, end, profession } = formEntries;
        const host = `http://localhost:3001`;
        let endPoint = '/users'
        if (firstName && lastName){
            endPoint = `/users/name/${firstName}/${lastName}`;
        }
        else if(firstName == null && lastName == null && profession == null && start && end){
            endPoint = `/users/date/${start}/${end}`;
        }
        else if(profession && firstName == null && lastName == null && start== null && end==null){
            endPoint = `/users/profession/${profession}`;
        }
        return host + endPoint
    }

    onSubmit = async (event:any) => {
        event.preventDefault();        
        const path = this.buildPath(this.state.formDataEntries); 
        console.log('Fetching at path = ', path)
        await fetch(path)
            .then(res=>res.json())
            .then(data => {
                this.state.userData = data
                console.log('Fetched data = ', this.state.userData)
            })
            .catch(err=>console.log(err));
            this.setState({ formDataEntries: {
            ...this.state.formDataEntries,
            [event.target.name]: event.target.value 
            }

         });
        }
    
    onChangeHandler = async (event:any) => {
        await this.setState({ formDataEntries: {
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
                    <input type="text" name="firstName" onChange={this.onChangeHandler}/>
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" name="lastName" onChange={this.onChangeHandler}/>
                </label>
                <label>
                    Start:
                    <input type="date" name="start" onChange={this.onChangeHandler}/>
                </label>
                <label>
                    End:
                    <input type="date" name="end" onChange={this.onChangeHandler}/>
                </label>
                <label>
                    Profession:
                    <input type="text" name="profession" onChange={this.onChangeHandler}/>
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