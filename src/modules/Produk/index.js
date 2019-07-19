import React, { useState, useEffect } from "react";

// COMPONENTS
import List from "./List";
import Add from "./Add";

function Pengguna() {
  const [visibleAdd, setVisibleAdd] = useState(true);
  // const [visibleEdit, setVisibleEdit] = useState(false);

  return (
    <div>
      <Add visible={visibleAdd} />
      <List />
    </div>
  );
}

export default Pengguna;
