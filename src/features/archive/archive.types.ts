import { type DataRow } from "./Data";

export interface ArchiveGroupDisplayProps {
  groups: {
    name: string;
    entries: DataRow[];
  }[];
  groupLinkUrl?: string;
}

export type ArchiveGroupRowsProps = {
  group: { name: string; entries: DataRow[] };
  groupLinkUrl: string | undefined;
  showTitle: boolean;
};
