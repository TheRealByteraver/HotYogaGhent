const MessageModal = (props: any) => {
  return (
    <div className="absolute z-10 w-full h-full bg-gray-900 bg-opacity-70 flex flex-col flex-nowrap justify-center items-center">
      <div className="border border-white rounded w-4/5 bg-emerald-900 bg-opacity-80 shadow shadow-emerald-900 text-white p-4">
        <h2 className="text-3xl mt-2 mb-4 text-center">Thank you!</h2>
        <p className="my-8 text-center leading-7">{props.message}</p>
        <button
          className="block mx-auto mt-3 mb-2 px-8 py-2 border-2 rounded border-white bg-teal-600"
          onClick={() => {
            props.close();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MessageModal;