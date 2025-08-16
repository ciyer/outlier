import { type DataRow } from "./Data";

export interface ArchiveGroupDisplayProps {
  groups: {
    name: string;
    entries: DataRow[];
  }[];
  groupLinkUrl?: string;
  showDetails?: boolean;
}

export type ArchiveGroupRowsProps = {
  group: { name: string; entries: DataRow[] };
  groupLinkUrl: string | undefined;
  showDetails: boolean;
  showTitle: boolean;
};
