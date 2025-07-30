import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadCrumbRedirects {
  toHome: string;
  currentPage: string;
  currentPageRoute: string;
  toHomeRoute: string;
}

const CustomBreadCrumb = ({ toHome, currentPage , currentPageRoute , toHomeRoute }: BreadCrumbRedirects) => {
  return (
    <Breadcrumb className="hidden md:inline">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={toHomeRoute}>{toHome}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={currentPageRoute} className="underine italic font-semibold">{currentPage}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadCrumb;
