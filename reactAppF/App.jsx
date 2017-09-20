import React from 'react';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:
            [
                {
                    "id":1,
                    "name":"Sushma",
                    "age":"22"
                },
                {
                    "id":2,
                    "name": "Nikitha",
                    "age": 24
                },
                {
                    "id":3,
                    "name":"Amala",
                    "age": 24
                }
            ],
            header: "Hello from other side",
            "content": "Dog days are over"
        }
    }
    render(){
        var i = 1;
        var myStyle = {
            fontSize: 100,
            color: '#FF0000'

        }
        return (
            <div>
                <h1  style = {myStyle}>Hello World</h1>
                <h2>{this.props.headerProp}</h2>
                <h2>{this.props.contentProp}</h2>
                <h2>{this.props.headerProppart}</h2>
                <h2>{this.props.contentProppart}</h2>

                <h2>Content</h2>
                <p data-myattribute="somevalue">This is the content</p>
                <h1>{1+1}</h1>
                <h2>{i==1 ? 'True!' : 'False'}</h2>
                <Header />
                    {this.state.header}
                    <table>
                        <tbody>
                            {this.state.data.map((person, i) =>
                                <TableRow data = {person} />

                            )}
                        </tbody>
                    </table>
                    {this.state.content}
                <Content/>
                <Header headerProp = {this.state.header}/>
            <Content contentProp = {this.state.content}/>

            </div>
        )
    }
}

//you can set default property values directly on the component constructor instead of adding to the reactDom.render()
App.defaultProps = {
    headerProppart: "why hello there",
    contentProppart: "well bye"

}

class Header extends React.Component{
    render(){
        return(
            <div>
                <h1>Hi!</h1>
                <h1>{this.props.headerProp}</h1>
            </div>
        )
    }
}

class Content extends React.Component{
    render(){
        return(
            <div>
                <h2>Bye!</h2>
                <p>The content text!</p>
                <h2>{this.props.contentProp}</h2>
            </div>
        )
    }
}

class TableRow extends React.Component{
    render(){
        return(
            <tr>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.age}</td>
            </tr>
        )
    }
}


//so basically App component is owner of Header and Content
export default App;

