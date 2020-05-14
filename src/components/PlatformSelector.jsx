import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import { setSelectedPlatforms } from "../state/reducers/platforms";

export default () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms.platforms);
  const selected = useSelector((state) => state.platforms.selected);
  const handleChange = (event) => {
    dispatch(setSelectedPlatforms(event.target.value));
  };
  return (
    <FormControl fullWidth>
      <InputLabel>platforms</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={handleChange}
        input={<Input />}
      >
        {platforms.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
