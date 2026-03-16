import { getReels } from "@/actions/reel";
import ReelHeader from "@/components/admin/reel/ReelHeader"
import ReelTable from "@/components/admin/reel/ReelTable";
import Pagination from "@/components/ui/Pagination";

const page = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;    
    search?: string;
  }>;
}) => {
     const params = (await searchParams) ?? {};
     const pageNumber = Number(params?.page) || 1;     
     const searchQuery = params?.search || "";
     const limit = Number(params?.limit) || 10;
  const reelsResult = 
    await getReels(
      pageNumber,
      limit,
      "createdAt",
      "desc",      
      searchQuery,
    )
  const reels = reelsResult.data;
  const pagination = reelsResult.pagination;
  return (
    <section className="flex flex-col gap-6">
      <ReelHeader />
      <ReelTable reels={reels} />
      <Pagination pagination={pagination} />
    </section>
  );
};

export default page