import "./index.css";

import AddBlocks from "./components/AddBlocks";
import { BlockContextProvider } from "./providers/BlockContext";
import BlocksContent from "./components/BlocksContent/BlocksContent";
import { BlocksEditorProvider } from "./utils/queries";
import "tippy.js/dist/tippy.css";

export function BlocksEditor({ apiUrl }: { apiUrl: string }) {
  if (!apiUrl) return null;

  return (
    <BlocksEditorProvider api={apiUrl}>
      {/* <ListBlockGroups />
      <hr /> */}
      <div className="BlocksEditor">
        <div className="BlocksEditor-header">
          <div className="BlocksEditor-title">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="BlocksEditor-langSelector">
            <div>
              <input type="radio" name="locale" id="locale-fr" />
              <label htmlFor="locale-fr">fr</label>
            </div>
            <div>
              <input type="radio" name="locale" id="locale-en" />
              <label htmlFor="locale-en">en</label>
            </div>
          </div>
        </div>
        <BlockContextProvider>
          <>
            <div className="BlocksEditor-content">
              <AddBlocks />
            </div>

            <BlocksContent />
          </>
        </BlockContextProvider>
      </div>
    </BlocksEditorProvider>
  );
}
