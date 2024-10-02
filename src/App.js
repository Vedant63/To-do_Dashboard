import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import DisplayDropdown from './DisplayDropdown'; // Import the DisplayDropdown component
import './App.css';
import Header from './components/Header';


function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status"); // Initially null
  const [sorting, setSorting] = useState("priority"); // Initially null

  const getData = async () => {
    
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment ");
        const data = await response.json();
        console.log(data);
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    
  };
  useEffect(() => {
    getData();
  }, [grouping, sorting]); // Dependency array includes grouping and sorting

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping); // Update grouping state
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting); // Update sorting state
  };

  return (
    <div className="App">
      <Header
       grouping={grouping}
        sorting={sorting}
        onGroupingChange={handleGroupingChange}
        onSortingChange={handleSortingChange}
       />
      {grouping && sorting && (
        <KanbanBoard tickets={tickets} users={users} grouping={grouping} sorting={sorting} />
      )}
    </div>
  );
}

export default App;
