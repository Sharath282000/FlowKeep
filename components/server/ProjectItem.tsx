import { Project } from "@/lib/type";

import { motion } from "framer-motion";
import ProjectItemCard from "../client/ProjectItemCard";

const ProjectItem = ({
    project,
    userId,
}: {
    project: Project;
    userId: string | undefined;
}) => {


    return (
        <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <ProjectItemCard project={project} userId={userId} />
        </motion.div>

    );
};

export default ProjectItem;
