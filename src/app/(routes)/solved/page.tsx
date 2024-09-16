import CenterPart from './components/center';
import LeftPart from './components/left';
import RightPart from './components/right';
const Page = () => {
  return (
    <>
      <main className="flex items-start gap-6">
        <LeftPart />
        <CenterPart />
        <RightPart />
      </main>
    </>
  );
};
export default Page;
