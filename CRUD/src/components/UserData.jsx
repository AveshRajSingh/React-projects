import React, { useEffect, useRef, useState } from "react";
import "./UserData.css";

const UserData = () => {
  const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
  const [allData, setAllData] = useState([]);
  const [editId, setEditId] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const outsideClick = useRef(false);
  const itemsPerPage = 5;
  const lastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = lastItem - itemsPerPage;
  let filteredItems = allData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredData = filteredItems.slice(indexOfFirstItem, lastItem);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (!editId) return;

    let selectedItem = document.querySelectorAll(`[id ='${editId}']`);
    selectedItem[0].focus();
  }, [editId]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (outsideClick.current && !outsideClick.current.contains(e.target)) {
        setEditId(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleEditClick = (id, updatedList) => {
    if (!editId || editId !== id) return;
    const updatedVal = allData.map((item) =>
      item.id == id ? { ...item, ...updatedList } : item
    );
    setAllData(updatedVal);
  };

  const handleDeleteClick = (id) => {
    if (filteredData.length === 1 && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
    let updatedData = allData.filter((item) => item.id !== id);
    setAllData(updatedData);
    console.log(updatedData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddClick = () => {
    if (formData.name === "" || formData.gender === "" || formData.age === "")
      return;
    let newItem = {
      name: formData.name,
      id: Date.now(),
      gender: formData.gender,
      age: formData.age,
    };
    setAllData([...allData, newItem]);
    setFormData({ name: "", gender: "", age: "" });
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container">
      <div className="user-info-container">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <button onClick={handleAddClick}>Add</button>
      </div>

      <div className="search-result-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchInput}
          />
        </div>
        <table ref={outsideClick}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr className="body-table" key={item.id}>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEditClick(item.id, { name: e.target.innerText })
                  }
                >
                  {item.name}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEditClick(item.id, { gender: e.target.innerText })
                  }
                >
                  {item.gender}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEditClick(item.id, { age: e.target.innerText })
                  }
                >
                  {item.age}
                </td>
                <td>
                  <button className="Edit" onClick={() => setEditId(item.id)}>
                    EDIT
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pageination">
          {Array.from(
            { length: Math.ceil(filteredItems.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                style={{
                  backgroundColor: currentPage === index + 1 && "lightgreen",
                }}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserData;
