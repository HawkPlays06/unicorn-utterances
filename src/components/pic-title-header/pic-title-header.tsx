import React, { useMemo } from "react";
import Image from "gatsby-image";
import styles from "./pic-title-header.module.scss";
import GitHubIcon from "assets/icons/github.svg";
import SiteIcon from "assets/icons/site.svg";
import TwitterIcon from "assets/icons/twitter.svg";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { UnicornInfo } from "uu-types";

const getNamePossessive = (name: string) => {
	if (name.endsWith("s")) return `${name}'`;
	return `${name}'s`;
};

interface SocialBtnProps {
	icon: React.ReactNode;
	text: string;
	url: string;
}
const SocialBtn = ({ icon, text, url }: SocialBtnProps) => {
	return (
		<li
			className={`baseBtn lowercase prependIcon ${styles.socialBtnLink}`}
			role="listitem"
		>
			<OutboundLink
				className="unlink"
				target="_blank"
				rel="noopener"
				href={url}
			>
				<span className={styles.svgContainer} aria-hidden={true}>
					{icon}
				</span>
				<span>{text}</span>
			</OutboundLink>
		</li>
	);
};

/**
 *
 * @param image
 * @param socials - Match the object of the unicornsJson socials
 * @param title
 * @param description
 * @param profile - Is a profile pic?
 * @constructor
 */
interface PicTitleHeaderProps {
	image: string;
	socials?: UnicornInfo["socials"];
	title: string;
	description: React.ReactNode | string;
	profile?: boolean;
}
export const PicTitleHeader = ({
	image,
	socials,
	title,
	description,
	profile = false
}: PicTitleHeaderProps) => {
	const subHeaderAria = profile
		? `A description of ${title}`
		: "The site's about snippet";

	const imgAlt = `${title} ${profile ? "profile picture" : "header image"}`;
	const imgStyle = profile ? { borderRadius: "50%" } : {};

	const possessiveName = useMemo(() => profile && getNamePossessive(title), [
		profile,
		title
	]);

	const socialsAria = profile ? `${possessiveName} social media links` : "";

	return (
		<div
			className={styles.container}
			role="banner"
			aria-label={`Banner for ${title}`}
		>
			<Image
				className={styles.headerPic}
				style={imgStyle}
				fixed={image as any}
				loading={"eager"}
				alt={imgAlt}
			/>
			<div className={styles.noMgContainer}>
				<h1 className={styles.title}>{title}</h1>
				<div className={styles.subheader} aria-label={subHeaderAria}>
					{description}
				</div>
				{socials && (
					<ul
						className={styles.socialsContainer}
						aria-label={socialsAria}
						role="list"
					>
						{socials.twitter && (
							<SocialBtn
								icon={<TwitterIcon />}
								text={"Twitter"}
								url={`https://twitter.com/${socials.twitter}`}
							/>
						)}
						{socials.github && (
							<SocialBtn
								icon={<GitHubIcon />}
								text={"GitHub"}
								url={`https://github.com/${socials.github}`}
							/>
						)}
						{socials.website && (
							<SocialBtn
								icon={<SiteIcon />}
								text={"Website"}
								url={socials.website}
							/>
						)}
					</ul>
				)}
			</div>
		</div>
	);
};
