export type Notebook = {
  cells: Array<NotebookCell>;
  metadata?: Record<string, unknown>;
};

export type NotebookCell = {
  cell_type: string;
  source: string[];
  outputs: NotebookCellOutput[];
  metadata?: Record<string, unknown>;
  execution_count?: number;
};

export type NotebookCellOutput = {
  output_type: string;
  data?: Record<string, object | string[]>;
  text?: string;
  html?: string;
  metadata?: Record<string, unknown>;
  execution_count?: number;
};
