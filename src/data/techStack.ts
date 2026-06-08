export interface TechStackType {
  id: number;
  name: string;
  order?: number;
  techCategoryId: number;
  techCategoryName: string;
  logoLight: string;
  logoDark: string;
  createdAt: string;
  updatedAt: string;
}

export const TechStack: TechStackType[] = [
  {
    id: 5,
    name: "React",
    techCategoryId: 1,
    order: 2,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/3ad5f527-5546-48e1-a534-20030113f5dd-react-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/3ad5f527-5546-48e1-a534-20030113f5dd-react-original.png",
    createdAt: "2026-06-06T18:11:22.087Z",
    updatedAt: "2026-06-06T18:11:22.087Z",
  },
  {
    id: 6,
    name: "AWS",
    techCategoryId: 6,
    techCategoryName: "Cloud Computing",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/4e63aa1e-6e50-4ef6-8cf3-676e9415c2f3-amazonwebservices-plain-wordmark.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/4e63aa1e-6e50-4ef6-8cf3-676e9415c2f3-amazonwebservices-plain-wordmark.png",
    createdAt: "2026-06-07T07:30:18.409Z",
    updatedAt: "2026-06-07T07:30:18.409Z",
  },
  {
    id: 7,
    name: "Bun",
    order: 2,
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/e6b46e9a-7dac-4a6e-8a28-264a406c49fc-bun-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/e6b46e9a-7dac-4a6e-8a28-264a406c49fc-bun-original.png",
    createdAt: "2026-06-07T07:30:43.782Z",
    updatedAt: "2026-06-07T07:30:43.782Z",
  },
  {
    id: 8,
    name: "Express",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/5685e63c-8464-4dad-a2d9-8d55c0dd0034-SkillIconsExpressjsDark.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/5685e63c-8464-4dad-a2d9-8d55c0dd0034-SkillIconsExpressjsDark.png",
    createdAt: "2026-06-07T07:34:50.534Z",
    updatedAt: "2026-06-07T07:34:50.534Z",
  },
  {
    id: 9,
    name: "HTML",
    techCategoryId: 1,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/685ca991-c3e7-4330-9ac6-a154344906f9-html5-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/685ca991-c3e7-4330-9ac6-a154344906f9-html5-original.png",
    createdAt: "2026-06-07T07:35:09.016Z",
    updatedAt: "2026-06-07T07:35:09.016Z",
  },
  {
    id: 10,
    name: "React Router",
    techCategoryId: 9,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/066e57d4-6c4a-4bc6-9ffd-3e8d254266e8-reactrouter-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/ed42b317-bc6c-42fd-9716-335ffbb63bd6-Dark.png",
    createdAt: "2026-06-07T07:36:40.633Z",
    updatedAt: "2026-06-07T07:55:09.397Z",
  },
  {
    id: 11,
    name: "Clerk",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/3a05f58b-9d81-4bbe-9c56-c5bbb91eca04-clerk.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/3a05f58b-9d81-4bbe-9c56-c5bbb91eca04-clerk.png",
    createdAt: "2026-06-07T07:50:14.597Z",
    updatedAt: "2026-06-07T07:50:14.597Z",
  },
  {
    id: 12,
    name: "Cloudflare",
    techCategoryId: 3,
    techCategoryName: "DevOps",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/2809b06c-2273-428a-8f8f-940858032ea1-cloudflare-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/2809b06c-2273-428a-8f8f-940858032ea1-cloudflare-original.png",
    createdAt: "2026-06-07T07:50:42.040Z",
    updatedAt: "2026-06-07T07:50:42.040Z",
  },
  {
    id: 13,
    name: "Cloudinary",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/1f055682-7246-445a-8801-5b36756b1194-cloudinary.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/1f055682-7246-445a-8801-5b36756b1194-cloudinary.png",
    createdAt: "2026-06-07T07:51:16.532Z",
    updatedAt: "2026-06-07T07:51:16.532Z",
  },
  {
    id: 14,
    name: "CSS",
    techCategoryId: 9,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/a8a2b693-a38b-4a11-8900-aaee0c8059bd-css3-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/a8a2b693-a38b-4a11-8900-aaee0c8059bd-css3-original.png",
    createdAt: "2026-06-07T07:51:32.198Z",
    updatedAt: "2026-06-07T07:54:54.688Z",
  },
  {
    id: 15,
    name: "DigitalIOcean",
    order: 1,
    techCategoryId: 6,
    techCategoryName: "Cloud Computing",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/5362f6b3-fddb-4233-bca7-b6088b0a860a-digitalocean-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/5362f6b3-fddb-4233-bca7-b6088b0a860a-digitalocean-original.png",
    createdAt: "2026-06-07T07:51:53.166Z",
    updatedAt: "2026-06-07T07:51:53.166Z",
  },
  {
    id: 16,
    name: "Docker",
    techCategoryId: 3,
    techCategoryName: "DevOps",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/7599d154-e5dd-4201-88de-7fce0535ef13-docker.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/7599d154-e5dd-4201-88de-7fce0535ef13-docker.png",
    createdAt: "2026-06-07T07:52:09.718Z",
    updatedAt: "2026-06-07T07:52:09.718Z",
  },
  {
    id: 17,
    name: "Github-Action",
    techCategoryId: 4,
    techCategoryName: "CI/CD",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/8f5b858f-968a-45dd-9182-67cf18f0a28e-githubactions-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/8f5b858f-968a-45dd-9182-67cf18f0a28e-githubactions-original.png",
    createdAt: "2026-06-07T07:52:33.798Z",
    updatedAt: "2026-06-07T07:52:33.798Z",
  },
  {
    id: 18,
    name: "Git",
    techCategoryId: 3,
    techCategoryName: "DevOps",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/266b660d-b92c-4048-82d0-fcdee1ee55ce-git-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/266b660d-b92c-4048-82d0-fcdee1ee55ce-git-original.png",
    createdAt: "2026-06-07T07:53:10.405Z",
    updatedAt: "2026-06-07T07:53:10.405Z",
  },
  {
    id: 19,
    name: "GitHub",
    techCategoryId: 3,
    techCategoryName: "DevOps",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/bb367bcf-4504-4cf1-90b1-16d02255c365-github-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/f457224b-2437-4495-bd29-ddbb58386124-github-light.webp",
    createdAt: "2026-06-07T07:54:02.046Z",
    updatedAt: "2026-06-07T07:54:02.046Z",
  },
  {
    id: 20,
    name: "Go",
    techCategoryId: 9,
    techCategoryName: "Language",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/82613498-f096-4ffe-8385-2a24391d08f5-go-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/82613498-f096-4ffe-8385-2a24391d08f5-go-original.png",
    createdAt: "2026-06-07T07:55:31.599Z",
    updatedAt: "2026-06-07T07:55:31.599Z",
  },
  {
    id: 21,
    name: "Javascipt",
    order: 1,
    techCategoryId: 9,
    techCategoryName: "Language",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/166f34de-fed6-4fcb-bb4c-550007079ad0-javascript-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/166f34de-fed6-4fcb-bb4c-550007079ad0-javascript-original.png",
    createdAt: "2026-06-07T07:55:58.833Z",
    updatedAt: "2026-06-07T07:55:58.833Z",
  },
  {
    id: 22,
    name: "Linux",
    techCategoryId: 3,
    techCategoryName: "DevOps",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/3e45d0e3-0628-4c92-83a1-ce590ae18c0c-linux.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/3e45d0e3-0628-4c92-83a1-ce590ae18c0c-linux.png",
    createdAt: "2026-06-07T07:56:16.436Z",
    updatedAt: "2026-06-07T07:56:16.436Z",
  },
  {
    id: 23,
    name: "MongoDB",
    techCategoryId: 5,
    techCategoryName: "Database",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/749d27b9-eee4-4213-91e6-9ad03b87640b-mongodb-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/749d27b9-eee4-4213-91e6-9ad03b87640b-mongodb-original.png",
    createdAt: "2026-06-07T07:56:42.699Z",
    updatedAt: "2026-06-07T07:56:42.699Z",
  },
  {
    id: 24,
    name: "Nginx",
    techCategoryId: 3,
    techCategoryName: "DevOps",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/61e4d1c1-cdf2-4287-8d24-df4714164703-nginx-icon.webp",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/61e4d1c1-cdf2-4287-8d24-df4714164703-nginx-icon.webp",
    createdAt: "2026-06-07T07:57:40.700Z",
    updatedAt: "2026-06-07T07:57:40.700Z",
  },
  {
    id: 25,
    name: "Nodejs",
    order: 1,
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/93d82cbe-50b3-4991-9043-c92d6b6ae00b-Node.js.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/93d82cbe-50b3-4991-9043-c92d6b6ae00b-Node.js.png",
    createdAt: "2026-06-07T07:59:02.628Z",
    updatedAt: "2026-06-07T07:59:02.628Z",
  },
  {
    id: 26,
    name: "Notion",
    techCategoryId: 10,
    techCategoryName: "Tool",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/c506216b-7f01-472b-9427-2784e27c3aa0-notion-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/c506216b-7f01-472b-9427-2784e27c3aa0-notion-original.png",
    createdAt: "2026-06-07T07:59:48.961Z",
    updatedAt: "2026-06-07T07:59:48.961Z",
  },
  {
    id: 27,
    name: "Oracle",
    order: 2,
    techCategoryId: 6,
    techCategoryName: "Cloud Computing",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/0ac903d0-0931-44f8-a655-0d448f1e6a19-image-Picsart-BackgroundRemover.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/0ac903d0-0931-44f8-a655-0d448f1e6a19-image-Picsart-BackgroundRemover.png",
    createdAt: "2026-06-07T08:02:08.258Z",
    updatedAt: "2026-06-07T08:08:31.862Z",
  },
  {
    id: 28,
    name: "PNPM",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/201d3301-5404-42a0-b8c7-3047d8e9e369-download-pnpm-light.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/a1549ec7-8d2b-42ff-9eec-b68a5f4e61d6-download-pnpm-dark.png",
    createdAt: "2026-06-07T08:04:17.832Z",
    updatedAt: "2026-06-07T08:04:17.832Z",
  },
  {
    id: 29,
    name: "PortgreSQL",
    techCategoryId: 5,
    techCategoryName: "Database",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/9fbf2bf4-0b5b-4b50-abfa-d8caafe2f163-postgresql-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/9fbf2bf4-0b5b-4b50-abfa-d8caafe2f163-postgresql-original.png",
    createdAt: "2026-06-07T08:04:45.617Z",
    updatedAt: "2026-06-07T08:04:45.617Z",
  },
  {
    id: 30,
    name: "Postman",
    techCategoryId: 10,
    techCategoryName: "Tool",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/b8fc638d-5a5e-4161-8e9c-cc5802f421e9-postman-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/b8fc638d-5a5e-4161-8e9c-cc5802f421e9-postman-original.png",
    createdAt: "2026-06-07T08:05:04.873Z",
    updatedAt: "2026-06-07T08:05:04.873Z",
  },
  {
    id: 31,
    name: "Prisma",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/b3c060c7-d102-4970-84b6-90a3bf9506ff-prisma-original-white.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/8308d13e-4eb3-455f-a3bd-57b5f6d97bab-image-Picsart-BackgroundRemover (1).png",
    createdAt: "2026-06-07T08:06:35.035Z",
    updatedAt: "2026-06-07T08:08:22.248Z",
  },
  {
    id: 32,
    name: "Python",
    techCategoryId: 9,
    techCategoryName: "Language",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/f8b17135-6ab3-4b61-9985-9e2ae801f725-python-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/f8b17135-6ab3-4b61-9985-9e2ae801f725-python-original.png",
    createdAt: "2026-06-07T08:07:09.191Z",
    updatedAt: "2026-06-07T08:07:09.191Z",
  },
  {
    id: 33,
    name: "Redux",
    techCategoryId: 1,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/bcf30bc9-2781-4384-979b-f57216c9c2aa-redux-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/bcf30bc9-2781-4384-979b-f57216c9c2aa-redux-original.png",
    createdAt: "2026-06-07T08:09:06.738Z",
    updatedAt: "2026-06-07T08:09:06.738Z",
  },
  {
    id: 34,
    name: "tPRC",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/a3e4c56b-44a8-491d-a610-0fffcedff385-trpc-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/a3e4c56b-44a8-491d-a610-0fffcedff385-trpc-original.png",
    createdAt: "2026-06-07T08:09:32.091Z",
    updatedAt: "2026-06-07T08:09:32.091Z",
  },
  {
    id: 35,
    name: "Typescript",
    order: 2,
    techCategoryId: 9,
    techCategoryName: "Language",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/2594cb56-22f3-4bf1-9171-03a94e519741-typescript-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/2594cb56-22f3-4bf1-9171-03a94e519741-typescript-original.png",
    createdAt: "2026-06-07T08:09:48.188Z",
    updatedAt: "2026-06-07T08:09:48.188Z",
  },
  {
    id: 36,
    name: "Vercel",
    techCategoryId: 3,
    techCategoryName: "DevOps",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/676abc7f-1451-4a77-a33c-f96408fbd770-vercel-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/171b3f40-6d18-4871-8f5e-d4ee1350688a-vercel-symbol-colored-dark-svg-Picsart-BackgroundRemover.png",
    createdAt: "2026-06-07T08:13:44.527Z",
    updatedAt: "2026-06-07T08:13:44.527Z",
  },
  {
    id: 37,
    name: "Zustand",
    techCategoryId: 1,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/2f2e4524-15c3-4fcb-a37f-89cd8ee787e7-zustand-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/2f2e4524-15c3-4fcb-a37f-89cd8ee787e7-zustand-original.png",
    createdAt: "2026-06-07T08:26:28.380Z",
    updatedAt: "2026-06-07T08:26:28.380Z",
  },
  {
    id: 38,
    name: "Tailwind",
    techCategoryId: 1,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/4b22925c-30b7-4af7-84c9-3cf405f0da64-tailwindcss-original.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/4b22925c-30b7-4af7-84c9-3cf405f0da64-tailwindcss-original.png",
    createdAt: "2026-06-07T08:27:00.051Z",
    updatedAt: "2026-06-07T08:27:00.051Z",
  },
  {
    id: 39,
    name: "Socket.io",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/c52e3824-3a42-4fa0-adb7-56e8527b50e9-socketio-original-white.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/a2499a16-60eb-40c5-9870-20c44683ed81-10566080-Photoroom.png",
    createdAt: "2026-06-07T08:30:37.338Z",
    updatedAt: "2026-06-07T08:30:37.338Z",
  },
  {
    id: 40,
    name: "Next.js",
    order: 1,
    techCategoryId: 1,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/0e8e52d9-1393-4d8d-9472-1a2d21cae2cd-nextjs.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/cedfe170-08df-4e8d-a8bd-997850bd082d-nextjs-light.png",
    createdAt: "2026-06-07T08:34:59.094Z",
    updatedAt: "2026-06-07T08:34:59.094Z",
  },
  {
    id: 41,
    name: "Motion",
    techCategoryId: 1,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/f7c86d08-2c4c-4721-978a-8d3db6690210-image-Photoroom.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/f7c86d08-2c4c-4721-978a-8d3db6690210-image-Photoroom.png",
    createdAt: "2026-06-07T08:47:37.668Z",
    updatedAt: "2026-06-07T11:14:50.604Z",
  },
  {
    id: 42,
    name: "Tanstack Query",
    techCategoryId: 1,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/164e0030-84e1-4bf8-ab1d-538b7f4de4eb-React-Query-Icon--Streamline-Svg-Logos.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/164e0030-84e1-4bf8-ab1d-538b7f4de4eb-React-Query-Icon--Streamline-Svg-Logos.png",
    createdAt: "2026-06-07T09:39:41.295Z",
    updatedAt: "2026-06-07T09:39:41.295Z",
  },
  {
    id: 43,
    name: "Drizzle",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/d0e6f678-24f4-4f4d-9435-a272105f5b10-drizzle-orm.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/c35c0a2b-413f-49d7-9a73-f1a01aad5b8f-drizzle-orm (1).png",
    createdAt: "2026-06-07T09:44:52.362Z",
    updatedAt: "2026-06-07T09:44:52.362Z",
  },
  {
    id: 44,
    name: "Turborepo",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/7e0c49bd-305c-4ae8-9c18-604c35291b7a-turborepo-logo.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/6b0d8a6a-7928-48cf-906f-437561fdeb6a-turborepo-logo (1).png",
    createdAt: "2026-06-07T10:16:27.514Z",
    updatedAt: "2026-06-07T10:16:46.660Z",
  },
  {
    id: 45,
    name: "Caddy",
    techCategoryId: 3,
    techCategoryName: "DevOps",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/7650f6ab-421c-431b-8880-bd5e9902faf0-logo-dark.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/7650f6ab-421c-431b-8880-bd5e9902faf0-logo-dark.png",
    createdAt: "2026-06-07T10:22:35.184Z",
    updatedAt: "2026-06-07T10:22:35.184Z",
  },
  {
    id: 46,
    name: "Antigravity",
    techCategoryId: 10,
    techCategoryName: "Tool",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/ce2739ed-b91e-4e35-bbaa-8ea98abfda4d-Google-Antigravity-Icon-Full-Color.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/ce2739ed-b91e-4e35-bbaa-8ea98abfda4d-Google-Antigravity-Icon-Full-Color.png",
    createdAt: "2026-06-07T10:28:59.925Z",
    updatedAt: "2026-06-07T10:28:59.925Z",
  },
  {
    id: 47,
    name: "Claude",
    techCategoryId: 10,
    techCategoryName: "Tool",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/438d73c4-1d2f-468c-8a66-902c406956a7-icons8-claude-96.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/438d73c4-1d2f-468c-8a66-902c406956a7-icons8-claude-96.png",
    createdAt: "2026-06-07T10:29:15.801Z",
    updatedAt: "2026-06-07T10:29:15.801Z",
  },
  {
    id: 48,
    name: "Chat GPT",
    techCategoryId: 10,
    techCategoryName: "Tool",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/8516abf5-b54c-4822-a5f6-66dc0f4aca10-chatgpt.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/8516abf5-b54c-4822-a5f6-66dc0f4aca10-chatgpt.png",
    createdAt: "2026-06-07T10:34:06.600Z",
    updatedAt: "2026-06-07T10:34:06.600Z",
  },
  {
    id: 49,
    name: "Cursor",
    techCategoryId: 10,
    techCategoryName: "Tool",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/e4771fe0-8da4-40f0-aae2-0ae89149a6ee-cursor.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/40626831-0cba-443f-bb6d-73510e283333-cursor (1).png",
    createdAt: "2026-06-07T10:36:50.178Z",
    updatedAt: "2026-06-07T10:36:50.178Z",
  },
  {
    id: 50,
    name: "Gemini AI",
    techCategoryId: 10,
    techCategoryName: "Tool",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/4aaf2e30-3a1b-4561-86f3-4b0a765c48f7-gemini-color.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/4aaf2e30-3a1b-4561-86f3-4b0a765c48f7-gemini-color.png",
    createdAt: "2026-06-07T10:39:53.329Z",
    updatedAt: "2026-06-07T10:39:53.329Z",
  },
  {
    id: 51,
    name: "Grok",
    techCategoryId: 10,
    techCategoryName: "Tool",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/b3fd59fc-71e0-4e59-a4b8-59721c905f19-grok.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/d8eff942-87e9-4537-983f-1fe7dfbcaa41-grok-dark.png",
    createdAt: "2026-06-07T10:42:12.964Z",
    updatedAt: "2026-06-07T10:42:12.964Z",
  },
  {
    id: 52,
    name: "Redis",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/90c174f3-f21d-45df-8db5-9e7774d491f1-image-Photoroom.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/90c174f3-f21d-45df-8db5-9e7774d491f1-image-Photoroom.png",
    createdAt: "2026-06-07T10:42:28.508Z",
    updatedAt: "2026-06-07T10:42:28.508Z",
  },
  {
    id: 53,
    name: "BetterAuth",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/ea6079ca-db18-4263-a5c1-a36f1a00aab1-better-auth-mark-dark.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/7a923e45-281d-4255-87de-e9f37d75ec2f-better-auth-mark-light.png",
    createdAt: "2026-06-07T10:46:49.596Z",
    updatedAt: "2026-06-07T10:46:49.596Z",
  },
  {
    id: 54,
    name: "Strapi",
    techCategoryId: 2,
    techCategoryName: "Backend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/9ffc5213-fc80-443a-9ef2-862c90b846ac-strapi.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/9ffc5213-fc80-443a-9ef2-862c90b846ac-strapi.png",
    createdAt: "2026-06-07T11:05:09.588Z",
    updatedAt: "2026-06-07T11:05:09.588Z",
  },
  {
    id: 55,
    name: "Shadcn",
    techCategoryId: 1,
    techCategoryName: "Frontend",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/1ce48ac2-dce2-4028-b7fc-ed6bca870f7c-shadcn-ui.png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/e7516710-3a5f-46b0-930e-82fb4aad817d-shadcn-ui (3).png",
    createdAt: "2026-06-07T11:05:54.897Z",
    updatedAt: "2026-06-07T11:05:54.897Z",
  },
  {
    id: 56,
    name: "Bash",
    techCategoryId: 3,
    techCategoryName: "DevOps",
    logoLight:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/c2246272-0e97-4033-8924-3683df020e78-bash (2).png",
    logoDark:
      "https://aset-s3.elitecoder.tech/user_3E4v4wgF6LXw3bIexfbwSwaan0Z/8b657827-6e83-471a-b674-266abd2e7755/aae4fd5b-b13a-4ea6-8559-2a29a64fdcb4-bash.png",
    createdAt: "2026-06-07T11:06:47.880Z",
    updatedAt: "2026-06-07T11:06:47.880Z",
  },
];
