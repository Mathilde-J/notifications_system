import React from "react";
interface TextFieldInputProps {
  placeholder: string;
  inputType: "search" | "text";
}

const ComponentName: React.FC<TextFieldInputProps> = ({ placeholder }) => {
  console.log("🚀 ~ ComponentName ~ placeholder:", placeholder)
  return (
    <label>
      <input type="text" name="" id="" />
    </label>
  );
};

export default ComponentName;
