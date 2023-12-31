import { useState, useEffect } from "react";
import "./style.css";
import PetList from "../../components/PetList";

const petURL = "/pet-listings/";

function Landing() {
  const [pets, setPets] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [breed, setBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [age, setAge] = useState("");
  const [ages, setAges] = useState([]);
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  function getAllUnique(lst) {
    let unique = [];
    for (let i in lst) {
      if (typeof lst[i] === 'string'){
        let type = lst[i].toLowerCase();
        if (!unique.includes(type)) {
          unique.push(type);
        }
      } else if (typeof lst[i] === 'number'){
        if (!unique.includes(lst[i])) {
          unique.push(lst[i]);
        }
      }
    }
    return unique;
  }

  useEffect(() => {
    async function fetchPets() {
      await fetch(petURL, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          setPets(json.results);
          setTotalPages(Math.ceil(json.count / 9));
          for (let i = 1; i <= Math.ceil(json.count / 9); i++) {
            fetch(petURL + "?page=" + i, {
              method: "GET",
            })
              .then((response) => response.json())
              .then((json) => {
                json.results.map((d) => setTypes(prev => [...prev, d.type]));
                json.results.map((d) => setBreeds(prev => [...prev, d.breed]));
                json.results.map((d) => setAges(prev => [...prev, d.age]));
                json.results.map((d) => setSizes(prev => [...prev, d.size]));
              });
          }
        });
    }
    fetchPets();
  }, []);

  function applyFilter() {
    let params = {};
    if (age !== "") {
      params["age"] = age;
    }
    if (type !== "") {
      params["type"] = type;
    }
    if (breed !== "") {
      params["breed"] = breed;
    }
    if (size !== "") {
      params["size"] = size;
    }
    fetch(petURL + "?" + new URLSearchParams(params), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setPets(json.results);
        setTotalPages(Math.ceil(json.count / 9));
      });
  }

  function applySearch() {
    let params = {};
    if (search !== "") {
      params["search"] = search;
    }
    if (age !== "") {
      params["age"] = age;
    }
    if (type !== "") {
      params["type"] = type;
    }
    if (breed !== "") {
      params["breed"] = breed;
    }
    if (size !== "") {
      params["size"] = size;
    }
    fetch(petURL + "?" + new URLSearchParams(params), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setPets(json.results);
        setTotalPages(Math.ceil(json.count / 9));
      });
  }

  useEffect(() => {
    let params = {};
    params["page"] = curPage;
    if (sort !== "") {
      params["sort"] = sort;
    }
    if (search !== "") {
      params["search"] = search;
    }
    if (age !== "") {
      params["age"] = age;
    }
    if (type !== "") {
      params["type"] = type;
    }
    if (breed !== "") {
      params["breed"] = breed;
    }
    if (size !== "") {
      params["size"] = size;
    }
    fetch(petURL + "?" + new URLSearchParams(params), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setPets(json.results);
      });
  }, [curPage, sort]);

  return (
    <div>
      <div className="container-fluid search-container d-flex justify-content-center p-5">
        <input
          className="search-bar p-2"
          placeholder="Search by keyword: name, description, etc..."
          onChange={(event) => setSearch(event.target.value)}
        />
        <button
          className="search-but p-2"
          onClick={() => applySearch()}
        >
          Search
        </button>
      </div>
      <div className="row container-fluid ps-4">
        <div className="col-sm-2 p-5 pb-0 pt-4">
          <h1 className="filter-h1">Filter</h1>
          <label className="filter-labels">Type</label>
          <select
            className="filter-select form-select"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="">Select type</option>
            {getAllUnique(types).map((type, i) => (
              <option value={type} key={i}>
                {type}
              </option>
            ))}
          </select>

          <label className="filter-labels">Breed</label>
          <select
            className="form-select"
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
          >
            <option value="">Select breed</option>
            {getAllUnique(breeds).map((breed, i) => (
              <option value={breed} key={i}>
                {breed}
              </option>
            ))}
          </select>

          <label className="filter-labels">Age</label>
          <select
            className="form-select"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          >
            <option value="">Select age</option>
            {getAllUnique(ages).map((age, i) => (
              <option value={age} key={i}>
                {age}
              </option>
            ))}
          </select>

          <label className="filter-labels">Size</label>
          <select
            className="form-select"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="">Select size</option>
            {getAllUnique(sizes).map((size, i) => (
              <option value={size} key={i}>
                {size}
              </option>
            ))}
          </select>
          <button
            className="search-but p-2 mt-2"
            onClick={() => applyFilter()}
          >
            Filter
          </button>
        </div>
        <div className="col-sm-10 p-5 pb-0 pt-4 pe-5">
          <div className="row">
            <PetList pets={pets} shelter={false}/>
            <div className="col-2 ps-0">
              <label className="sort-h1 pe-2">Sort: </label>
              <select
                className="sort-select"
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="">select sort by</option>
                <option value="age">age ascending</option>
                <option value="publication_date">date ascending</option>
              </select>
            </div>
          </div>{" "}
        </div>
        <p className="text-center">
          {curPage > 1 ? (
            <button
              className="page-but"
              onClick={() => setCurPage(curPage - 1)}
            >
              Previous
            </button>
          ) : (
            <></>
          )}
          {curPage < totalPages ? (
            <button
              className="page-but"
              onClick={() => setCurPage(curPage + 1)}
            >
              Next
            </button>
          ) : (
            <></>
          )}
        </p>
        <p className="text-center">
          Page {curPage} out of {totalPages}
        </p>
      </div>
    </div>
  );
}

export default Landing;
