import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { DocService } from "../../services";
import toast from "react-hot-toast";

export const CertifyModal = ({ showModal, setShowModal, children, docID }) => {
  const handleReject = () => {
    DocService.rejectDoc(docID).then(() => {
      toast.success("Document rejected successfully.", { duration: 3000 });
      setShowModal(false);
    });
  };

  const handleCertify = () => {
    DocService.certifyDoc(docID).then(() => {
      toast.success("Document certified successfully.", { duration: 3000 });
      setShowModal(false);
    });
  };

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              {/* Modal content */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <section className="flex justify-between items-center px-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Certify Document
                    </Dialog.Title>
                    <button
                      className="bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </section>
                  {/* Modal body */}
                  <div className="relative p-6 flex-auto">{children}</div>
                  {/* Modal footer */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={handleReject}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={handleCertify}
                    >
                      Certify
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

CertifyModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  children: PropTypes.node,
  docID: PropTypes.string,
};
