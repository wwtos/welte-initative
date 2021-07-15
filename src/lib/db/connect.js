import neo4j from 'neo4j-driver';

const driver = new neo4j.driver(process.env.DB_URI, neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD));

export function getSession() {
    return driver.session();
}
