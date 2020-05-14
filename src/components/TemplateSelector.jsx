import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { setSelectedTemplate } from "../state/reducers/templates";

export default () => {
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.templates.templates);
  const selected = useSelector((state) => state.templates.selected);
  const handleChange = (event) => {
    dispatch(setSelectedTemplate(event.target.value));
  };
  return (
    <FormControl fullWidth>
      <InputLabel>template</InputLabel>
      <Select value={selected} onChange={handleChange} input={<Input />}>
        {templates.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
