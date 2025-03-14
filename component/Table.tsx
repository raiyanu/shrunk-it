import React, { useState } from "react";

interface linkType {
	shortUrl?: string;
	FullUrl: string;
	createdAt: string;
}

export default function Table() {
	const [linkList, setLinkList] = useState<linkType[]>(placeHolder);
	return (
		<>
			<div className="overflow-scroll max-h-full w-full">
				<h2 className="text-center text-xl px-2">URL List</h2>
				<ul className="list bg-base-100 rounded-box shadow-md relative">
					<li className="list-row flex sticky top-0 bg-[#282a36]">
						<h3 className="text-2xl"></h3>
						<h3 className="text-xl">ShortUrl</h3>
						<h3 className="text-xl  ml-4">FullUrl</h3>
						<h3 className="text-xl ml-auto mr-4">Action</h3>
					</li>
					{linkList?.map((link, index) => {
						return <TableRow link={link} index={index} key={index} />;
					})}
				</ul>
			</div>
		</>
	);
}

const TableRow = ({ link, index }: { link: linkType; index: number }) => {
	return (
		<li className="list-row flex">
			<h3 className="text-2xl">{index + 1}</h3>
			<a className="px-2 btn btn-ghost  text-left " href={link.shortUrl}>
				{link.shortUrl?.slice(-6)}
			</a>
			<a className=" px-2 btn btn-ghost w-60 text-left" href={link.FullUrl}>
				{link.FullUrl}
			</a>

			<button className="btn  btn-ghost btn-error ">Delete</button>
		</li>
	);
};

const placeHolder = [
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
	{
		shortUrl: "https://shrunk-it.vercel.app/s/c57692",
		FullUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
		createdAt: new Date("2021").toLocaleString(),
	},
];
