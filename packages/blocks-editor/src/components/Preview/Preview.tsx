import { useEffect } from "react";

import Iframe from "../Iframe/Iframe";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePreviewGroup } from "../../utils/queries";
import { ReactComponent as LogoutIcon } from "../../../assets/svg/logout.svg";

import "./Preview.css";
import Modal from "../Modal";
import { useIntl } from "react-intl";

export default function Preview({
  isOpen,
  setIsOpen,
  setIsPreviewLoading,
  timestamp,
  data,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  setIsPreviewLoading: Function;
  timestamp: number;
  data?: string;
}) {
  const { blockList } = useBlocksContext();
  const preview = usePreviewGroup(timestamp, JSON.stringify(data || blockList));
  const intl = useIntl();

  useEffect(() => {
    if (preview.isLoading) {
      setIsPreviewLoading(true);
      return;
    }

    setIsPreviewLoading(false);
  }, [preview]);

  useEffect(() => {
    if (timestamp) {
      setIsOpen(true);
    }

    return () => setIsOpen(false);
  }, [timestamp]);

  return (
    <>
      {!preview.isLoading ? (
        <Modal
          modalClassName={"Modal-preview"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={intl.formatMessage({ id: "PreviewModal__TITLE" })}
        >
          {preview.data ? <Iframe content={preview.data} height='100%' /> : null}
          <div className="Modal__Footer ">
          <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="Modal__EscapeBtnFooter"
            >
              {intl.formatMessage({ id: "BACK" })}<LogoutIcon className="w-4 h-4 text-white"/>
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
