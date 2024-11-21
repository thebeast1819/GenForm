import React, { useState } from "react";
import Layout from "./components/Layout";
import JSONEditor from "./components/JSONEditor";
import FormPreview from "./components/FormPreview";

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<string>("");

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 p-4 border-r">
          <JSONEditor value={jsonSchema} onChange={setJsonSchema} />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <FormPreview jsonSchema={jsonSchema} />
        </div>
      </div>
    </Layout>
  );
};

export default App;
