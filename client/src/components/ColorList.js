import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log("colors",colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
// console.log("CTE",colorToEdit)
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit )
    .then(res => {
      // console.log("put res",res)
      const newColors = colors.map(color =>{
        if(colorToEdit.id === color.id){
          // console.log("colorToEdit.id", colorToEdit.id)
          // console.log("color.id", color.id)
          return res.data
        }else{
          return color
        }
        
      })
      // console.log("newColors",newColors)
      updateColors(newColors)
      // console.log("put res",res)
    })
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => {
      console.log("delete res",res)
      const newDeleted = colors.filter(color =>
        res.data !== color.id)
           
        
    
    console.log("newDeleted",newDeleted)
    updateColors(newDeleted)
    
  });
  }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
