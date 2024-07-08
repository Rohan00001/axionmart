import { Github, Twitter } from 'lucide-react'
import React from 'react'

const siteConfig = {
    links: {
        twitter: "https://x.com/RohanGope6",
        github: "https://github.com/Rohan00001",
    }
}

function Footer() {
    return (
        <footer className="py-6 md:px-8 md:py-8 bg-gray-800 text-white">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex flex-col items-center md:items-start">
                    <p className="text-center text-sm leading-loose text-gray-400 md:text-left">
                        Built by{" "}
                        <a
                            href={siteConfig.links.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4 hover:text-gray-200"
                        >
                            Rohan Gope
                        </a>
                    </p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a
                        href={siteConfig.links.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-200"
                    >
                        <Twitter size={24} />
                    </a>
                    <a
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-200"
                    >
                        <Github size={24} />
                    </a>
                </div>
                <div className="flex flex-col items-center md:items-end">
                    <p className="text-center text-sm leading-loose text-gray-400 md:text-right">
                        &copy; {new Date().getFullYear()} Rohan Gope. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    )
}

export default Footer
