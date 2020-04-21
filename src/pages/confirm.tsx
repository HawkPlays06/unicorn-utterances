import React from "react";
import { graphql } from "gatsby";
import { Layout } from "components/layout";
import Image from "gatsby-image";

const Confirm = (props: any) => {
	const { location, data } = props;
	return (
		<Layout location={location}>
			<Image
				fixed={data.file.childImageSharp.fixed}
				imgStyle={{ objectFit: "contain" }}
				style={{
					margin: "0 auto",
					display: "block",
					width: "calc(100vw - 40px)",
					height: "calc(100vw - 40px)",
					maxWidth: "450px",
					maxHeight: "450px",
					background: "var(--primary)",
					borderRadius: "100%"
				}}
				loading={"eager"}
			/>
			<h1 style={{ textAlign: "center" }}>Just one more thing...</h1>
			<p style={{ textAlign: "center" }}>
				Thank you for subscribing. You will need to check your inbox and confirm
				your subscription.
			</p>
		</Layout>
	);
};

export const pageQuery = graphql`
	query ConfirmSiteData {
		file(relativePath: { eq: "hello_2048.png" }) {
			childImageSharp {
				fixed(width: 500, quality: 100) {
					...GatsbyImageSharpFixed
				}
			}
		}
	}
`;

export default Confirm;
