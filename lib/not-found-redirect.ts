import { redirect } from "next/navigation";

export function redirectToNotFound(reason: string) {
	const encodedReason = encodeURIComponent(reason);
	redirect(`/not-found?reason=${encodedReason}`);
}
