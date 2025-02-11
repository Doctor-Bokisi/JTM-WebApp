import Breadcrumb from "@/components/Breadcrumb";
import JTMUsers from "@/components/JTMUsers";
import MasterLayout from "@/masterLayout/MasterLayout";

const Page = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='JTM Users' />

        <JTMUsers />
      </MasterLayout>
    </>
  );
};

export default Page;
