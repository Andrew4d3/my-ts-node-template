import fs from 'fs';
import path from 'path';

const queries = fs.readFileSync(path.join(__dirname, 'Queries.graphql'), 'utf8');

export default [queries];
