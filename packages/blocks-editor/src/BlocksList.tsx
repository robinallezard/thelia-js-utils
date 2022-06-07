import {
  BlocksProvider,
  useDeleteGroup,
  useDuplicateGroup,
  useGroups,
} from "./utils/queries";
import toast, { Toaster } from "react-hot-toast";

import { Suspense } from "react";
import useCopyToClipboard from "react-use/esm/useCopyToClipboard";

function List() {
  const { data: groups = [] } = useGroups();
  const [copied, copyToClipboard] = useCopyToClipboard();
  const mutationDelete = useDeleteGroup();
  const mutationDuplicate = useDuplicateGroup();

  if (groups.length <= 0) {
    return <div>No blocks to display</div>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Contenus liés</th>
          <th>Langues disponibles</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group: any) => {
          return (
            <tr>
              <td>{group.id}</td>
              <td>
                <a href={`/admin/TheliaBlocks/${group.id}`}>
                  {group.title || "No Title"}
                </a>
              </td>
              <td>TODO</td>
              <td>TODO</td>
              <td>
                <div>
                  <button
                    onClick={() => {
                      mutationDelete.mutate(group.id);
                    }}
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      mutationDuplicate.mutate(group.id);
                    }}
                  >
                    duplicate
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const shortcode = `[block_group slug=${group.slug}]`;
                      copyToClipboard(shortcode);
                      toast(`${shortcode} copié avec succès`);
                    }}
                  >
                    shortcode
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function BlocksList({ apiUrl }: { apiUrl: string }) {
  if (!apiUrl) return null;

  return (
    <BlocksProvider api={apiUrl}>
      <div className="BlocksList">
        <div>
          <Toaster />
        </div>

        <div className="mb-8">
          <a href="/admin/TheliaBlocks/new" className="btn btn-danger ">
            Create new group
          </a>
        </div>
        <Suspense fallback="loading">
          <List />
        </Suspense>
      </div>
    </BlocksProvider>
  );
}
