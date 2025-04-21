"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<div className="relative w-full md:w-64">
			<div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
				<Search className="h-4 w-4 text-zinc-500" />
			</div>
			<Input
				type="text"
				placeholder="Search repositories..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="pl-10 bg-zinc-900/50 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
			/>
		</div>
	);
}
