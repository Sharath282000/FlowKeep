import Link from "next/link";
import { Project } from "@/lib/type";
import CircularProgress from "../client/CircularProgress";
import EditProject from "../client/EditProject";
import DeleteProject from "../client/DeleteProject";
import AddTask from "../client/AddTask";
import { Badge } from "../ui/badge";
import { capitalizefirstletter, capitalizeWords } from "../../lib/utils/functions";
import { Button } from "../ui/button";

const ProjectDetails = ({
  project,
  userId,
  progress,
}: {
  project: Project;
  userId: string | undefined;
  progress: number;
}) => {

  return (
    <div>
      <div className="m-5 flex justify-center">
        <div className="w-full xl:max-w-7xl p-5 shadow-sm rounded-md">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between">
            <div className="flex-1">
              <h1 className="text-xl text-center md:text-left md:text-2xl leading-relaxed">
                {capitalizeWords(project.title)}
              </h1>

              <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_auto] md:items-center md:gap-4">
                <p className="w-full max-w-[600px] wrap-break-word whitespace-pre-wrap overflow-auto text-gray-600 leading-relaxed my-2 text-center md:text-left text-sm">
                  {capitalizefirstletter(project.description)}
                </p>
                <div className="self-center md:self-center">
                  <CircularProgress value={Math.round(progress)} />
                </div>
                <div className="flex items-center justify-center">
                  <Badge className="text-muted-foreground text-center bg-secondary shadow-sm rounded text-xs">
                    Created at:{" "}
                    {new Date(project.createdAt).toLocaleString('en-US', {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start mt-3 md:mt-0">
                <div className="flex items-center gap-1 md:gap-2 justify-between">
                  <EditProject project={project} />
                  <DeleteProject project={project} userId={userId} />
                </div>
              </div>
            </div>
            <div className="mt-4 xl:mt-0 flex items-center justify-center md:items-end md:justify-end">
              <Link
                className="p-2 text-xs md:text-sm bg-primary rounded-md text-white"
                href={`/dashboard/user/${userId}`}
              >
                {`< Return to Dashboard`}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 md:px-10 mt-6">
        <div className="flex justify-center items-center md:justify-center mb-4">
          <AddTask
            projectId={project?.id}
            projectTitle={project.title}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
