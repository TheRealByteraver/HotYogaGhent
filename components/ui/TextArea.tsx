import { forwardRef } from "react";

const TextArea = forwardRef(function TextArea(props: any, ref) {
  return (
    <div>
      <label className="text-white text-sm font-medium inline-block mt-4 mb-1">
        {props.label}
      </label>
      {props.error && (
        <p className="float-right text-[#ed3548] text-sm font-bold inline-block mt-4">
          {props.error.message}
        </p>
      )}

      <textarea
        className={`border outline-none bg-emerald-800 w-full my-2 mt-0 rounded p-2 hover:cursor-pointer
                    ${
                      props.error
                        ? "border-[#ed3548]"
                        : "blur:border-none focus:border-4 focus:border-green-600"
                    } 
            `}
        ref={ref}
        {...props}
      >
        {props.children}
      </textarea>
    </div>
  );
});

export default TextArea;