import { getBlockedUsers } from "@/lib/block-service";
import { BlockedUser, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";




const CommunityPage = async () => {

  const blockedUsers = await getBlockedUsers();
  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), "dd,MM,yyyy")
  }))

  return ( 
    <div className="p-6">
      <div className="mb-4">
        <h1 className="font-bold text-2xl">
        Community Settings
        </h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
   );
}


export default CommunityPage;