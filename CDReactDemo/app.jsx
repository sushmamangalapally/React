const List = (props) => {
  const listItems = props.items.map((itemString) => {
  return <li key={itemString}>{itemString} <button onclick="alert({itemString});">+</button></li>
  });
  return (
  <ul>
  {listItems}
  
  </ul>
  )
  }
  ReactDOM.render(
  <List items= { ['React', 'Vue', 'Angular', 'Ember'] } />,
  document.getElementById('content')
  );

  function vote(some){
    alert(some);
  }
  
  