import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Ajv from "ajv";

interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[]; 
  validation?: { pattern?: string; message?: string };
}

interface JSONSchema {
  formTitle?: string;
  formDescription?: string;
  fields: FormField[];
}

const FormPreview: React.FC<{ jsonSchema: string }> = ({ jsonSchema }) => {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const ajv = new Ajv();

  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  let parsedSchema: JSONSchema | null = null;

  try {
    parsedSchema = JSON.parse(jsonSchema);
    ajv.validate({ type: "object" }, parsedSchema); 
  } catch (e) {
    return <p className="text-red-500">Invalid JSON</p>;
  }

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log(data);
    setSubmittedData(data);
    alert("Form submitted successfully!");
  };

  const handleDownload = () => {
    if (submittedData) {
      const jsonBlob = new Blob([JSON.stringify(submittedData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(jsonBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "form_submission.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      ...register(field.id, {
        required: field.required,
        pattern: field.validation?.pattern
          ? {
              value: new RegExp(field.validation.pattern as string),
              message: field.validation.message || "Invalid input",
            }
          : undefined,
      }),
      className: "w-full px-3 py-2 border rounded-md text-black",
    };

    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            {...commonProps}
          />
        );
      case "textarea":
        return (
          <textarea
            id={field.id}
            placeholder={field.placeholder}
            {...commonProps}
            rows={4}
          />
        );
      case "select":
        return (
          <select id={field.id} {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div>
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={option.value}
                  type="radio"
                  value={option.value}
                  {...commonProps}
                  className="mr-2"
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              id={field.id}
              type="checkbox"
              {...register(field.id, { required: field.required })}
              className="mr-2"
            />
            <label htmlFor={field.id}>{field.label}</label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {parsedSchema?.formTitle && <h1 className="text-2xl font-bold">{parsedSchema.formTitle}</h1>}
      {parsedSchema?.formDescription && <p>{parsedSchema.formDescription}</p>}

      {parsedSchema?.fields?.map((field) => (
        <div key={field.id} className="space-y-2">
          <label htmlFor={field.id} className="block text-sm font-medium">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderField(field)}

          {errors[field.id] && (
            <p className="text-red-500 text-sm">
              {errors[field.id]?.message?.toString() || "This field is required"}
            </p>
          )}
        </div>
      ))}

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Submit
      </button>

      {submittedData && (
        <button
          type="button"
          onClick={handleDownload}
          className="px-4 py-2 mt-4 mx-4 bg-green-600 text-white rounded-md"
        >
          Download Submission as JSON
        </button>
      )}
    </form>
  );
};

export default FormPreview;
