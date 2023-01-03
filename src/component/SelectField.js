import React, { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import Label from "./dropdown/Label";
function SelectField({ value, optionValues, label, selectedValue, disable }) {
    const [dropDownVisibility, setDropDownVisibility] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const handleDropDownVisibility = () => {
        setDropDownVisibility(!dropDownVisibility);
    };

    const handleClick = (val) => {
        setSearchValue("");
        handleDropDownVisibility();
        selectedValue(val);
    };
    let ref = useRef(null);
    useClickOutside({ ref, setDropDownVisibility });
    return (
        <div className="select-field">
            <Label>{label} :</Label>
            <input
                onClick={handleDropDownVisibility}
                type="search"
                readOnly
                value={value}
                placeholder={"Select " + label}
                disabled={disable}
            />

            <br />
            <span className="select-field-content">
                {dropDownVisibility && (
                    <div className="dropdown-body" ref={ref}>
                        <input
                            type="text"
                            placeholder="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <div className="dropdown-content">
                            {optionValues
                                .filter((optionValue) =>
                                    optionValue
                                        .toLowerCase()
                                        .includes(searchValue?.toLowerCase())
                                )
                                .map((val) => {
                                    if (value == val) {
                                        return (
                                            <li
                                                key={val}
                                                className="dropDown-option bg-active"
                                                onClick={() => {
                                                    setSearchValue("");
                                                    handleDropDownVisibility();
                                                }}
                                            >
                                                {val}
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li
                                                key={val}
                                                className="dropDown-option bg-grey"
                                                onClick={() => handleClick(val)}
                                            >
                                                {val}
                                            </li>
                                        );
                                    }
                                })}
                        </div>
                    </div>
                )}
            </span>
        </div>
    );
}

export default SelectField;
