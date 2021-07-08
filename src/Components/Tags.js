import { useEffect, useState } from "react";

const Tags = ({ ID, buttonValue, placeholder, setTagList }) => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const addItem = (textValue) => {
    if (textValue !== "") {
      const newItem = {
        id: Date.now(),
        value: textValue,
      };
      const updatedItems = [...items];
      updatedItems.push(newItem);
      setItems(updatedItems);
      setText("");
    }
  };

  const removeItem = (id) => {
    const list = [...items];
    const updatedItems = list.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    setTagList(items);
  });

  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/**********Tag input starts here**********/}

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={placeholder}
                  id={ID}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    addItem(text);
                  }}
                >
                  {buttonValue}
                </button>
              </div>

              {/**********Tag input ends here**********/}

              {/**********List of all tags starts here**********/}

              <div className="">
                <ul className="list-group">
                  {items.map((item) => (
                    <li
                      className="list-group-item tags"
                      key={item.id}
                      style={{
                        backgroundColor:
                          ID === "scholarId" ? "#a7c957" : "#ff7aa2",
                      }}
                    >
                      <label htmlFor={item.id}>{item.value}</label>
                      <button
                        className="btn btn-outline-secondary"
                        style={{
                          float: "right",
                          fontSize: "0.6rem",
                        }}
                        type="button"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/**********List of all tags ends here**********/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
