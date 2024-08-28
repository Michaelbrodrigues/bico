import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Dynamically import the MessageContact component to avoid server-side rendering issues
const MessageContact = dynamic(() => import("../../../../components/Messages/MessageContact"), { ssr: false });

export default function MessagePage() {
  const router = useRouter();
  const { recipientId } = router.query; // Get recipientId from URL parameters

  return <MessageContact recipientId={recipientId} />; // Pass recipientId as a prop
}
