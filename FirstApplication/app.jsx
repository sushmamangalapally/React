var PLAYERS = [
  {
    name: "Kobe Bryant",
    score: 31,
    id: 1
  },
  {
    name: "Steve Curry",
    score: 32,
    id: 2
  },
  {
    name: "Kevin Durant",
    score: 45,
    id: 3
  },
  {
    name: "Michael Jordan",
    score: 40,
    id: 4
  }
];

var nextId = 5;

var StopWatch = React.createClass({
  getInitialState: function(){
    return{
      running: false,
      elapsedTime: 0,
      previouTime: 0
    }
  },
  componentDidMount: function(){
    this.interval = setInterval(this.onTick, 100)
  },
  componentWillMount: function(){
    clearInterval(this.interval);
  },
  onTick: function(){
    if(this.state.running){
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      })
    }
    console.log("on Tick")
  },
  onStart: function(){
    this.setState({
      running: true,
      previousTime: Date.now()
    })
  },
  onStop: function(){
    this.setState({running: false})
  },
  onReset: function(){
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now()
    })
  },
  render: function(){
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return(
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        {this.state.running ? <button onClick={this.onStop}>Stop</button> : <button onClick={this.onStart}>Start</button>}
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
});

var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },
  getInitialState: function(){
    return {
      name: "",
    };
  },
  onNameChange: function(e){
    console.log('OnNameChange', e.target.value)
    this.setState({name:e.target.value})
  },
  onSubmit: function(e){
    e.preventDefault();

    this.props.onAdd(this.state.name);
    this.setState({name:""})
  },
  render: function(){
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
})

function Stats(props){
  var totalPlayers = props.players.length
  var totalPoints = props.players.reduce(function(total, player){
    return total+player.score
  }, 0)
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
        <td>Total Points:</td>
        <td>{totalPoints}</td>
      </tr>
    </tbody>
    </table>
  );
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired
};

function Header(props){
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
      <StopWatch />
  </div>

  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
}

// var Counter = React.createClass({
//   propTypes: {
//     initalScore: React.PropTypes.number.isRequired
//   },

//   getInitialState: function(){
//     return{
//       score: this.props.initalScore,
//     }
//   },
//   incrementScore: function(e){
//     this.setState({
//       score: (this.state.score+1),

//     })
//   },

//   decrementScore: function(e){
//     this.setState({
//       score: (this.state.score-1),

//     })  },
//   render: function(){
//     //if you do decrementScore() for onClick then that means you're calling decrementScore only once which is not what we wanna do
    
//   }
// });

function Counter(props){
  return (
     <div className="counter">
      <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
      <div className="counter-score">{props.score}</div>
      <button className="counter-action increment" onClick={function() {props.onChange(1);}}> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,

}

function Player(props){
  return (
    <div className="player">
    <div className="player-name">
      <a className="remove-player" onClick={props.onRemove}>x</a>
      {props.name}
    </div>
    <div className="player-score">
      <Counter  score={props.score} onChange={props.onScoreChange}/>
    </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
}

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired
    })).isRequired //arrayOf(React.PropTypes.object): so array would accept array of objects!  
  },
  getDefaultProps: function(){
    return {
      title: "Scoreboard",
    }
  },

  getInitialState: function(){
    return{
      players: this.props.initialPlayers,
    };
  },
  onScoreChange: function(index, delta){
    console.log("on ", index, delta)
    this.state.players[index].score += delta
    this.setState(this.state)
  },
  onPlayerAdd: function(name){
    console.log(name)
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId
    });
    this.setState(this.state);
    nextId += 1;
  },
  onRemovePlayer: function(index){
    console.log(index)
    this.state.players.splice(index, 1)
    this.setState(this.state)
  },
  render: function(){
    return (
      <div className="scoreboard"> 
        <Header title={this.props.title} players={this.state.players}/>
        <div className="players">
          {this.state.players.map(function(player, index){
            return (
              <Player 
                onScoreChange={function(delta) {this.onScoreChange(index,delta)}.bind(this)}
                onRemove = {function(){this.onRemovePlayer(index)}.bind(this)}
                name={player.name} 
                score={player.score} 
                key={player.id}/>
          );
          }.bind(this)
          )}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
  )
  }
})

// function Application(props){
//   return (
//     <div className="scoreboard"> 
//         <Header title={props.title}/>
//         <div className="players">
//           {props.players.map(function(player){
//             return <Player name={player.name} score={player.score} key={player.id}/>
//           })}
//         </div>
//     </div>
//   );
// }

// Application.propTypes = {
//   title: React.PropTypes.string,
//   players: React.PropTypes.arrayOf(React.PropTypes.shape({
//     name: React.PropTypes.string.isRequired,
//     score: React.PropTypes.number.isRequired,
//     id: React.PropTypes.number.isRequired
//   })).isRequired //arrayOf(React.PropTypes.object): so array would accept array of objects!
// };

// Application.defaultProps = {
//   title: "Scoreboard",
// }

function SomeApplication(){
  return (
    <div>
      <h1>Dreaming about ...</h1>
    </div>
  );
}


ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'))

// ReactDOM.render(<SomeApplication />, document.getElementById('dreaming'))