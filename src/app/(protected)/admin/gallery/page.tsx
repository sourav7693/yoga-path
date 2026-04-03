import { getGallery } from "@/actions/gallery";
import GalleryHeader from "@/components/admin/gallery/GalleryHeader";
import GalleryTable from "@/components/admin/gallery/GalleryTable";
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

  const galleryResult = await getGallery(
    pageNumber,
    limit,
    "createdAt",
    "desc",
    searchQuery,
  );

  const gallery = galleryResult.data;
  const pagination = galleryResult.pagination;

  return (
    <section className="flex flex-col gap-6">
      <GalleryHeader />
      <GalleryTable gallery={gallery} />
      <Pagination pagination={pagination} />
    </section>
  );
};

export default page;
