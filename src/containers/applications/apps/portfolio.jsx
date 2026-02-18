import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Icon, ToolBar, LazyComponent } from "../../../utils/general";
import "./assets/portfolio.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBriefcase,
    faArrowLeft,
    faRocket,
    faServer,
    faFilePdf,
    faDownload,
    faDatabase,
    faExternalLinkAlt,
    faChartLine,
    faCogs,
    faChartBar,
    faFileInvoiceDollar,
    faCloudDownloadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import projectsData from "../../../data/projects.json";

const projectIcons = {
    "sahabat-stk": faRocket,
    "zammad-helpdesk": faServer,
    "realtime-cdc-flink": faDatabase,
    "unified-portal": faRocket,
    "grafana-monitoring": faChartLine,
    "postgresql-monitoring": faChartBar,
    "infracost-management": faFileInvoiceDollar,
    "terraformer-azure": faCloudDownloadAlt,
};

export const PortfolioApp = () => {
    const wnapp = useSelector((state) => state.apps.portfolio);
    const [page, setPage] = useState("home");
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeNav, setActiveNav] = useState("all");
    const [lightboxImg, setLightboxImg] = useState(null);

    const closeLightbox = useCallback(() => setLightboxImg(null), []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") closeLightbox();
        };
        if (lightboxImg) {
            window.addEventListener("keydown", handleKey);
        }
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightboxImg, closeLightbox]);

    if (!wnapp) return null;

    const openProject = (project) => {
        setSelectedProject(project);
        setPage("detail");
    };

    const goHome = () => {
        setPage("home");
        setSelectedProject(null);
    };

    const filteredProjects =
        activeNav === "all"
            ? projectsData
            : projectsData.filter((p) => p.category === activeNav);

    return (
        <div
            className="portfolioApp floatTab dpShad"
            data-size={wnapp.size}
            data-max={wnapp.max}
            style={{
                ...(wnapp.size == "cstm" ? wnapp.dim : null),
                zIndex: wnapp.z,
            }}
            data-hide={wnapp.hide}
            id={wnapp.icon + "App"}
        >
            <ToolBar
                app={wnapp.action}
                icon={wnapp.icon}
                size={wnapp.size}
                name="Portfolio"
            />
            <div className="windowScreen flex" data-dock="true">
                <LazyComponent show={!wnapp.hide}>
                    {/* Sidebar */}
                    <div className="portfolioSidebar">
                        <div className="sidebarHeader">
                            <div className="profileSection">
                                <div className="avatarPlaceholder">RW</div>
                                <div className="profileInfo">
                                    <div className="profileName">Rahmat Wibowo</div>
                                    <div className="profileTitle">Technical Engineer</div>
                                </div>
                            </div>
                        </div>

                        <div className="sidebarNav">
                            <div
                                className="navItem"
                                data-active={activeNav === "all"}
                                onClick={() => {
                                    setActiveNav("all");
                                    goHome();
                                }}
                            >
                                <FontAwesomeIcon icon={faHome} className="navIcon" />
                                <span>All Projects</span>
                            </div>
                            <div
                                className="navItem"
                                data-active={activeNav === "Enterprise Solutions"}
                                onClick={() => {
                                    setActiveNav("Enterprise Solutions");
                                    setPage("home");
                                }}
                            >
                                <FontAwesomeIcon icon={faBriefcase} className="navIcon" />
                                <span>Enterprise</span>
                            </div>
                            <div
                                className="navItem"
                                data-active={activeNav === "Data Engineering"}
                                onClick={() => {
                                    setActiveNav("Data Engineering");
                                    setPage("home");
                                }}
                            >
                                <FontAwesomeIcon icon={faDatabase} className="navIcon" />
                                <span>Data Engineering</span>
                            </div>
                            <div
                                className="navItem"
                                data-active={activeNav === "DevOps"}
                                onClick={() => {
                                    setActiveNav("DevOps");
                                    setPage("home");
                                }}
                            >
                                <FontAwesomeIcon icon={faCogs} className="navIcon" />
                                <span>DevOps</span>
                            </div>
                        </div>

                        <div className="sidebarFooter">
                            <a
                                className="socialLink"
                                href="https://www.linkedin.com/in/rahmatwi/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                className="socialLink"
                                href="https://github.com/rahmatwibowo"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                                <span>GitHub</span>
                            </a>
                            <a
                                className="socialLink"
                                href="/resume.pdf"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faFilePdf} />
                                <span>Resume</span>
                            </a>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="portfolioContent win11Scroll">
                        {page === "home" && (
                            <>
                                <div className="portfolioHero">
                                    <div className="heroTitle">Rahmat Wibowo</div>
                                    <div className="heroSubtitle">
                                        Technical Engineer — Backend &amp; DevOps
                                    </div>
                                    <div className="heroDesc">
                                        Cloud Solutions Architect with 5+ years of experience designing, reviewing, and optimizing cloud-native architectures across AWS, Google Cloud, and Azure. Strong background in DevOps, SRE, and Infrastructure as Code (IaC), translating business requirements into secure, scalable, and cost-efficient systems. Proven expertise in Kubernetes, Terraform, and observability, supporting fintech and enterprise workloads under strict compliance requirements (e.g., PCI DSS). Key driver of measurable impact through cost optimization, reliability improvements, and architectural standardization.
                                    </div>
                                    <a href="/resume.pdf" target="_blank" className="heroBtn">
                                        <FontAwesomeIcon icon={faDownload} />
                                        <span>Download Resume</span>
                                    </a>
                                </div>

                                <div className="portfolioProjects">
                                    <div className="sectionTitle">Projects</div>
                                    <div className="sectionSubtitle">
                                        {filteredProjects.length} project
                                        {filteredProjects.length !== 1 ? "s" : ""} ·{" "}
                                        {activeNav === "all" ? "All Categories" : activeNav}
                                    </div>

                                    <div className="projectGrid">
                                        {filteredProjects.map((project) => (
                                            <div
                                                key={project.id}
                                                className="projectCard"
                                                onClick={() => openProject(project)}
                                            >
                                                <div className="cardHeader">
                                                    <div className="cardIcon">
                                                        <FontAwesomeIcon
                                                            icon={projectIcons[project.id] || faRocket}
                                                        />
                                                    </div>
                                                    <div className="cardTitleGroup">
                                                        <div className="cardTitle">{project.title}</div>
                                                        <div
                                                            className="cardStatus"
                                                            data-status={project.status}
                                                        >
                                                            {project.status}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="cardBody">
                                                    <div className="cardDesc">{project.description}</div>
                                                    <div className="cardTags">
                                                        {project.stack.map((tech) => (
                                                            <span key={tech} className="tag">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {page === "detail" && selectedProject && (
                            <div className="projectDetail">
                                <div className="detailBack" onClick={goHome}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    <span>Back to Projects</span>
                                </div>

                                <div className="detailHeader">
                                    <div className="detailIcon">
                                        <FontAwesomeIcon
                                            icon={projectIcons[selectedProject.id] || faRocket}
                                        />
                                    </div>
                                    <div className="detailInfo">
                                        <div className="detailTitle">{selectedProject.title}</div>
                                        <div
                                            className="detailStatus"
                                            data-status={selectedProject.status}
                                        >
                                            {selectedProject.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="detailSection">
                                    <div className="detailSectionTitle">Description</div>
                                    <div className="detailDesc">
                                        {selectedProject.description}
                                    </div>
                                    {selectedProject.link && selectedProject.link !== "#" && (
                                        <div className="detailAction">
                                            <a
                                                href={selectedProject.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="detailBtn"
                                            >
                                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                                <span>Read Article</span>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="detailSection">
                                    <div className="detailSectionTitle">Tech Stack</div>
                                    <div className="detailTags">
                                        {selectedProject.stack.map((tech) => (
                                            <span key={tech} className="tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {selectedProject.gallery &&
                                    selectedProject.gallery.length > 0 && (
                                        <div className="detailSection">
                                            <div className="detailSectionTitle">Gallery</div>
                                            <div className="detailGallery">
                                                {selectedProject.gallery.map((img, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="galleryImg"
                                                        onClick={() => setLightboxImg(img)}
                                                    >
                                                        <img
                                                            src={img.src}
                                                            alt={img.caption}
                                                            onError={(e) => {
                                                                e.currentTarget.src =
                                                                    "img/asset/mixdef.jpg";
                                                            }}
                                                        />
                                                        <div className="galleryCaption">{img.caption}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )}

                        {/* Lightbox Overlay */}
                        {lightboxImg && (
                            <div className="lightboxOverlay" onClick={closeLightbox}>
                                <div
                                    className="lightboxContent"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button className="lightboxClose" onClick={closeLightbox}>
                                        ×
                                    </button>
                                    <img
                                        src={lightboxImg.src}
                                        alt={lightboxImg.caption}
                                        className="lightboxImage"
                                        onError={(e) => {
                                            e.currentTarget.src = "img/asset/mixdef.jpg";
                                        }}
                                    />
                                    <div className="lightboxCaption">{lightboxImg.caption}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </LazyComponent>
            </div >
        </div >
    );
};
