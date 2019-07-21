import React, { useState } from "react";

// COMPONENTS
import List from "./List";
import Add from "./Add";

function Pengguna() {
  const [visibleAdd, setVisibleAdd] = useState(false);
  // const [visibleEdit, setVisibleEdit] = useState(false);

  const handleVisibleAdd = bool => {
    setVisibleAdd(bool);
  };

  return (
    <div>
      <Add visible={visibleAdd} handleVisibleAdd={handleVisibleAdd} />
      <List handleVisibleAdd={handleVisibleAdd} />
    </div>
  );
}

export default Pengguna;
