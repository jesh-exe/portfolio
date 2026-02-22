"use client";

import { motion, Variants } from "framer-motion";
import {
    SiSpringboot,
    SiAngular,
    SiMysql,
    SiMongodb,
    SiTypescript,
    SiKubernetes,
    SiDocker,
    SiRedis,
    SiGit,
    SiKeycloak,
    SiHarbor
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { LuNetwork } from "react-icons/lu";

export default function Skills() {
    const skillsList = [
        { name: "Java", icon: FaJava, color: "#ed8b00" },
        { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
        { name: "Angular", icon: SiAngular, color: "#dd0031" },
        { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5" },
        { name: "Docker", icon: SiDocker, color: "#2496ed" },
        { name: "Microservices", icon: TbApi, color: "#00b4e6" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
        { name: "MySQL", icon: SiMysql, color: "#4479a1" },
        { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
        { name: "Redis", icon: SiRedis, color: "#dc382d" },
        { name: "NATS", icon: LuNetwork, color: "#27A19A" },
        { name: "Git", icon: SiGit, color: "#f05032" },
        { name: "Harbor", icon: SiHarbor, color: "#608bfa" },
        { name: "Keycloak", icon: SiKeycloak, color: "#0273a5" },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <section className="relative z-20 bg-[#121212] py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Core Arsenal</h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
                        The technologies I use to build scalable, secure, and performant systems.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6"
                >
                    {skillsList.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-all cursor-default backdrop-blur-sm group overflow-hidden"
                        >
                            {/* Hover glow background tailored to the brand color */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl rounded-2xl pointer-events-none"
                                style={{ backgroundColor: skill.color }}
                            />

                            <skill.icon
                                className="text-5xl mb-4 transition-transform duration-300 drop-shadow-md z-10 group-hover:scale-110"
                                style={{ color: skill.color }}
                            />
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 z-10">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
