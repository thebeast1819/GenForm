import React from "react";
import Editor from "@monaco-editor/react";

interface JSONEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ value, onChange }) => {
  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue) onChange(newValue);
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="json"
      value={value}
      onChange={handleEditorChange}
      options={{
        minimap: { enabled: false },
        scrollbar: { verticalScrollbarSize: 5 },
        theme: "vs-dark",
      }}
    />
  );
};

export default JSONEditor;
