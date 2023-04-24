import { forwardRef } from "react";

const Input = forwardRef(function Input(props: any, ref) {
  return (
    <>
      <label className='text-[#02295a] text-sm font-medium inline-block mt-4 mb-1'>{props.label}</label>
      { props.error && 
        <p className='float-right text-[#ed3548] text-sm font-bold inline-block mt-4'>
          {props.error.message}
        </p>
      }
      
      <input 
        className={`border outline-none w-full h-10 my-2 mt-0 rounded p-2 hover:cursor-pointer
                    ${props.error ? 'border-[#ed3548]' : 'blur:border-[#9699ab] focus:border-[#473dff]'} 
            `}
        ref={ref} 
        {...props}>
        {props.children}
      </input>
    </>
  );
});

export default Input;