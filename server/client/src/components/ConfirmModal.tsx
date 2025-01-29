import { createPortal } from "react-dom";

type confirmModalProps = {
  modalId: string;
  message: string;
  fn: () => void;
};

export const ConfirmModal = ({ message, fn, modalId }: confirmModalProps) => {
  return createPortal(
    <dialog id={modalId} className="modal">
      <div className="modal-box  flex flex-col    max-w-sm p-0">
        <div className="bg-error flex  items-center justify-center w-full h-16 rounded-t-lg gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>

          <h3 className=" text-xl  font-bold">Are you sure ?</h3>
        </div>
        <p className="  flex my-5 text-sm mx-5 text-center ">{message}</p>

        <div className="flex items-center justify-end gap-2 m-2 pb-2 px-2">
          <form method="dialog">
            <button className="btn  btn-ghost btn-sm   ">Cancel</button>
          </form>
          <button onClick={() => fn()} type="submit" className="btn btn-sm">
            confirm
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.body
  );
};
