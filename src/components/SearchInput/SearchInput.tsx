"use client";

import { useMainStore } from "@src/stores/mainStoreProvider";
import React from "react";
import "./style.css";

const SearchInput = React.forwardRef<HTMLDivElement>(() => {
  const { searchInput, setSearchInput } = useMainStore((s) => s);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="SearchInput">
      <input value={searchInput} onChange={handleChange} placeholder="GitHub 유저 검색" />
    </div>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
