import Breadcrumb from "@/components/Breadcrumb";
import TermsConditionLayer from "@/components/TermsConditionLayer";
import TextGeneratorNewLayer from "@/components/TextGeneratorNewLayer";
import MasterLayout from "@/masterLayout/MasterLayout";

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Text Generator' />

        {/* TextGeneratorNewLayer */}
        <TextGeneratorNewLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
