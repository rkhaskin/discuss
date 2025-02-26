import { pool } from "@/db/mariadb";

export default async function TopicList() {
  const query = "select name, description, created_on, updated_on from topic";
  const topics = await pool.query<>(query);

  const renderedTopics = topics.return();
}
