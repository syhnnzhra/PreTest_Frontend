// TextInput.tsx
import React, { ReactElement, ChangeEvent } from "react";

interface TextInputProps {
    label: string;
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    required: boolean;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    id,
    name,
    type,
    autoComplete,
    required,
    placeholder,
    value,
    onChange,
}: TextInputProps): ReactElement => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
            </div>
        </div>
    );
};

export default TextInput;
