const section = {
	jobName: "Setup",
	rawName: "setup",
	children: [
		{
			log: [
				{
					str: "Current runner version: '2.323.0'",
					classes: "",
				},
			],
			children: [],
		},
		{
			log: [
				{
					str: "Operating System",
					classes: "",
				},
			],
			children: [
				[
					{
						str: "Ubuntu",
						classes: "",
					},
				],
				[
					{
						str: "24.04.2",
						classes: "",
					},
				],
				[
					{
						str: "LTS",
						classes: "",
					},
				],
			],
		},
		{
			log: [
				{
					str: "Runner Image",
					classes: "",
				},
			],
			children: [
				[
					{
						str: "Image: ubuntu-24.04",
						classes: "",
					},
				],
				[
					{
						str: "Version: 20250420.1.0",
						classes: "",
					},
				],
				[
					{
						str: "Included Software: https://github.com/actions/runner-images/blob/ubuntu24/20250420.1/images/ubuntu/Ubuntu2404-Readme.md",
						classes: "",
					},
				],
				[
					{
						str: "Image Release: https://github.com/actions/runner-images/releases/tag/ubuntu24%2F20250420.1",
						classes: "",
					},
				],
			],
		},
		{
			log: [
				{
					str: "Runner Image Provisioner",
					classes: "",
				},
			],
			children: [
				[
					{
						str: "2.0.422.1",
						classes: "",
					},
				],
			],
		},
		{
			log: [
				{
					str: "GITHUB_TOKEN Permissions",
					classes: "",
				},
			],
			children: [
				[
					{
						str: "Contents: read",
						classes: "",
					},
				],
				[
					{
						str: "Metadata: read",
						classes: "",
					},
				],
				[
					{
						str: "Packages: read",
						classes: "",
					},
				],
			],
		},
		{
			log: [
				{
					str: "Secret source: Actions",
					classes: "",
				},
			],
			children: [],
		},
		{
			log: [
				{
					str: "Prepare workflow directory",
					classes: "",
				},
			],
			children: [],
		},
		{
			log: [
				{
					str: "Prepare all required actions",
					classes: "",
				},
			],
			children: [],
		},
		{
			log: [
				{
					str: "Getting action download info",
					classes: "",
				},
			],
			children: [],
		},
		{
			log: [
				{
					str: "Download immutable action package 'actions/checkout@v2'",
					classes: "",
				},
			],
			children: [
				[
					{
						str: "Version: 2.7.0",
						classes: "",
					},
				],
				[
					{
						str: "Digest: sha256:95d28907bc868c0bab52f05f1f84cf8416c9415fba4c92519bc0b83bdce1eae3",
						classes: "",
					},
				],
				[
					{
						str: "Source commit SHA: ee0669bd1cc54295c223e0bb666b733df41de1c5",
						classes: "",
					},
				],
			],
		},
		{
			log: [
				{
					str: "Download immutable action package 'google-github-actions/auth@v1'",
					classes: "",
				},
			],
			children: [
				[
					{
						str: "Version: 1.3.0",
						classes: "",
					},
				],
				[
					{
						str: "Digest: sha256:05f73dc64b896d1bff766960308ca552118c7016ffeebc91b3a234cf215a6ad5",
						classes: "",
					},
				],
				[
					{
						str: "Source commit SHA: 3a3c4c57d294ef65efaaee4ff17b22fa88dd3c69",
						classes: "",
					},
				],
			],
		},
		{
			log: [
				{
					str: "Download immutable action package 'google-github-actions/setup-gcloud@v1'",
					classes: "",
				},
			],
			children: [
				[
					{
						str: "Version: 1.1.1",
						classes: "",
					},
				],
				[
					{
						str: "Digest: sha256:7c0c457e67cc7e0e43162b11dac4a6bd3c4e1482f56b7a22da9267d0dcc0f7f1",
						classes: "",
					},
				],
				[
					{
						str: "Source commit SHA: e30db14379863a8c79331b04a9969f4c1e225e0b",
						classes: "",
					},
				],
			],
		},
		{
			log: [
				{
					str: "Download immutable action package 'docker/build-push-action@v2'",
					classes: "",
				},
			],
			children: [
				[
					{
						str: "Version: 2.10.0",
						classes: "",
					},
				],
				[
					{
						str: "Digest: sha256:81ee22cf05cf1d8c766b5a9eeecf205efe208d3c113c8c3d5a55deb952dd9fde",
						classes: "",
					},
				],
				[
					{
						str: "Source commit SHA: ac9327eae2b366085ac7f6a2d02df8aa8ead720a",
						classes: "",
					},
				],
			],
		},
		{
			log: [
				{
					str: "Complete job name: docker-build",
					classes: "",
				},
			],
			children: [],
		},
	],
};


/**
 * @param {typeof section} jobGroup
 */
function getLineNumbers(jobGroup) {
	return jobGroup.children.map((child, cIdx, arr) => {
		const lineNumber = cIdx + 1

		return `${lineNumber} | ${child.log[0].str}`
	})

}

console.log(getLineNumbers(section))
