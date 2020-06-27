export type Schema = {
  tables: Array<Table>;
};

export type Table = {
  name: string;
  columns: Array<Column>;
};

export type Column = {
  name: string;
  type: 'INTEGER' | 'STRING';
};

// TODO: Database Type
