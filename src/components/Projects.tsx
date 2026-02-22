"use client";

import { motion } from "framer-motion";

export default function Projects() {
    const projects = [
        {
            id: 1,
            title: "ICE Cloud",
            href: "https://icecloud.in",
            description: "Platform built indigenously to provide cloud-like services for research and development that is reproducible. Built with a focus on efficiency, security, and scalability, it integrates multiple key components that streamline data management, computing, collaboration, and workflow automation. Supports multiple application domains like life science (genomics, structural biology), quantum computing, and skill development training. Provides ease of access to computational resources.",
            services: [
                "Compute: Dynamic Provisioning of ICE Compute Instance",
                "Container Repository: Streamlining Research with Container Repository",
                "Virtual Hosting: Secured hosting of research tools",
                "AI: Empowering research using Artificial Intelligence",
                "Storage: Empowering Research with Data Storage",
                "Development Platform: Integrated Development Platform",
                "HPC: Accelerating discovery through High Performance Computing",
                "Sharing & Collaboration: Secure & Controlled Data Sharing",
                "Pipeline: Workflow platform using containers"
            ],
            tags: ["Angular", "Springboot", "Microservices", "Docker", "Kubernetes", "NATS", "Mongo", "Postgres", "Keycloak", "Java"],
        },
        {
            id: 2,
            title: "MMIP (Marine Microbial Information Portal)",
            href: "https://mmip.niot.res.in",
            description: "A dedicated portal for the NIOT (National Institute of Ocean Technology, Chennai). The platform securely stores data from their projects which include multiple samples, with samples containing multiple sequences. It serves as a centralized hub where further specialized curation is strictly managed directly on the portal.",
            services: [],
            tags: ["Angular", "Springboot", "Microservices", "Docker", "Kubernetes", "NATS", "Mongo", "Postgres", "Keycloak", "Java"],
        }
    ];

    return (
        <section className="relative z-20 bg-[#121212] py-32 px-6 md:px-12 lg:px-24 border-t border-white/10">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Selected Work</h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-16">
                        A showcase of my recent engineering and research challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all overflow-hidden backdrop-blur-md flex flex-col items-start"
                        >
                            {/* Subtle hover glow effect */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/[0.07] transition-all duration-700 pointer-events-none" />

                            <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-block mb-3">
                                <h3 className="text-3xl md:text-4xl font-semibold text-white group-hover:text-gray-300 transition-colors">
                                    {project.title} ↗
                                </h3>
                            </a>
                            <p className="text-gray-400 mb-8 leading-relaxed max-w-4xl text-lg">
                                {project.description}
                            </p>

                            {project.services && project.services.length > 0 && (
                                <div className="mb-8 w-full">
                                    <h4 className="text-white font-medium mb-3">Offered Services:</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                                        {project.services.map((svc, i) => (
                                            <li key={i} className="text-gray-400 text-sm flex items-start">
                                                <span className="text-white/30 mr-2 mt-0.5">▹</span>
                                                {svc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10 w-full">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-1.5 text-xs font-medium text-gray-300 bg-white/5 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
