import * as React from "react";

import { BlockModuleComponentProps, IBlock } from "../../types/types";

import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";
import { BlockContextProvider } from "../../providers/BlockContext";
import produce from "immer";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type MultiColumnsData = ColumnData[];

type ColumnData = IBlock[];

export type MultiColumnsComponentProps = {
  data: MultiColumnsData;
};

const NestedColumn = ({ onUpdate }: { onUpdate: Function }) => {
  const { blockList } = useBlocksContext();

  React.useEffect(() => {
    onUpdate(blockList);
  }, [blockList]);

  return (
    <div>
      {blockList.map((component) => {
        return (
          <Block
            inLayout={true}
            key={component.id}
            className="border-l-8 border-l-red-400"
            block={component}
          />
        );
      })}
    </div>
  );
};

const ColumnIcon = ({
  cols,
  currentCol,
}: {
  cols: number;
  currentCol: number;
}) => {
  return (
    <div className="h-3 rounded-full flex overflow-hidden border bg-white border-white mr-3">
      {[...Array(cols)].map((_, index) => (
        <div
          key={index}
          className={`w-6 
            ${index !== cols - 1 && "mr-px"} 
            ${currentCol === index ? "bg-white" : "bg-slate-900"}`}
        ></div>
      ))}
    </div>
  );
};

const ColumnComponent = ({
  column,
  index,
  data,
  onUpdate,
}: BlockModuleComponentProps<MultiColumnsData>) => {
  const [open, setOpen] = React.useState(true);

  return (
    <div
      key={index}
      className="flex flex-col rounded-md shadow-md border-l-8 border-l-red-600 bg-white"
    >
      <div className="py-4 px-8 bg-slate-900 text-white rounded-tr-md flex justify-between items-center">
        <div className="flex items-center">
          <ColumnIcon cols={data.length} currentCol={index} />
          <span className="text-xl font-bold">{`Colonne #${index + 1}`}</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 flex">
          <div className="bg-red-500 px-2 rounded-l-sm">
            {open ? (
              <FontAwesomeIcon icon={faChevronDown} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} />
            )}
          </div>
          <div className="bg-red-600 px-2 rounded-r-sm">
            {open ? "Replier" : "Déplier"}
          </div>
        </button>
      </div>
      <div className={`py-8 px-11 ${!open ? "hidden" : null}`}>
        <BlockContextProvider defaultBlocks={column}>
          <>
            <NestedColumn
              onUpdate={(columnNewData: IBlock[]) => {
                const nextState = produce(data, (draft) => {
                  draft[index] = columnNewData;
                });
                onUpdate(nextState);
              }}
            />
            <div className="border-dotted rounded-md border border-slate-600 py-6 flex flex-col">
              <span className="text-center mb-4">
                Glissez-déposez le type de contenu souhaité depuis le menu de
                droite
              </span>
              <AddBlocks excludeLayout={["Column"]} />
            </div>
          </>
        </BlockContextProvider>
      </div>
    </div>
  );
};

const MultiColumnsComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<MultiColumnsData>) => {
  return (
    <div className="flex flex-col gap-5 justify-between">
      {data.map((column, index) => {
        return (
          <ColumnComponent
            key={index}
            data={data}
            onUpdate={onUpdate}
            column={column}
            index={index}
          />
        );
      })}
    </div>
  );
};

const moduleLayout = "Column";

const moduleType = {
  id: "multiColumns",
};

const Column = {
  type: moduleType,
  component: MultiColumnsComponent,
  initialData: [[]],
  layout: moduleLayout,
  title: {
    default: "Columns",
    fr_FR: "Colonnes",
  },
  description: {
    default: "Display blocks in multiple columns",
    fr_FR: "Affiche des blocks dans différentes colonnes",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&multiColumns",
  },
};

const TwoColumns = {
  ...Column,
  component: MultiColumnsComponent,
  type: { id: "2cols" },
  title: {
    default: "2 Columns",
    fr_FR: "2 Colonnes",
  },
  layout: "Column",
  initialData: [[], []],
};

const ThreeColumns = {
  ...Column,
  component: MultiColumnsComponent,
  type: { id: "3cols" },
  layout: moduleLayout,
  title: {
    default: "3 Columns",
    fr_FR: "3 Colonnes",
  },
  initialData: [[], [], []],
};

const FourColumns = {
  ...Column,
  component: MultiColumnsComponent,
  type: { id: "4cols" },
  layout: moduleLayout,
  title: {
    default: "4 Columns",
    fr_FR: "4 Colonnes",
  },

  initialData: [[], [], [], []],
};

const FiveColumns = {
  ...Column,
  component: MultiColumnsComponent,
  type: { id: "5cols" },
  layout: moduleLayout,
  title: {
    default: "5 Columns",
    fr_FR: "5 Colonnes",
  },

  initialData: [[], [], [], [], []],
};

const SixColumns = {
  ...Column,
  component: MultiColumnsComponent,
  type: { id: "6cols" },
  layout: moduleLayout,
  title: {
    default: "6 Columns",
    fr_FR: "6 Colonnes",
  },

  initialData: [[], [], [], [], [], []],
};

export { TwoColumns, ThreeColumns, FourColumns, FiveColumns, SixColumns };
