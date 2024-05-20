import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const pgVersion = await database.query("SHOW server_version;");
  const pgVersionValue = pgVersion.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;

  const dbUser = process.env.POSTGRES_DB;
  const activeConnectionsResult = await database.query({
    text: "SELECT count(*)::int from pg_stat_activity WHERE datname = $1",
    values: [dbUser],
  });
  const activeConnectionsValue = activeConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: pgVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        open_connections: activeConnectionsValue,
      },
    },
  });
}

export default status;
