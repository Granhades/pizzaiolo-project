
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {

  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState ({name : "", description : "", price : ""});
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({name : "", description : "", price : ""});

  //Fetch dishes
  const fetchDishes = () => {
    axios.get("http://localhost:8080/api/menu")
      .then(res => setDishes(res.data))
      .catch(err => console.error("Error fetching menu ," + err));
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  //Delete dish

  const deleteDish = (id) => {
    axios.delete(`http://localhost:8080/api/menu/${id}`)
    .then(() => {
      setDishes(prev => prev.filter(d => d.id !== id));
      alert("Dish deleted!");
    })
    .catch(err => alert("Error deleting dish "));
  }

  //Add new dish

  const addDish = (id) => {
    const dish = {
      ...newDish,
      price : parseFloat(newDish.price)
    }
    axios.post("http://localhost:8080/api/menu", dish)
    .then(res => {
      setDishes([...dishes, res.data]);
      setNewDish({name : "", description : "", price : ""});
      alert("Dish added !");
    })
    .catch(err => alert("Error adding dish"));
  }

  const restartMenu = () => {
    axios.post("http://localhost:8080/api/seed")
    .then(res => {
      alert(res.data) //Display how many dishes
      fetchDishes(); //Refresh
    })
    .catch(err => alert("Error seeding " + err.message));
  }

  const startEdit = (dish) => {
    setEditingId(dish.id);
    setEditData({ name: dish.name, description: dish.description, price: dish.price });
  };

 const saveEdit = (id) => {
  axios.put(`http://localhost:8080/api/menu/${id}`, {
    ...editData,
    price: parseFloat(editData.price)
  })
  .then(res => {
    setDishes(prev =>
      prev.map(d => (d.id === id ? res.data : d))
    );
    setEditingId(null);
    alert("Dish updated!");
  })
  .catch(err => alert("Error updating dish"));
};
  
 return (
    <div style={{ padding: "20px" }}>
      <h1>Admin - Manage Dishes</h1>
      <button onClick={() => restartMenu()}>Restart Menu</button>
      <h2>Dish List</h2>
      <ul>
  {dishes.map(dish => (
    <li key={dish.id} style={{ marginBottom: "10px" }}>
      {editingId === dish.id ? (
        <>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          /><br />
          <input
            type="text"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          /><br />
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
          /><br />
          <button onClick={() => saveEdit(dish.id)}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </>
      ) : (
        <>
          <strong>{dish.name}</strong> – €{dish.price.toFixed(2)}<br />
          {dish.description}<br />
          <button onClick={() => startEdit(dish)}>Edit</button>
          <button onClick={() => deleteDish(dish.id)}>Delete</button>
        </>
      )}
    </li>
  ))}
</ul>

      <h2>Add New Dish</h2>
      <input
        type="text"
        placeholder="Name"
        value={newDish.name}
        onChange={e => setNewDish({ ...newDish, name: e.target.value })}
      /><br />
      <input
        type="text"
        placeholder="Description"
        value={newDish.description}
        onChange={e => setNewDish({ ...newDish, description: e.target.value })}
      /><br />
      <input
        type="number"
        placeholder="Price"
        value={newDish.price}
        onChange={e => setNewDish({ ...newDish, price: e.target.value })}
      /><br />
      <button onClick={addDish}>Add Dish</button>
    </div>
  );

}

export default AdminPage;
