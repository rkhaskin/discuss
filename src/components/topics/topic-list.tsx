import Link from "next/link";
import paths from "@/paths";
import { Chip } from "@heroui/react";
import { getTopics } from "@/services/topics-service";

export default async function TopicList() {
  const topics = await getTopics();

  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.name)}>
          <Chip color="warning" variant="shadow">
            {topic.name}
          </Chip>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>;
}
